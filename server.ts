import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import type { CoffeeBrand, CoffeeBlend } from './src/types/coffee.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.post('/api/brands/search', async (req, res) => {
  const rawQuery = typeof req.body?.query === 'string' ? req.body.query.trim() : '';

  if (!rawQuery || rawQuery.length < 2 || rawQuery.length > 80) {
    res.status(400).json({
      error: 'Inserisci un nome di marca valido (almeno 2 caratteri).',
    });
    return;
  }

  const ai = getGeminiClient();
  if (!ai) {
    res.status(503).json({
      error:
        'Ricerca dinamica temporaneamente non disponibile: verifica la configurazione della chiave API Gemini nelle impostazioni.',
    });
    return;
  }

  try {
    const prompt = `Sei un esperto torrefattore italiano e consulente della macchina espresso da fornello Kamira.
L'utente sta cercando informazioni sulla marca di caffè: "${rawQuery}".

Restituisci in italiano i dati reali e accurati di questa marca di caffè e da 4 a 6 delle sue miscele macinate più rappresentative presenti in commercio (includendo sia miscele macinate per Moka sia, se la marca le produce, miscele macinate per macchina Espresso casa).

Regole rigorose sulla macinatura e compatibilità Kamira:
- La Kamira ha un'estrazione termodinamica simile alla Moka: richiede polvere con grammatura più spessa/medio-grossa che riporta sulla confezione il simbolo della Moka (packSymbol: "moka", grindType: "grossa", micronRange indicativo "550–700 µm"). Solo queste sono compatibili con Kamira (kamiraCompatible: true).
- Il caffè macinato per Espresso casa/bar con il simbolo della tazzina (packSymbol: "espresso", grindType: "fine", micronRange indicativo "220–350 µm") ha una polvere molto più fine che compatta il filtro Kamira e NON è adatto alla Kamira (kamiraCompatible: false).
- Se la marca cercata non corrisponde ad alcuna marca reale di caffè, imposta found: false.`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            found: {
              type: Type.BOOLEAN,
              description: 'True se la marca di caffè esiste davvero, false altrimenti.',
            },
            name: { type: Type.STRING, description: 'Nome ufficiale della marca di caffè.' },
            city: { type: Type.STRING, description: 'Città o regione della torrefazione.' },
            country: { type: Type.STRING, description: 'Paese di origine della marca.' },
            foundedYear: { type: Type.STRING, description: 'Anno di fondazione (es. 1895).' },
            summary: {
              type: Type.STRING,
              description: 'Breve descrizione elegante della torrefazione (2 frasi).',
            },
            signatureStyle: {
              type: Type.STRING,
              description: 'Stile distintivo della torrefazione (3-6 parole).',
            },
            blends: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: 'Nome commerciale della miscela.' },
                  subtitle: {
                    type: Type.STRING,
                    description: 'Tipo formato, es. Macinato per Moka oppure Macinato per Espresso.',
                  },
                  grindType: {
                    type: Type.STRING,
                    description: 'Esattamente "grossa" per moka/medio-grossa oppure "fine" per espresso.',
                  },
                  grindLabel: {
                    type: Type.STRING,
                    description:
                      'Etichetta chiara, es. "Medio-Grossa (Moka)" oppure "Fine (Espresso)".',
                  },
                  micronRange: {
                    type: Type.STRING,
                    description: 'Intervallo granulometrico stimato, es. "550–700 µm" o "240–340 µm".',
                  },
                  packSymbol: {
                    type: Type.STRING,
                    description: 'Esattamente "moka" oppure "espresso".',
                  },
                  origins: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Paesi o macro-aree di provenienza dei chicchi.',
                  },
                  originRegionSummary: {
                    type: Type.STRING,
                    description: 'Sintesi della provenienza dei chicchi (es. Brasile, Etiopia e India).',
                  },
                  composition: {
                    type: Type.STRING,
                    description: 'Composizione Arabica/Robusta (es. 100% Arabica o 70% Arabica · 30% Robusta).',
                  },
                  roastLevel: {
                    type: Type.STRING,
                    description: 'Uno tra: "Chiara", "Media", "Media-Scura", "Scura".',
                  },
                  intensity: {
                    type: Type.INTEGER,
                    description: 'Intensità aromatica da 1 a 10.',
                  },
                  aromaticNotes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Da 2 a 4 note aromatiche principali.',
                  },
                  description: {
                    type: Type.STRING,
                    description: 'Descrizione sensoriale della miscela (1-2 frasi).',
                  },
                  kamiraNote: {
                    type: Type.STRING,
                    description:
                      'Nota tecnica specifica sulla resa con la macchina Kamira in base alla macinatura.',
                  },
                },
                required: [
                  'name',
                  'subtitle',
                  'grindType',
                  'grindLabel',
                  'micronRange',
                  'packSymbol',
                  'origins',
                  'originRegionSummary',
                  'composition',
                  'roastLevel',
                  'intensity',
                  'aromaticNotes',
                  'description',
                  'kamiraNote',
                ],
              },
            },
          },
          required: [
            'found',
            'name',
            'city',
            'country',
            'foundedYear',
            'summary',
            'signatureStyle',
            'blends',
          ],
        },
      },
    });

    const rawText = (response.text ?? '').trim();
    if (!rawText) {
      res.status(502).json({ error: 'Risposta vuota dal servizio di ricerca.' });
      return;
    }

    const parsed = JSON.parse(rawText) as {
      found: boolean;
      name: string;
      city: string;
      country: string;
      foundedYear: string;
      summary: string;
      signatureStyle: string;
      blends: Array<{
        name: string;
        subtitle: string;
        grindType: string;
        grindLabel: string;
        micronRange: string;
        packSymbol: string;
        origins: string[];
        originRegionSummary: string;
        composition: string;
        roastLevel: string;
        intensity: number;
        aromaticNotes: string[];
        description: string;
        kamiraNote: string;
      }>;
    };

    if (!parsed.found || !Array.isArray(parsed.blends) || parsed.blends.length === 0) {
      res.status(404).json({
        error: `Non abbiamo trovato una marca di caffè corrispondente a "${rawQuery}". Prova con il nome completo della torrefazione.`,
      });
      return;
    }

    const slug = parsed.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const validRoasts = new Set(['Chiara', 'Media', 'Media-Scura', 'Scura']);

    const normalizedBlends: CoffeeBlend[] = parsed.blends.map((b, index) => {
      const isMoka = b.packSymbol === 'moka' || b.grindType === 'grossa';
      const grindType = isMoka ? 'grossa' : 'fine';
      const packSymbol = isMoka ? 'moka' : 'espresso';
      const roastLevel = validRoasts.has(b.roastLevel)
        ? (b.roastLevel as CoffeeBlend['roastLevel'])
        : 'Media';

      return {
        id: `${slug}-live-${index + 1}`,
        name: b.name,
        subtitle: b.subtitle,
        grindType,
        grindLabel: b.grindLabel || (isMoka ? 'Medio-Grossa (Moka)' : 'Fine (Espresso)'),
        micronRange: b.micronRange || (isMoka ? '550–700 µm' : '240–340 µm'),
        packSymbol,
        kamiraCompatible: isMoka,
        origins: Array.isArray(b.origins) && b.origins.length > 0 ? b.origins : ['Origini miste'],
        originRegionSummary: b.originRegionSummary || 'Selezioni internazionali',
        composition: b.composition || 'Miscela selezionata',
        roastLevel,
        intensity: Math.min(10, Math.max(1, Math.round(Number(b.intensity) || 7))),
        aromaticNotes: Array.isArray(b.aromaticNotes) ? b.aromaticNotes.slice(0, 4) : [],
        description: b.description,
        kamiraNote: b.kamiraNote,
      };
    });

    const brand: CoffeeBrand = {
      id: `live-${slug}`,
      name: parsed.name,
      city: parsed.city || 'Italia',
      country: parsed.country || 'Italia',
      foundedYear: parsed.foundedYear || 'Storica',
      summary: parsed.summary,
      signatureStyle: parsed.signatureStyle || 'Torrefazione tradizionale',
      isLiveResult: true,
      blends: normalizedBlends,
    };

    res.json({ brand });
  } catch (err) {
    console.error('Errore ricerca marca Gemini:', err);
    res.status(500).json({
      error:
        'Si è verificato un errore durante la ricerca della marca. Riprova tra qualche istante.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkopriKikko server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

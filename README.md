# SkopriKikko — Generazione APK Android con GitHub

Questo repository è già pronto per generare automaticamente il file **SkopriKikko.apk** direttamente su GitHub tramite **GitHub Actions** (senza dover installare Android Studio sul PC).

## Come ottenere l'APK da GitHub

1. Esporta o carica questo progetto in un repository su **GitHub** (branch `main` o `master`).
2. Apri la scheda **Actions** del repository su GitHub.
3. Vedrai partire automaticamente il workflow **Build SkopriKikko Android APK** (puoi anche avviarlo manualmente cliccando **Run workflow**).
4. Al termine della build (circa 2–3 minuti), scorri in basso nella sezione **Artifacts** e scarica **SkopriKikko-APK** (contiene `SkopriKikko.apk`).
5. Trasferisci `SkopriKikko.apk` sul telefono Android e installalo.

## Protezione della barra di stato (orario e batteria)

L'app include una protezione multilivello per impedire all'header di sovrapporsi alla barra superiore del telefono Android (orario, icone notifiche e percentuale batteria):

- `viewport-fit=cover` + `safe-area-top` (`env(safe-area-inset-top)` e `--safe-area-inset-top`) sull'header (`src/components/Header.tsx`)
- Plugin `SystemBars` (`insetsHandling: 'css'`, `style: 'LIGHT'`) e `StatusBar` (`overlaysWebView: false`, `#FCF9F4`) in `capacitor.config.ts` e `src/utils/mobileStatusBar.ts`
- Tema Android `fitsSystemWindows=true` e `windowLightStatusBar=true` applicato automaticamente da `scripts/configure-android.mjs`

## Ricerca marche extra online nell'APK (opzionale)

Nell'APK sono già incluse offline tutte le 12 principali torrefazioni italiane. Se vuoi abilitare dentro l'APK anche la ricerca online di marche aggiuntive, imposta su GitHub in **Settings > Secrets and variables > Actions > Variables** la variabile `VITE_API_BASE_URL` con l'URL del tuo server SkopriKikko pubblicato.

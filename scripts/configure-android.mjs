import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const androidResDir = path.resolve('android/app/src/main/res');
const androidValuesDir = path.join(androidResDir, 'values');
const stylesPath = path.join(androidValuesDir, 'styles.xml');
const colorsPath = path.join(androidValuesDir, 'colors.xml');
const iconBgPath = path.join(androidValuesDir, 'ic_launcher_background.xml');
const logoSourcePath = path.resolve(
  'public/assets/aistudio/file_0000000052e482468eb1a3fb8669d88d_f2cd885c.png'
);

if (!fs.existsSync(androidValuesDir)) {
  console.error(
    'Cartella android/ non trovata. Esegui prima "npx cap add android" e "npx cap sync android".'
  );
  process.exit(1);
}

// 1. Colori tema coerenti con la palette marrone, beige e bianco di SkopriKikko
const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#2C1B12</color>
    <color name="colorPrimaryDark">#FCF9F4</color>
    <color name="colorAccent">#744932</color>
    <color name="statusBarBg">#FCF9F4</color>
    <color name="navBarBg">#2C1B12</color>
</resources>
`;

// 2. Stile Android con barra di stato chiara, icone scure (orario/batteria) e fitsSystemWindows=true
const stylesXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>

    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    <style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:background">@null</item>
        <item name="android:statusBarColor">@color/statusBarBg</item>
        <item name="android:windowLightStatusBar">true</item>
        <item name="android:navigationBarColor">@color/navBarBg</item>
        <item name="android:fitsSystemWindows">true</item>
    </style>

    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="android:background">@drawable/splash</item>
        <item name="android:statusBarColor">@color/statusBarBg</item>
        <item name="android:windowLightStatusBar">true</item>
    </style>

</resources>
`;

// 3. Sfondo icona adattiva nero in continuità con il bordo circolare dorato del logo SkopriKikko
const icLauncherBgXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#000000</color>
</resources>
`;

fs.writeFileSync(colorsPath, colorsXml, 'utf8');
fs.writeFileSync(stylesPath, stylesXml, 'utf8');
fs.writeFileSync(iconBgPath, icLauncherBgXml, 'utf8');

// 4. Applicazione del logo SkopriKikko a tutte le icone launcher Android (legacy + adaptive)
function applyAndroidIcons() {
  if (!fs.existsSync(logoSourcePath)) {
    console.warn('Logo SkopriKikko non trovato, salto generazione icone.');
    return;
  }

  const densities = [
    { folder: 'mipmap-mdpi', legacy: 48, foreground: 108 },
    { folder: 'mipmap-hdpi', legacy: 72, foreground: 162 },
    { folder: 'mipmap-xhdpi', legacy: 96, foreground: 216 },
    { folder: 'mipmap-xxhdpi', legacy: 144, foreground: 324 },
    { folder: 'mipmap-xxxhdpi', legacy: 192, foreground: 432 },
  ];

  // Rimuove eventuali .webp preesistenti per evitare conflitti di risorse duplicate in Gradle/AAPT2
  for (const d of densities) {
    const dir = path.join(androidResDir, d.folder);
    fs.mkdirSync(dir, { recursive: true });
    for (const file of fs.readdirSync(dir)) {
      if (file.startsWith('ic_launcher') && file.endsWith('.webp')) {
        fs.unlinkSync(path.join(dir, file));
      }
    }
  }

  // Prova a ridimensionare in alta qualità con Python Pillow (preinstallato o installato nel workflow)
  const pyScript = `
import os, sys
from PIL import Image

src_path = sys.argv[1]
res_dir = sys.argv[2]
img = Image.open(src_path).convert("RGBA")

densities = [
    ("mipmap-mdpi", 48, 108),
    ("mipmap-hdpi", 72, 162),
    ("mipmap-xhdpi", 96, 216),
    ("mipmap-xxhdpi", 144, 324),
    ("mipmap-xxxhdpi", 192, 432),
]

for folder, legacy_size, fg_size in densities:
    out_dir = os.path.join(res_dir, folder)
    os.makedirs(out_dir, exist_ok=True)

    # Icona standard e tonda
    legacy = img.resize((legacy_size, legacy_size), Image.Resampling.LANCZOS)
    legacy.save(os.path.join(out_dir, "ic_launcher.png"), "PNG")
    legacy.save(os.path.join(out_dir, "ic_launcher_round.png"), "PNG")

    # Icona adattiva foreground con safe-zone ~70% per non tagliare mai l'anello dorato
    fg_canvas = Image.new("RGBA", (fg_size, fg_size), (0, 0, 0, 0))
    inner_size = int(round(fg_size * 0.72))
    inner_img = img.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
    offset = (fg_size - inner_size) // 2
    fg_canvas.paste(inner_img, (offset, offset), inner_img)
    fg_canvas.save(os.path.join(out_dir, "ic_launcher_foreground.png"), "PNG")

# Aggiorna anche gli splash drawable con logo centrato su sfondo caldo
for splash_folder, size in [
    ("drawable", (1080, 1920)),
    ("drawable-port-mdpi", (320, 480)),
    ("drawable-port-hdpi", (480, 800)),
    ("drawable-port-xhdpi", (720, 1280)),
    ("drawable-port-xxhdpi", (960, 1600)),
    ("drawable-port-xxxhdpi", (1280, 1920)),
    ("drawable-land-mdpi", (480, 320)),
    ("drawable-land-hdpi", (800, 480)),
    ("drawable-land-xhdpi", (1280, 720)),
    ("drawable-land-xxhdpi", (1600, 960)),
    ("drawable-land-xxxhdpi", (1920, 1280)),
]:
    s_dir = os.path.join(res_dir, splash_folder)
    if os.path.isdir(s_dir):
        w, h = size
        canvas = Image.new("RGBA", (w, h), (28, 16, 10, 255))
        logo_dim = int(min(w, h) * 0.48)
        resized = img.resize((logo_dim, logo_dim), Image.Resampling.LANCZOS)
        canvas.paste(resized, ((w - logo_dim) // 2, (h - logo_dim) // 2), resized)
        canvas.convert("RGB").save(os.path.join(s_dir, "splash.png"), "PNG")

print("Icone e splash screen SkopriKikko generati con successo.")
`;

  try {
    execFileSync('python3', ['-c', pyScript, logoSourcePath, androidResDir], {
      stdio: 'inherit',
    });
  } catch {
    // Fallback diretto senza Pillow: copia il PNG originale nelle cartelle mipmap
    console.warn('Pillow non disponibile: uso copia diretta del logo PNG nelle cartelle mipmap.');
    for (const d of densities) {
      const dir = path.join(androidResDir, d.folder);
      fs.copyFileSync(logoSourcePath, path.join(dir, 'ic_launcher.png'));
      fs.copyFileSync(logoSourcePath, path.join(dir, 'ic_launcher_round.png'));
      fs.copyFileSync(logoSourcePath, path.join(dir, 'ic_launcher_foreground.png'));
    }
  }
}

applyAndroidIcons();
console.log('Configurazione Android SkopriKikko completata (logo + status bar protetta).');

import fs from 'fs';
import path from 'path';

const androidValuesDir = path.resolve('android/app/src/main/res/values');
const stylesPath = path.join(androidValuesDir, 'styles.xml');
const colorsPath = path.join(androidValuesDir, 'colors.xml');

if (!fs.existsSync(androidValuesDir)) {
  console.error(
    'Cartella android/ non trovata. Esegui prima "npx cap add android" e "npx cap sync android".'
  );
  process.exit(1);
}

// Colori tema coerenti con la palette marrone, beige e bianco di SkopriKikko
const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#2C1B12</color>
    <color name="colorPrimaryDark">#FCF9F4</color>
    <color name="colorAccent">#744932</color>
    <color name="statusBarBg">#FCF9F4</color>
    <color name="navBarBg">#2C1B12</color>
</resources>
`;

// Stile Android compatibile con tutte le versioni SDK: mantiene la barra di stato
// chiara con icone scure leggibili (orario e batteria) e fitsSystemWindows=true
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

fs.writeFileSync(colorsPath, colorsXml, 'utf8');
fs.writeFileSync(stylesPath, stylesXml, 'utf8');

console.log('Configurazione tema Android SkopriKikko completata (status bar protetta).');

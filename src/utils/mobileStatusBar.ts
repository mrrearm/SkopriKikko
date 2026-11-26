import { Capacitor, SystemBars, SystemBarsStyle } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Configura le barre di sistema native su Android/iOS quando l'app viene
 * eseguita come APK Capacitor, impedendo all'header di sovrapporsi
 * a orario, notifiche e percentuale batteria.
 */
export async function configureMobileStatusBar(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    // Capacitor 8 SystemBars API: imposta icone scure leggibili su sfondo chiaro #FCF9F4
    await SystemBars.setStyle({ style: SystemBarsStyle.Light });
  } catch (err) {
    console.warn('SystemBars configuration skipped:', err);
  }

  try {
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.setBackgroundColor({ color: '#FCF9F4' });
    await StatusBar.setStyle({ style: Style.Light });
  } catch (err) {
    console.warn('StatusBar configuration skipped:', err);
  }
}

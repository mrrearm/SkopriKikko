# SkopriKikko — Sito Web Pubblico e Generazione APK Android

Questo repository include due workflow automatici su **GitHub Actions**: uno per pubblicare il sito web pubblico gratuito con `SkopriKikko` nell'indirizzo e uno per generare automaticamente `SkopriKikko.apk` per Android.

## 1. Pagina web pubblica (`https://mrrearm.github.io/SkopriKikko/`)

1. Carica il progetto su GitHub (branch `main` o `master`).
2. Nel repository GitHub vai su **Settings > Pages**.
3. Alla voce **Build and deployment > Source** scegli **GitHub Actions**.
4. Il workflow **Deploy SkopriKikko Public Website (GitHub Pages)** pubblicherà automaticamente il sito su:
   `https://<tuo-username>.github.io/SkopriKikko/` (nel tuo caso `https://mrrearm.github.io/SkopriKikko/`).
5. *(Opzionale)* Se acquisti un dominio personalizzato (es. `skoprikikko.it` o `skoprikikko.com`), puoi collegarlo direttamente da **Settings > Pages > Custom domain**.

## 2. Generazione APK Android (`SkopriKikko.apk`)

1. Apri la scheda **Actions** del repository su GitHub.
2. Apri il workflow **Build SkopriKikko Android APK** (parte ad ogni push o cliccando **Run workflow**).
3. Al termine, scarica l'artifact **SkopriKikko-APK** contenente `SkopriKikko.apk` già configurato con logo, splash screen e protezione della barra di stato (orario e batteria).

## Ricerca marche extra online (opzionale)

Sia il sito web sia l'APK funzionano subito offline con 32 torrefazioni italiane e internazionali (oltre 100 miscele complete di grammatura, origine dei chicchi e compatibilità Kamira) già integrate. Per abilitare anche la ricerca online di marche aggiuntive, imposta su GitHub in **Settings > Secrets and variables > Actions > Variables** la variabile `VITE_API_BASE_URL` con l'URL del tuo server SkopriKikko pubblicato.

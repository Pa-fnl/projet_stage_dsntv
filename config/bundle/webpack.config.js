const Encore = require("@symfony/webpack-encore");

// Manually configure the runtime environment if not already configured yet by the "encore" command.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore
  // dossier de sortie des assets compilés
  .setOutputPath("public/build/")
  // chemin public utilisé par le serveur pour accéder aux assets
  .setPublicPath("/build")
  // si besoin pour un CDN ou déploiement en sous‑répertoire
  //.setManifestKeyPrefix('build/')

  /*
   * POINTS D’ENTRÉE
   */
  // ton JS principal
  .addEntry("app", "./assets/app.js")

  // vidéo page accueil bannière
  .addEntry("default", "./assets/js/default.js")

  // page base.html
  .addEntry("base", "./assets/js/base.js")

  // page cookie consent
  .addEntry("cookie", "./assets/js/cookie_consent.js")

  // page de soumission de projet (contribution)
  .addEntry("project_submission", "./assets/js/project_submission.js")
  .addStyleEntry(
    "project_submission_styles",
    "./assets/styles/project_submission.css"
  )
  // service de favoris
  .addEntry("favorite", "./assets/js/favorite.js")

  .addEntry("video_history_tracking", "./assets/js/video_history_tracking.js")

  // page mon projet
  .addStyleEntry("my_project", "./assets/styles/my_project.css")

  // page show projet
  .addStyleEntry("show_project", "./assets/styles/show_project.css")

  // historique de l’utilisateur
  .addEntry("account_history", "./assets/js/account_history.js")

  // page d'administration des soumissions
  .addStyleEntry(
    "admin_project_submissions_styles",
    "./assets/styles/admin_project_submissions.css"
  )

  // split automatique des “chunks” pour optimiser
  .splitEntryChunks()

  // runtime.js séparé (utile sauf si SPA)
  .enableSingleRuntimeChunk()

  // nettoyage du dossier build avant chaque compilation
  .cleanupOutputBeforeBuild()

  // notifications système de build (décommenter si tu veux)
  // .enableBuildNotifications()

  // sourcemaps en dev
  .enableSourceMaps(!Encore.isProduction())
  // hash dans les fichiers en prod pour le cache-busting
  .enableVersioning(Encore.isProduction())

  // config Babel+polyfills
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = "3.38";
  });

// activer SCSS/SASS si besoin
// .enableSassLoader()

// TypeScript, React, integrity, jQuery… tu as tout en commentaire pour activation ultérieure

module.exports = Encore.getWebpackConfig();

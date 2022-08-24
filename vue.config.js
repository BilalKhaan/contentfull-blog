module.exports = {
  // These options are overridden in env files
  pluginOptions: {
    //s3Deploy config is overwritten in .env.local files
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default', //BUG when set to something else than default
      region: 'eu-central-1',
      bucket: 'staging.auto-assurance.be',
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'error.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: true,
      cloudfrontId: 'EFDPO45IGWHOD',
      cloudfrontMatchers: '/*',
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
}

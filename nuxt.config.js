const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
  'CONFIG_REPO',
  'CTF_HOST',
  'URL',
  'GOOGLE_TAG_MANAGER_ID'
])
const {createClient} = require('./plugins/contentful-connector')
const cdaClient = createClient(ctfConfig)
const cmaContentful = require('contentful-management')
const config = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Seraphin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff'},
      //{ hid: 'description', name: 'description', content: 'Custom app in under 5 minutes' } => description is defined in _.vue
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicons/apple-touch-icon.png', sizes: '160x160' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'mask-icon', type: 'image/png',  href: '/favicons/safari-pinned-tab.svg', color: '#5bbad5'},
      //{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/minireset.css/0.0.2/minireset.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#2199e8' },

  /*
  ** Build configuration
  */
  //mode: 'spa',
  build: {
    /*
    ** Run ESLINT on save
    */
    analyze: true,
    optimization: {
      splitChunks: {
        chunks: 'async',
      }
    },
    splitChunks: {
      pages: false,
      vendor: false,
      commons: false,
      runtime: false,
      app:false,
      layouts: false
    },
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
    ,
    extend (config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    },

    postcss: [
      require('autoprefixer')({
        browsers: ['> 5%']
      })
    ]
  },

  /*
  ** ᕕ( ᐛ )ᕗ SERAPHIN WEBSITEFACTORY
  ** Make client available everywhere via Nuxt plugins
  */
  plugins: [
    '~/plugins/contentful-connector',
    '~/plugins/vue-lazyload',
    '~/plugins/jsonld',
    '~/plugins/lazysizes.client.js'
  ],
  serverMiddleware: [
    '~/plugins/headers.js'
  ],
  /*
  ** Important: keep sitemap module at the end of the array of modules
  */
  modules: [
    '@nuxtjs/robots',
    'nuxt-trailingslash-module',
    '@nuxtjs/sentry',
    '@nuxtjs/style-resources',
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
    'nuxt-webfontloader',
    '@nuxtjs/sitemap',
    "nuxt-compress"
  ],

  "nuxt-compress": {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },
  
/* UNCOMMENT WHEN YOU'LL HAVE ACTIVATED CONTAINERS
  buildModules: [
    '@nuxtjs/gtm',
  ],

  gtm: {
    pageTracking: true,
    id() {
      // @FixMe: create a proper boolean global variable that tells if we are in staging or production environment
      if (ctfConfig.CTF_HOST == "cdn.contentful.com") return ctfConfig.GOOGLE_TAG_MANAGER_ID
      return 'GTM-XXXXXXX'
    } 
  },
*/

  styleResources: {
    //@FixMe: put proper variable with name in env file
    scss: [
      './assets/style/'+ctfConfig.CONFIG_REPO.replace("staging-","").replace("production-","")+'.scss',
      './assets/style/global.scss' // use underscore "_" & also file extension ".scss"
    ]
  },
  webfontloader: {
    google: {
      families: ['Nunito:200&display=swap'], //Loads Lato font with weights 400 and 700
    }
  },
  
  sentry: {
      dsn: 'https://2c569a9de7634fb6958087efc7876a49@sentry.io/5167229', // Enter your project's DSN here
      config: {}, // Additional config
  },

  /*
  ** ᕕ( ᐛ )ᕗ SERAPHIN WEBSITEFACTORY
  ** Get all blog posts from Contentful
  ** and generate the needed files upfront
  **
  ** Included:
  ** - blog posts
  */
  generate: {
    dir:'dist/'+ ctfConfig.CONFIG_REPO,
    fallback: true,
    interval: 3000,
    concurrency:1,
    subFolders: true,
    routes () {
      return Promise.all([
        // get all blog posts
        cdaClient.getEntries({
          'content_type': ctfConfig.CTF_BLOG_POST_TYPE_ID
        })
      ])
      .then(([entries]) => {
        return [
          // map entries to URLs
          ...entries.items.map(entry => ({
            route:`${entry.fields.slug}`,
            payload: entry
          })),
        ]
      })
    },
    exclude: [
      /^(?=.*\bvalidation\b).*$/
    ]
  },
  sitemap: {
    hostname: ctfConfig.URL,
    trailingSlash: true
  },
  robots: {
    SiteMap: ctfConfig.URL + '/sitemap.xml',
    UserAgent: '*',
    Disallow () {
      // @FixMe: create a proper boolean global variable that tells if we are in staging or production environment
      if (ctfConfig.CTF_HOST == "cdn.contentful.com") return "/validation"
      else return "/"
    }
  },

  /*
  ** Define environment variables being available
  ** in generate and browser context
  */
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID,
    CONFIG_REPO: ctfConfig.CONFIG_REPO,
    CTF_HOST: ctfConfig.CTF_HOST,
    URL: ctfConfig.URL,
    GOOGLE_TAG_MANAGER_ID:ctfConfig.GOOGLE_TAG_MANAGER_ID,
  },

      // putting cache-control max age for static files
  render: {
    static: {
      setHeaders(res) {
        res.setHeader('cache-control', 'max-age=31536000')
      }  
    }
  },
}
module.exports = config
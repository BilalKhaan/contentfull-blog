import VueLib from 'vue'
import * as Sentry from '@sentry/browser'
import { Dedupe, ExtraErrorData, ReportingObserver, RewriteFrames, Vue } from '@sentry/integrations'

export default function (ctx, inject) {
  const opts = Object.assign({}, {"dsn":"https:\u002F\u002F2c569a9de7634fb6958087efc7876a49@sentry.io\u002F5167229","environment":"development"}, {
    integrations: [
      new Dedupe({}),
      new ExtraErrorData({}),
      new ReportingObserver({}),
      new RewriteFrames({}),
      new Vue({Vue: VueLib, ...{"attachProps":true}})
    ]
  })

  // Initialize sentry
  Sentry.init(opts)

  // Inject Sentry to the context as $sentry
  inject('sentry', Sentry)
  ctx.$sentry = Sentry
}

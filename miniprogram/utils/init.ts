import { gatherOrDispatchStat } from "./stat"
import { _handleInstanceMethod, getPageMethods, statClick } from "./util"
import { appHooks, pageHooks } from "./hook"
import config from "./config"

const app = App
const page = Page
const { listenCustomEvent } = config

const init = () => {
  App = function (appOptions) {
    const { globalData } = appOptions
    Object.assign(globalData, {
      instance: {
        statClick,
      },
    })

    appHooks.forEach((hookName) => {
      _handleInstanceMethod(appOptions, hookName, function (e) {
        gatherOrDispatchStat({
          pagePath: e.path,
          eventName: hookName,
        })
      })
    })

    app(appOptions)
  }
  Page = function (pageOptions) {
    pageHooks.forEach((hookName) => {
      _handleInstanceMethod(pageOptions, hookName, function (e) {
        gatherOrDispatchStat({
          pagePath: e?.path || "",
          eventName: hookName,
        })
      })
    })
    if (!listenCustomEvent) return

    const methods = getPageMethods(pageOptions)
    methods?.forEach((methodName) => {
      _handleInstanceMethod(pageOptions, methodName, function (e) {
        gatherOrDispatchStat({
          pagePath: e?.path || "",
          eventName: methodName,
        })
      })
    })
    page(pageOptions)
  }
}

export default init

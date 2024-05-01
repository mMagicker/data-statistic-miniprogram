// App中需要埋点的声明周期
export const appHooks = ["onLaunch", "onShow", "onHide", "onError"]

// Page中需要埋点的声明周期
export const pageHooks = [
  "onLoad",
  "onShow",
  "onReady",
  "onHide",
  "onUnload",
  "onShareAppMessage",
  "onAddToFavorites",
]

// Component中需要埋点的声明周期
export const componentHooks = []

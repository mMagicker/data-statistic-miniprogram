import { pageHooks } from "./hook"
import { gatherOrDispatchStat } from "./stat"

// 执行实例方法，并且触发埋点
export const _handleInstanceMethod = function (
  instanceData: any,
  name: string,
  callback: (...args: any[]) => void
) {
  if (instanceData[name]) {
    const e = instanceData[name]
    instanceData[name] = function (arg: any) {
      callback.call(this, arg)
      e.call(this, arg)
    }
  } else {
    instanceData[name] = function (arg: any) {
      callback.call(this, arg)
    }
  }
}
// 获取事件
export const getPageMethods = function (options) {
  let methods = []
  for (let m in options) {
    if (typeof options[m] === "function" && !pageHooks[m]) {
      methods.push(m)
    }
  }
  return methods
}

// 可以用自定义触发埋点
export const statClick = function (eventName: string) {
  gatherOrDispatchStat({
    eventName,
  })
}
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : "0" + s
}

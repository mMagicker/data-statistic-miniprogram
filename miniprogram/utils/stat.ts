type StatType = {
  eventName: string
  pagePath?: string
}

const _generatorUuid = () => {
  let uuid = wx.getStorageSync("stat_uuid")
  if (!uuid) {
    uuid = `user_${Date.now()}`
    wx.setStorageSync("stat_uuid", uuid)
  }
  return uuid
}

const statData = {
  time: "",
  uuid: _generatorUuid(),
  pagePath: "",
  eventName: "",
}

const duration = 5000 // 多长时间触发派发日志操作
let timer: number | null = null
let time = 0
let statList: any[] = [] // 日志收集缓存

// 收集并派发函数
export const gatherOrDispatchStat = function (param: StatType) {
  const pages = getCurrentPages()
  const data = {
    ...statData,
    ...param,
  }
  const now = Date.now()
  data.time = now.toString()
  data.pagePath = pages[pages.length - 1]?.route || param.pagePath || ""

  if (now - time > duration) {
    const patchData = [data, ...statList]
    statList = []
    time = now
    clearTimeout(timer!)
    timer = setTimeout(() => {
      // 派发日志操作
      console.log(patchData, "patchData")
    }, duration)
  } else {
    statList.push(data)
  }
}

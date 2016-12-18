// kknews API 操作
var kkdata = require('../../data/kk-data.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    infos: [],
    id: 488,
    loading: false,
    hasMore: false,
    next: 0,
    testPage: 1
  },
  onLoad() {
    this.search(0)
  },
  loadMore() {
    if (!this.data.hasMore) return
    page = this.data.testPage++
    this.setData({ loading: true })
    this.search(page)
  },
  search(params) {
    this.setData({ hasMore: true, loading: true })
    if (params >= 2) {
      this.setData({ hasMore: false, loading: false })
      return
    }
    var d = kkdata.kkdata[params]
    if (d.length) {
      d[0].index = 0
      this.setData({ infos: params ? this.data.infos.concat(d) : d, loading: false, next: d[d.length - 1].newstime })
    } else {
      this.setData({ hasMore: false, loading: false })
    }
  }
})

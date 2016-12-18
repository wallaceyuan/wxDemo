var douban = require('../../utils/douban.js')

Page({
  data: {
    title: '',
    loading: true,
    book: {}
  },
  onLoad(params) {
    var that = this
    douban.findLink(params.id)
      .then(function (d) {
        that.setData({ title: d.book.title, book: d.book, ant: d.annotations, loading: false })
      })
      .catch(function (e) {
        that.setData({ title: '获取数据异常', book: {}, loading: false })
        console.error(e)
      })
  },
  onReady() {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 读书 « 豆瓣' })
  }
})

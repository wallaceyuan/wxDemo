var app = getApp()
var douban = require('../../utils/douban.js')

Page({
  data: {
    page: 1,
    size: 20,
    subtitle: '请在此输入搜索内容',
    books: [],
    search: '',
    loading: false,
    hasMore: false
  },
  lower(e) {
    var that = this
    console.log('lower')
    if (!this.data.hasMore) return
    this.setData({ subtitle: '加载中...', loading: true })
    douban.find('search', this.data.page++, this.data.size, this.data.search)
      .then(function (d) {
        if (d.books.length) {
          that.setData({ books: that.data.books.concat(d.books), loading: false })
        } else {
          that.setData({ hasMore: false, loading: false })
        }
      })
      .catch(function (e) {
        console.error(e)
        that.setData({ subtitle: '获取数据异常', loading: false })
      })
  },
  search(e) {
    var that = this
    if (!e.detail.value) return
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value })
    douban.find('search', this.data.page++, this.data.size, this.data.search)
      .then(function (d) {
        if (d.books.length) {
          that.setData({ books: d.books, loading: false })
        } else {
          that.setData({ hasMore: false, loading: false })
        }
      })
      .catch(function(e) {
        that.setData({ subtitle: '获取数据异常', books: [], loading: false })
        console.error(e)
      })
  }
})

var util = require('../../utils/util.js')
var douban = require('../../utils/douban.js')
var API_URL = 'https://api.douban.com/v2/book'

Page({
  data: {
    page: 1,
    size: 20,
    subtitle: '釜山行、夏有乔木仰望天堂',
    searching: false,
    search: '',
    books: [],
    loading: true,
    id: util.predict(Math.ceil(Math.random() * 3))
  },
  setSeries() {
    this.getData(util.predict(Math.ceil(Math.random() * 3)))
  },
  onLoad() {
    this.getData(this.data.id)
    //this.test()
  },
  onPullDownRefresh() {
    this.setData({
      searching: false,
      search:''
    })
    this.getData(util.predict(Math.ceil(Math.random() * 3)))
  },
  getData(id) {
    console.log('getData')
    var that = this
    id = id ? id : 1
    douban.findSeries(id)
      .then(function (d) {
        console.log(d)
        that.setData({ books: d.books, loading: false })
        //wx.stopPullDownRefresh()
      })
      .catch(function (e) {
        console.error(e)
        that.setData({ books: [], loading: false })
      })
  },
  onBindFocus(){

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
    console.log(e.detail.value)
    this.setData({
      searching: true,
      page:1
    })
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
      .catch(function (e) {
        that.setData({ subtitle: '获取数据异常', books: [], loading: false })
        console.error(e)
      })
  },
  test() {
    this.es6Promise().then(function (d) {
      console.log(d)
    }).catch(function (e) {
      console.error(e)
    })
  },
  es6Promise(params) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: `https://api.douban.com/v2/book/series/65/books`,
        data: Object.assign({}, params),
        header: { 'Content-Type': 'application/json' },
        success: resolve,
        fail: reject
      })
    })
  }
})
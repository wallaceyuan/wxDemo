var util = require('../../utils/util.js')
var douban = require('../../utils/douban.js')
var API_URL = 'https://api.douban.com/v2/book'

Page({
  data: {
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
      })
      .catch(function (e) {
        console.error(e)
        that.setData({ books: [], loading: false })
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
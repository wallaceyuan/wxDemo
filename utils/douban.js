"use strict"
var Promise = require('./promise.js')
var API_URL = 'https://api.douban.com/v2/book'

function fetchApi(type, params) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: API_URL + '/' + type,
      data: params,
      header: { 'Content-Type': 'application/json' },
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {
  find (type, page, count , search) {
    page = page||1,count = count||20,search = search || ''
    var params = { 'start': (page - 1) * count, 'count': count }
    search ? params.q = search : params
    return fetchApi(type, params)
      .then(function(res){return res.data })
  },
  findSeries(id) {
    return fetchApi('series/' + id + '/books', '')
      .then(function (res) {
        return res.data
      })
  },
  findLink(id) {
    console.log('findLink')
    var p1 = fetchApi('/' + id, '')
    var p2 = fetchApi('/' + id + '/annotations?order=rank', '')
    return Promise.all([p1, p2])
      .then(function (value) {
        console.log('value0', value[0])
        var dd = {}
        dd.book = value[0].data, dd.annotations = value[1].data
        console.log('all promise  aaa', dd)
        return dd
      })
  }
}
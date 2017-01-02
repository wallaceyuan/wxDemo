var wxlogin = require('../../../utils/wxlogin.js')
console.log('wxlogin', wxlogin)
Page({
  data: {
    formId: null
  },
  formSubmit: function (e) {
    this.setData({
      "formId": e.detail.formId
    })
    this.formRequest()
    console.log('form发生了submit事件，携带数据为：', e.detail)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  formTest() {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=dVazjowyAbeHAL9_wbcoEn17z3mWgvC1eJ8bcSLQ86hLXISzfsazfzof_mlAAEA-HmesHS5gNKHGLnMED41MIl29pGAPmrM3n2aH_7rn5anm2GIkrYQzQ6WEisVpMY6XDKVbAGARYJ',
      data: {
        "touser": "oHRD60DX-g3Y6CJEoBqLgubHeqAQ",
        "template_id": "Y2l6DmEGLNybEsr4CkaI1f4DjNvF8uFs8V6s_hpUKXQ",
        "page": "../sefunc",
        "form_id": this.data.formId,
        "data": {
          "keyword1": {
            "value": "339208499",
            "color": "#173177"
          },
          "keyword2": {
            "value": "2015年01月05日 12:30",
            "color": "#173177"
          },
          "keyword3": {
            "value": "粤海喜来登酒店",
            "color": "#173177"
          },
          "keyword4": {
            "value": "广州市天河区天河路208号",
            "color": "#173177"
          }
        },
        "emphasis_keyword": "keyword1.DATA"
      },
      method: 'POST',
      success: function (res) {
        console.log('success', res)
      },
      fail: function (fail) {
        console.log('fail', fail)
      },
      complete: function () {
        // complete
      }
    })
  },
  formRequest() {
    var formId = this.data.formId
    console.log('formId',formId)
    var template_id = 'Y2l6DmEGLNybEsr4CkaI1f4DjNvF8uFs8V6s_hpUKXQ'
    wxlogin.wxLogin(function (data) {
      var session = data
      wx.request({
        url: 'https://api.wallaceyuan.cn/wxlogin/template',
        data: {
          'formId': formId,
          'template_id': template_id,
          'session': session
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log('success', res)
        },
        fail: function (fail) {
          console.log('fail', fail)
        },
        complete: function () {
          // complete
        }
      })
    })
  }
})
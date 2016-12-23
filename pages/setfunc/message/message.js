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
  formRequest() {
    var formId = this.data.formId
    var template_id = 'Y2l6DmEGLNybEsr4CkaI1f4DjNvF8uFs8V6s_hpUKXQ'
  }
})
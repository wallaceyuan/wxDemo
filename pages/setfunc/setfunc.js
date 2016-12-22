// pages/setfunc/setfunc.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  scanCodeFunc: function () {
    wx.scanCode({
      success: function(res){
        console.log(res)
      }
    })
  }
})
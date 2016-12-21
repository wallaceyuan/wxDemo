var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  bindViewTap: function() {
    wx.switchTab({
      url: '../board/board',
      success:function(e){
        console.log(e)
      },
      fail:function(e){
        console.log('fail',e)
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
  }
})

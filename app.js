//app.js
var wilddog = require('./utils/wilddog.js')
var wxlogin = require('./utils/wxlogin.js')

App({
  onLaunch: function () {
    var config = {
      syncURL: 'https://wallace741130.wilddogio.com',
      authDomain: 'wallace741130.wilddog.com'
    }
    wilddog.initializeApp(config)
    wilddog.auth().signInWeapp(function (err, user) {
      console.log(err)
      console.log(user)
    })
    wxlogin.wxLogin()
  },
  getRef: function (name) {
    //console.log('getRef')
    var refName = name ? 'todo/' + name : 'todo'
    return wilddog.sync().ref(refName);
  },
  getUserInfo: function (cb) {
    console.log('getUserInfo getUserInfo', this.globalData.userInfo)
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (result) {//result 传回code
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    g_isPlayingMusic: false,
    g_isPlayingId: null
  }
})
//app.js
var wilddog = require('./utils/wilddog.js')

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
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: {
      avatarUrl:"http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIUBxyYZDdicejct6gkBDRZnIwRmGBkl6u10ncszVy5clWibCV9bUf2hlnW22nLKanKOa9LIKIxatrA/0",
      city: "",
      country:"",
      gender :1,
      language:"zh_CN",
      nickName:"圆儿圈圈",
      province:""
    },
    g_isPlayingMusic: false,
    g_isPlayingId: null
  }
})
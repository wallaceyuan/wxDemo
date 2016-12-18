// wx相关 API 操作
var wxfunc = require('../../utils/wx.js')
var app = getApp();

Page({
  data: {
    mark: true,
    title: 'About Me',
    dailymakes: [],
    userInfo: {}
  },
  addImg() {
    var that = this
    wxfunc.chooseImage().then(function (res) {
      wxfunc.imgUpInfo(res).then(function (values) {
        var obj = {}
        obj.type = 'image', obj.width = values[0].width, obj.height = values[0].height, obj.src = JSON.parse(values[1]).poster
        var dd = that.data.dailymakes.concat(obj)
        that.setData({ dailymakes: dd })
      });
    })
  },
  add() {
    wx.redirectTo({
      url: "../new/new",
    });
  },
  operate() {
    var that = this
    wx.showActionSheet({
      itemList: ['添加文字', '添加图片', '确定发布'],
      success: function (res) {
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:
              console.log('0');
              break;
            case 1:
              that.addImg()
              break;
            case 2:
              console.log('2')
              break;
            default:
              break;
          }
        }
      }
    })
  },
  getList: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      var name = userInfo.nickName
      var ref = app.getRef(name);
      ref.bindAsArray(this, 'todo');
      that.setData({
        userInfo: userInfo
      })
      console.log(app.globalData)
    })
  },
  onLoad() {
    this.getList()
  }
})
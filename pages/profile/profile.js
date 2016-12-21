// wx相关 API 操作
var wxFunc = require('../../utils/wx.js')
var app = getApp();
var name = app.globalData.userInfo.nickName
var ref = app.getRef(name);
var itemList = ['删除']

Page({
  data: {
    mark: true,
    title: 'About Me',
    dailymakes: [],
    userInfo: {}
  },
  addImg() {
    wxFunc.chooseImage().then(function (res) {
      wxFunc.imgUpInfo(res).then(function (values) {
        var obj = {}
        obj.type = 'image', obj.width = values[0].width, obj.height = values[0].height, obj.src = JSON.parse(values[1]).poster
        var dd = this.data.dailymakes.concat(obj)
        this.setData({ dailymakes: dd })
      });
    })
  },
  add() {
    wx.redirectTo({
      url: "../new/new",
    });
  },
  textTap(event) {
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (!res.cancel) {
          var wildKey = event.target.dataset.key
          var childRef = ref.child(wildKey);
          childRef.remove();
        }
      }
    })
  },
  videoErrorCallback(e) {
    console.log('视频错误信息:');
    console.log(e.detail.errMsg);
  },
  tapclick(event) {
    var attr = event.target.id
    attr == "mark" ? this.setData({ mark: true }) : this.setData({ mark: false })
  },
  getList: function () {

    ref.bindAsArray(this, 'todo');
  },
  onLoad() {
    this.getList()
  }
})
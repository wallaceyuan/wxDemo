var app = getApp()
var postData = require('../../data/posts-data.js')
Page({
  data: {
    imgUrls: [
      { "src":'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',postId:"0"},
      { "src":'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',postId:"1"},
      { "src":'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',postId:"2"}
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    post_content: {}
  },
  onLoad() {
    this.data.postList = postData.postList
    //this.setData({ post_content: postData.postList })
  },
  onPostTap(event) {
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})
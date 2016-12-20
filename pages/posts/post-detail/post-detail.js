var postData = require('../../../data/posts-data.js')
var app = getApp()

Page({
	data: {

	},
	onLoad(option) {
		var postid = option.id
		this.data.currentPostId = postid
		this.data.postData = postData.postList[postid]
		var postsCollected = wx.getStorageSync('post_collected')
		if (postsCollected) {
			var collected = postsCollected[postid]
			this.setData({
				'collected': collected
			})
		} else {
			var postsCollected = {}
			postsCollected[postid] = false
			wx.setStorageSync('post_collected', postsCollected)
		}
		var musicId = app.globalData.g_isPlayingId
		if (app.globalData.g_isPlayingMusic && musicId == postid) {
			this.data.isPlayingMusic = true
		}
		this.setMusicMonitor(postid)
	},
	onCollectionTap() {
		var postsCollected = wx.getStorageSync('post_collected')
		var postCollected = postsCollected[this.data.currentPostId]
		postCollected = !postCollected
		postsCollected[this.data.currentPostId] = postCollected
		wx.setStorageSync('post_collected', postsCollected)
		this.setData({
			"collected": postCollected
		})
		wx.showToast({
			title: postCollected ? '收藏成功' : '取消收藏成功',
			icon: 'success',
			duration: 1000
		})
	},
	onShareTap() {
		var itemList = ['分享到微信', '分享到微信朋友圈', '分享到微博']
		wx.showActionSheet({
			itemList: itemList,
			itemColor: "#405f80",
			success: function (res) {
				wx.showModal({
					title: '用户' + itemList[res.tapIndex],
					content: '用户是否取消？' + res.cancel + "现在无法实现分享功能",
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
						}
					}
				})
			}
		})
	},
	onMusicTap() {
		var that = this
		var postid = this.data.currentPostId
		var isPlayingMusic = this.data.isPlayingMusic
		if (isPlayingMusic) {
			wx.pauseBackgroundAudio()
			this.setData({
				isPlayingMusic: false
			})
			app.globalData.g_isPlayingId = ''
			app.globalData.g_isPlayingMusic = false
		} else {
			var music = postData.postList[postid].music
			var musicUrl = music.url
			wx.playBackgroundAudio({
				dataUrl: musicUrl,
				title: music.title,
				coverImgUrl: music.coverImg,
				success: function () {
					that.setData({
						isPlayingMusic: true
					})
					app.globalData.g_isPlayingId = postid
					app.globalData.g_isPlayingMusic = true
				},
				complete: function (e) {
					that.setMusicMonitor(postid)
				}
			})
		}
	},
	setMusicMonitor(postid) {
		var that = this
		wx.onBackgroundAudioPlay(function () {
			that.setData({
				isPlayingMusic: true
			})
			app.globalData.g_isPlayingId = postid
			app.globalData.g_isPlayingMusic = true
		})
		wx.onBackgroundAudioPause(function () {
			that.setData({
				isPlayingMusic: false
			})
			app.globalData.g_isPlayingId = ''
			app.globalData.g_isPlayingMusic = false
		})
	}
})
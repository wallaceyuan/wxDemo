//import {chooseImage,imgUpInfo} from '../../libraries/wx.js'

var wxFunc = require('../../utils/wx.js')
var app = getApp();
var ref = app.getRef();
var updateInfo;

Page({
	data:{
		imgBox:[],
		dailymakes:[],
		text:'',
		userInfo:{},
		address:'',
		status:false
	},
	delImg(e){
		var index = e.target.dataset.index
		this.data.imgBox.splice(index,1)
		this.setData({imgBox:this.data.imgBox})
		console.log(this.data.imgBox)
	},
	ok(){
		//var that = this
		//this.setData({dailymakes:that.data.dailymakes.concat(textObj)})
		/*获取缓存*/
		//let localData = wx.getStorageSync('dailymakes') || []

		//localData = localData.concat(Array.from(this.data.dailymakes))
		/*更新合并缓存*/
		//wx.setStorageSync('dailymakes', localData)

		var postsRef = ref.child(this.data.userInfo.nickName);
		//postsRef.push(this.data.dailymakes);

		postsRef.push({
			'image':this.data.imgBox,
			'text':this.data.text,
			"address":this.data.address
		})

		this.setData({imgBox:[],text:''})
		/*跳转*/
		wx.switchTab({
			url: "../profile/profile",
		});
	},
	cancel(){
		this.setData({imgBox:[],text:''})
		/*跳转*/
		wx.switchTab({
			url: "../profile/profile",
		});
	},
	cancelPlace(){
		this.setData({address:'',status:false})
	},
	addPlace(){
		var that = this
		wx.chooseLocation({
			success:function(res){
				var address = res.name
				that.setData({status:true,address:address})
			}
		})
	},
	bindinput(e){
		console.log('bindinput')
	},
	bindChange(e){
		console.log('change')
	},
	bindTextAreaBlur(e) {
		this.setData({text:e.detail.value})
	},
	addImg (){
		var that = this
		wxFunc.chooseImage().then(function(res){
			wxFunc.imgUpInfo(res).then(function(values){
				var obj = {}
				var src = JSON.parse(values[1]).poster
				console.log('upload res', src)
				//obj.type = 'image',obj.width = values[0].width, obj.height = values[0].height,obj.src = JSON.parse(values[1]).poster
				var image = that.data.imgBox.concat(src)
				that.setData({imgBox:image})
				console.log('imgBox',that.data.imgBox)
			});
		})
	},
	onLoad(){
		this.setData({
			userInfo:app.globalData.userInfo
		})
	}
})
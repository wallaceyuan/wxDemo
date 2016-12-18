var postData = require('../../../data/posts-data.js')

Page({
	data:{
		
	},
	onLoad(option) {
		var postid = option.id
		console.log(postid,postData.postList)
		this.data.postData = postData.postList[postid]
/*		console.log('onLoad',postData.postList)
		var postData = postData.postList[postid]
		this.data.postData = postData*/
	}
})
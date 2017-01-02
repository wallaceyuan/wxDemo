"use strict"

var Promise = require('./promise.js')

exports.chooseImage = function () {
    return new Promise(function (resolve, reject) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: resolve,
            fail: reject
        })
    })
}

var getImageInfo = function (res) {
    return new Promise(function (resolve, reject) {
        wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: resolve,
            fail: reject
        })
    })
}

var uploadFile = function (res) {
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            method: 'POST',
            url: 'https://api.wallaceyuan.cn/upload',
            filePath: res.tempFilePaths[0],
            name: 'uploadPoster',
            formData: {
                'user': 'test'
            },
            success: function (res) {
                resolve(res.data)
            },
            fail: function (err) {
                console.log('upload fail', err)
                console.log(err)
            },
        })
    })
}


exports.imgUpInfo = function (res) {
    return Promise.all([getImageInfo(res), uploadFile(res)])
}
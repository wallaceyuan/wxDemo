
function wxLogin(cb) {
    var that = this
    var session = wx.getStorageSync('3rd_session')
    console.log('wxlogin',session)
    if (session) {
        wxCheckSession(session,cb)
    } else {
        wxGetSession(cb)
    }
}

function wxCheckSession(session, cb) {
    wx.request({
        url: 'https://api.wallaceyuan.cn/wxlogin/check',
        data: {
            session: session
        },
        success: function (result) {
            if (result.data != 200) {
                wx.removeStorageSync('3rd_session')
                wxGetSession(cb)
            } else {
                typeof cb == "function" && cb(session)
                console.log('已经登录')
            }
        },
        fail: function (e) {
            console.log(e)
        }
    })
}

function wxGetSession(cb) {
    console.log('登录')
    wx.login({
        success: function (res) {
            if (res.code) {
                //发起网络请求
                wx.request({
                    url: 'https://api.wallaceyuan.cn/wxlogin',
                    data: {
                        code: res.code
                    },
                    success: function (result) {
                        var session = result.data.session
                        wx.setStorageSync('3rd_session', session)
                        typeof cb == "function" && cb(session)
                    },
                    fail: function (e) {
                        console.log(e)
                    }
                })
            } else {
                console.log('获取用户登录态失败！' + res.errMsg)
            }
        }
    });
}

module.exports = {
    wxLogin: wxLogin,
    wxCheckSession: wxCheckSession,
    wxGetSession: wxGetSession
}
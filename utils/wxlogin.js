
function wxLogin() {
    var that = this
    var session = wx.getStorageSync('3rd_session')
    if (session) {
        wxCheckSession(session)
    } else {
        wxGetSession()
    }
}

function wxCheckSession(session) {
    wx.request({
        url: 'http://127.0.0.1:3000/wxlogin/check',
        data: {
            session: session
        },
        success: function (result) {
            if (result.data != 200) {
                wx.removeStorageSync('3rd_session')
                wxGetSession()
            } else {
                console.log('已经登录')
            }
        },
        fail: function (e) {
            console.log(e)
        }
    })
}

function wxGetSession() {
    console.log('登录')
    wx.login({
        success: function (res) {
            if (res.code) {
                //发起网络请求
                wx.request({
                    url: 'http://127.0.0.1:3000/wxlogin',
                    data: {
                        code: res.code
                    },
                    success: function (result) {
                        var session = result.data.session
                        wx.setStorageSync('3rd_session', session)
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
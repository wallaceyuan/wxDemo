Page({
  data:{
    formId :null
  },
  formSubmit: function(e) {
    this.setData({
      "formId":e.detail.formId
    })
    console.log('form发生了submit事件，携带数据为：', e.detail)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  formRequest(){
    var formId = this.data.formId

  }
})
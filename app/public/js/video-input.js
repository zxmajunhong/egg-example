$(function() {
  var file;
  $('.ppt').on('change', function(e) {
    file = e.target.files[0];
  });
  $('.submit-btn').on('click', function() {
    var videoId = $(this).data('id');
    var optType = videoId ? 'update' : 'add';
    var pptUrl = $('.J_pptUrl').val();
    var formData = new FormData();
    var inputData = {
      name: $('.name').val(),
      date: $('.date').val(),
      address: $('.address').val(),
      author: {
        name: $('.author').val(),
        department: $('.department').val(),
        post: $('.post').val(),
      },
      description: $('.description').val(),
      pptUrl: pptUrl,
    };
    // 如果是编辑
    if (videoId) {
      inputData.id = videoId;
    }
    // 用于后台判断是新增还是编辑
    formData.append('optType', optType);
    formData.append('inputData', JSON.stringify(inputData));
    formData.append('ppt', file);
    $.ajax({
      type: 'post',
      url: '/share/input',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        if (data.code === 200) {
          noty('success', data.msg);
        } else {
          noty('error', data.msg);
        }
      }
    });
  });
  /**
   * 全局通知工具
   *
   * @param {string} type 类型为 alert, success, error, warning, info
   * @param {string} text html字符串
   * @param {number} time 自动关闭时间
   * @param {string} layout 选项 top, topLeft, topCenter, topRight, center, centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight
   */
  function noty(type, text, time, layout) {
    new Noty({
      type: type,
      text: text,
      theme: 'mint',
      layout: layout || 'topRight',
      timeout: time || 2000
    }).show();
  }
});

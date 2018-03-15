(function () {
  var file;
  $('.ppt').on('change', function (e) {
    file = e.target.files[0];
  });
  $('.submit-btn').on('click', function () {
    var videoId = $(this).data('id') || 0;
    var url = videoId ? '/video/update' : '/video/create';
    var pptUrl = $('.J_pptUrl').text() || 0;
    var formData = new FormData();
    var inputData = {
      videoId,
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
    formData.append('ppt', file);
    formData.append('inputData', JSON.stringify(inputData));
    $.ajax({
      type: 'post',
      url: url,
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        $('.fc-msg .msg').html(data.msg);
        $('.black-cover').show();
        $('.fc-msg').show();
      }
    });
  });

  $('.fc-msg').on('click', '.close', function () {
    window.location.href = '/video/input';
  });
}());

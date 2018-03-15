(function () {
  const vParent = document.querySelector('.video-content');
  const vList = document.querySelectorAll('.video-list .card-box');
  const fc = document.querySelector('.fc-box');

  window.addEventListener('load', function () {
    cardLocation();
    videoFc();
  }, false);

  // 列表自适应
  const cardLocation = () => {
    const cardWidth = vList[0].offsetWidth;
    const num = Math.floor(document.documentElement.clientWidth / cardWidth);
    vParent.style.cssText = 'width:' + ((num * cardWidth) + (num * 20)) + 'px; margin:0 auto';
  };

  const videoFc = () => {
    const videoShow = document.querySelectorAll('.video-btn');
    const close = document.querySelector('.fc-box .close');
    const cover = document.querySelector('.black-cover');
    videoShow.forEach((ele) => {
      ele.onclick = () => {
        fc.childNodes[3].innerHTML = ele.dataset.url;
        fc.childNodes[3].firstChild.width = 800;
        cover.style.display = 'block';
        fc.style.display = 'block';
        fcPosition();
      };
    });
    close.onclick = () => {
      fc.childNodes[3].innerHTML = '';
      cover.style.display = 'none';
      fc.style.display = 'none';
    };
  };

  const fcPosition = () => {
    fc.style.cssText = 'margin: -' + (fc.offsetHeight / 2) + 'px 0 0 -' + (fc.offsetWidth / 2) + 'px';
  };

  $('.remove-btn').on('click', function () {
    var $this = $(this);
    var videoId = $this.parents('.card-box').data('id');
    $.ajax({
      type: 'post',
      url: '/video/remove',
      data: {
        videoId: videoId
      },
      success: function (data) {
        $('.fc-msg .msg').html(data.msg);
        $('black-cover').show();
        $('.fc-msg').show();
      }
    });
  });

  $('.fc-msg').on('click', '.close', function () {
    window.location.reload();
  });
}());

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ title }}</title>
  <link rel="stylesheet" href="/public/css/reset.css">
  <link rel="stylesheet" href="/public/css/common.css">
  <link rel="stylesheet" href="/public/css/video.css">
  <link rel="stylesheet" href="/public/plugin/noty/noty.css">
  <script src="//lib.baomitu.com/jquery/1.12.4/jquery.min.js"></script>
  <script src="/public/plugin/noty/noty.js"></script>
</head>

<body>
  <div class="page video-main">
    <div class="video-header">
      温故而知新
    </div>
    <div class="video-content">
      <div class="input-box">
        <form action="/video/create" method="post">
          <label>
            <span class="title">演讲主题：</span>
            <input type="text" placeholder="随便写" class="name" value="{{ data.name }}">
          </label>
          <label>
            <span class="title">演讲者：</span>
            <input type="text" placeholder="随便写" class="author" value="{{ data.author.name }}">
          </label>
          <label>
            <span class="title">所属部门：</span>
            <input type="text" placeholder="随便写" class="department" value="{{ data.author.department }}">
          </label>
          <label>
            <span class="title">职位：</span>
            <input type="text" placeholder="随便写" class="post" value="{{ data.author.post }}">
          </label>
          <label>
            <span class="title">演讲时间：</span>
            <input type="date" placeholder="随便写" class="date" data-test="{{data.date}}" value="{{ helper.formateDate(data.date) }}">
          </label>
          <label>
            <span class="title">视频地址：</span>
            <input type="text" placeholder="随便写" class="address" value="{{ data.address }}">
          </label>
          <label>
            <span class="title">详细描述：</span>
            <textarea placeholder="不会写怎么办？会不会吹牛*？" class="description">{{ data.description }}</textarea>
          </label>
          <label>
              <span class="title">ppt上传：{% if (data.ppt) %}<span style="font-size: 12px">(不替换不用上传)</span>{% endif %}</span>
              <input type="hidden" class="J_pptUrl" value="{{ data.ppt }}">
              <input type="file" placeholder="随便写" class="ppt" value="{{ data.ppt }}">
            </label>
        </form>
        <a href="javascript:;" class="submit-btn" data-id="{{ data._id }}">提交</a>
      </div>
    </div>
  </div>
  <a href="/share" class="add-btn">首页</a>
  <div class="fc-msg" style="display:none;">
    <a href="javascript:;" class="close">x</a>
    <p class="msg"></p>
  </div>
  <script src="/public/js/video-input.js"></script>
</body>

</html>
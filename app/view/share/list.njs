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
  <script src="//lib.baomitu.com/jquery/1.12.4/jquery.min.js"></script>
</head>

<body>
  <div class="page video-main">
    <div class="video-header">
      温故而知新
    </div>
    <div class="video-content">
      <div class="video-list">
        {% for item in list %}
        <div class="card-box" data-id="{{item._id}}">
          <p class="author"><span class="col-gre">{{ item.author.name }}</span> / {{ item.author.department }} / {{ item.author.post }}</p>
          <p class="title">{{ item.name }}</p>
          <div class="btn-box">
            <a href="{{ item.ppt }}" class="ppt-btn col-blue" download>PPT</a>
            <a href="javascript:;" class="video-btn col-blue" data-url="{{ item.address }}">视频</a>
            {% if (user === 'admin') %}
            <a href="/video/input?videoId={{item._id}}" class="update-btn col-blue">编辑</a>
            <a href="javascript:;" class="remove-btn col-blue">删除</a>
            {% endif %}
          </div>
          <p class="desc">{{ item.description }}</p>
        </div>
        {% endfor %}
      </div>
    </div>
    {% if (user === 'admin') %}
    <a href="/video/input" class="add-btn"><span class="span1"></span><span class="span2"></span></a>
    {% endif %}
    <div class="black-cover" style="display:none;"></div>
    <div class="fc-box" style="display:none;">
      <a href="javascript:;" class="close">x</a>
      <div class="con"></div>
    </div>
    <div class="fc-msg" style="display:none;">
      <a href="javascript:;" class="close">x</a>
      <p class="msg"></p>
    </div>
  </div>
  <script src="/public/js/video.js"></script>
</body>

</html>
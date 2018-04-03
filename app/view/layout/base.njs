<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <meta name="renderer" content="webkit" />
  <title>{{ title + ' - ' if title else '' }}拓美OA后台管理</title>
  <link href="//lib.baomitu.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  <link href="//lib.baomitu.com/admin-lte/2.3.11/css/AdminLTE.min.css" rel="stylesheet">
  <link href="//lib.baomitu.com/admin-lte/2.3.11/css/skins/_all-skins.min.css" rel="stylesheet">
  <link href="//lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="//lib.baomitu.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/public/plugin/noty/noty.css">
  <style>
    body { background-color: #ecf0f5; }
  </style>
  {%- block head %}{% endblock -%}
</head>
<body class="hold-transition skin-blue sidebar-mini">
{%- block content %}{% endblock -%}

<script src="//lib.baomitu.com/jquery/1.12.4/jquery.min.js"></script>
<script src="//lib.baomitu.com/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="//lib.baomitu.com/admin-lte/2.3.11/js/app.min.js"></script>
<script src="/public/plugin/noty/noty.js"></script>
<script>
/**
 * 全局通知工具
 *
 * @param {string} type 类型为 alert, success, error, warning, info
 * @param {string} text html字符串
 * @param {number} time 自动关闭时间
 * @param {string} layout 选项 top, topLeft, topCenter, topRight, center, centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight
 */
function noty(type, text, time, layout, afterClose) {
  new Noty({
    type: type,
    text: text,
    theme: 'mint',
    layout: layout || 'topRight',
    timeout: time || 2000,
    callbacks: {
      afterClose: afterClose
    }
  }).show();
}
</script>
{%- block script %}{% endblock -%}
</body>
</html>

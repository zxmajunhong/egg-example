{% extends "layout/base.njs" %}

{% block head %}
<style>
.sidebar-menu {
  -moz-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.dropdown.user-menu {
  width: 100px;
}
.dropdown.user-menu .dropdown-toggle {
  text-align: center;
}
.user-login {
  width: 101px !important;
  min-width: 50px !important;
}
</style>
{% endblock %}

{% block content %}
<div class="wrapper">
  <header class="main-header">
    <a href="/admin" class="logo">
      <span class="logo-mini"><b>TM</b></span>
      <span class="logo-lg"><b>TooMee</b> OA</span>
    </a>
    <nav class="navbar navbar-static-top">
      <a href="javascript:" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">切换侧边栏</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span class="hidden-xs">{{user.user_name}}</span>
              </a>
            <ul class="dropdown-menu user-login">
              <li>
                <a href="javascript:void(0)" class="J_loginout">
                  <i class="fa fa-sign-out"></i><span>退出</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu">
        <li class="header">主导航</li>
        <li class="active treeview">
          <a class="J_menu" target="main-page" href="/">
            <i class="fa fa-home"></i><span>首页</span>
          </a>
        </li>
        {% if user.user_name == 'admin' %}
        <li class="treeview">
          <a class="J_menu" href="javascript:void(0)">
            <i class="fa fa-cog"></i><span>系统设置</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li>
              <a target="main-page" href="/admin/attence">
                <i class="fa fa-calendar"></i> <span>考勤管理</span>
              </a>
            </li>
            <li>
              <a target="main-page" href="/admin/holiday">
                <i class="fa fa-h-square"></i> <span>假期管理</span>
              </a>
            </li>
            <li>
              <a target="main-page" href="/admin/members">
                <i class="fa fa-users"></i> <span>员工管理</span>
              </a>
            </li>
          </ul>
        </li>
        {% endif %}
      </ul>
    </section>
  </aside>

  <style>
  .content-wrapper{position:relative;}
  .content-wrapper iframe{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;}
  .noty_buttons .mar-10 {
    margin-right: 10px;
  }
  </style>
  <div class="content-wrapper">
    <iframe src="/home" name="main-page" frameborder="0"></iframe>
  </div>
</div>
{% endblock %}

{% block script %}
<script>
  if (top !== self) {
    top.location.reload(); // 当被嵌套时刷新顶层窗口
  }
  // 退出登录
  $('.J_loginout').click(function () {
    var n = new Noty({
      type: 'alert',
      text: '确认退出登录吗?',
      theme: 'mint',
      layout: 'topCenter',
      buttons: [
        Noty.button('确定', 'btn btn-primary mar-10', function () {
            $.ajax('/loginout', {
              type: 'post',
              success: function (data) {
                n.close();
                noty('success', data.msg);
                setTimeout(function () {
                  window.location.href = '/login';
                }, 2500);
              }
            });
        }),
        Noty.button('取消', 'btn btn-danger', function () {
            n.close();
        })
      ]
    }).show();
  });
</script>
{% endblock %}

<!-- 登录页面模版 -->
{% extends "layout/base.njs" %}

{% block head %}
<style>
  body {
    background: url(public/img/bg-login.jpg) !important;
  }
  .login-box-body {
    border-radius: 4px;
  }
</style>
{% endblock %}

{% block content %}
  <div class="login-box">
    <div class="login-logo">
      <b>TooMee</b> OA
    </div>
    <div class="login-box-body">
      <p class="login-box msg">登录系统</p>
      <form>
        <div class="form-group has-feedback">
          <input id="ipt-account" type="account" class="form-control" placeholder="用户名或工号">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input id="ipt-pwd" type="password" class="form-control" placeholder="登录密码">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="button" class="btn btn-primary btn-block btn-flat J_login">登录</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
    </div>
  </div>
  
{% endblock %}

{% block script %}
<script type="text/javascript">
  $(function () {
    // 登录
    $('.J_login').click(function () {
      var account = $.trim($('#ipt-account').val());
      var pwd = $.trim($('#ipt-pwd').val());
      if (account == '') {
        return noty('error', '请填写用户名或者工号');
      }
      if (pwd == '') {
        return noty('error', '请填写登录密码');
      }
      $.ajax('/login', {
        type: 'post',
        data: {
          account: account,
          pwd: pwd
        },
        success: function (data) {
          if (data.code == 200) {
            noty('success', '登录成功');
            setTimeout(function () {
              window.location.href = '/';
            }, 2000);
          } else {
            noty('error', data.msg);
          }
        },
        error: function (err) {
          console.log(err);
        }
      })
    });
  });
</script>
{% endblock %}
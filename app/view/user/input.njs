{# 用户信息编辑页面 #}

{% extends "layout/base.njs" %}

{% block content %}
  <div class="content page-user-input">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">
              {% if id %}
                修改用户信息
              {% else %}
                新增用户信息
              {% endif %}
            </h3>
          </div>
          <form  class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="iptnum" class="col-md-2 control-label">工号：</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" id="iptnum" placeholder="用户工号">
                </div>
              </div>
              <div class="form-group">
                <label for="iptname" class="col-md-2 control-label">用户名称：</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" id="iptname" placeholder="用户名称">
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-md-2 control-label">所属部门：</label>
                <div class="col-md-8"></div>
              </div>
            </div>
            <div class="box-footer">
              <a href="/user" class="btn btn-default" target="main-page">取消</a>
              <a href="javascript:void(0)" class="btn btn-info pull-right J_save" data-id="{{id}}">确定</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{% endblock %}
{# 用户管理的列表页面 #}
{% extends "layout/base.njs" %}

{% block content %}
  <div class="content page-user-list">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">用户信息列表</h3>
            <div class="box-tools pull-right">
              <a type="button" class="btn btn-sm btn-info" title="新增" href="/user/input" target="main-page">新增</a>
            </div>
          </div>
          <div class="box-body">
            <table class="table table-borderd">
              <thead>
                <tr>
                  <th>工号</th>
                  <th>姓名</th>
                  <th>部门</th>
                  <th style="width:100px">操作</th>
                </tr>
              </thead>
              <tbody>
                {% for user in userList %}
                  <tr>
                    <td>{{user.user_num}}</td>
                    <td>{{user.user_name}}</td>
                    <td>{{user.department_name}}</td>
                    <td>
                      <a href="/department/input?id={{user.id}}" class="fa fa-edit tbl-opr" title="编辑"></a>
                      <a href="javascript:void(0)" class="fa fa-remove tbl-opr J_del" data-id="{{user.id}}" title="删除"></a>
                    </td>
                  </tr>
                {% endfor %}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
{% endblock %}
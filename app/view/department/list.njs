{# 部门管理的列表页面 #}
{% extends "layout/base.njs" %}

{% block head %}
  <style>
    .tbl-opr {
      font-size: 16px;
      margin: 0 5px;
    }
  </style>
{% endblock %}

{% block content %}
  <div class="content page-department-list">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">部门信息列表</h3>
            <div class="box-tools pull-right">
              <a type="button" class="btn btn-sm btn-info" title="新增" href="/department/input" target="main-page">新增</a>
            </div>
          </div>
          <div class="box-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>部门名称</th>
                  <th>上级部门</th>
                  <th style="width:100px">操作</th>
                </tr>
              </thead>
              <tbody>
                {% for item in list %}
                  <tr>
                    <td>{{item.name}}</td>
                    <td>{{item.parent_name}}</td>
                    <td>
                      <a href="javascript:void(0)" class="fa fa-users tbl-opr J_showperson" title="部门人员" data-id="{{item.id}}" data-parentid="{{item.parent_id}}" data-name="{{item.name}}">
                      </a>
                      <a href="/department/input?id={{item.id}}" class="fa fa-edit tbl-opr" title="编辑"></a>
                      <a href="javascript:void(0)" class="fa fa-remove tbl-opr J_del" data-id="{{item.id}}" title="删除"></a>
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
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
              模态框（Modal）标题
            </h4>
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>工号</th>
                  <th>姓名</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>xxx</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
{% endblock %}

{% block script %}
  <script>
    $(function () {
      // 删除操作
      $('.J_del').click(function () {
        var id = $(this).data('id');
        var $this = $(this);
        $.post('/department/del', {
          id: id
        }, function (data) {
          if (data.code == 200) {
            noty('success', data.msg, 1500, 'topRight', function () {
              $this.parents('tr').remove();
            });
          } else {
            noty('error', data.msg);
          }
        })
      });

      // 显示部门人员
      $('.J_showperson').click(function () {
        var id = $(this).data('id');
        var parentId = $(this).data('parentid');
        var name = $(this).data('name');
        $.post('/department/getUser', {
          id: id,
          parent_id: parentId
        }, function (data) {
          if (data.code == 200) {
            $('#myModal').find('#myModalLabel').text(name + '人员');
            var tableHtml = '';
            (data.data.users).forEach(it => {
              tableHtml += '<tr>' +
                            '<td>' + it.user_num + '</td>' +
                            '<td>' + it.user_name + '</td>' +
                          '</tr>';
            });
            $('#myModal').find('table tbody').html(tableHtml);
            $('#myModal').modal();
          } else {
            noty('error', '数据获取失败');
          }
        })
      });
    });
  </script>
{% endblock %}
{# 部门管理编辑页面 #}
{% extends "layout/base.njs" %}

{% block content %}
  <div class="content page-department-input">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">
              {% if id %}
                修改部门信息
              {% else %}
                新增部门信息
              {% endif %}
            </h3>
          </div>
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="iptname" class="col-md-2 control-label">部门名称：</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" id="iptname" placeholder="部门名称" value="{{departmentInfo.name}}">
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-md-2 control-label">上级部门：</label>
                <div class="col-md-8">
                  <select name="" id="selparent" class="form-control">
                    <option value="0">无</option>
                    {% for parent in parentList %}
                      <option value="{{parent.id}}" {% if (parent.id == departmentInfo.parent_id) %}selected{% endif %}>{{parent.name}}</option>
                    {% endfor %}
                  </select>
                </div>
              </div>
            </div>
            <div class="box-footer">
              <a href="/department" class="btn btn-default" target="main-page">取消</a>
              <a href="javascript:void(0)" class="btn btn-info pull-right J_save" data-id="{{id}}">确定</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{% endblock %}

{% block script %}
  <script>
    $(function (){
      // 保存信息
      $('.J_save').click(function () {
        var name = $('#iptname').val();
        var parent_id = $('#selparent option:selected').val();
        if (name == '') {
          return noty('warning', '请填写部门名称');
        }
        $.post('/department/input', {
          id: $('.J_save').data('id'),
          name: name,
          parent_id: parent_id,
          depth: parent_id > 0 ? 1 : 0
        }, function (data) {
          if (data.code == 200) {
            noty('success', data.msg, 1500, 'topRight', function () {
              // 添加成功后返回到列表页面
              window.location.href = '/department';
            });
          } else {
            noty('error', data.msg);
          }
        })
      });
    });
  </script>
{% endblock %}
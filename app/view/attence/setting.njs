<!-- 考勤设置相关页面模版 -->
{% extends "layout/base.njs" %}

{% block content %}
<div class="content page-attence">
  <div class="row">
    <div class="col-md-6">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">导入考勤记录</h3>
        </div>
        <form role="form" id="attence-form" action="/attence/upload" enctype="multipart/form-data" method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="files">考勤文件</label>
              <input type="file" id="files" name="files" accept="application/vnd.ms-excel" multiple="multiple">
              <p class="help-block">请选择整理好的 Excel 文件。</p>
            </div>
          </div>
          <div class="box-footer">
            <button type="submit" class="btn btn-primary J_upload">上传</button>
          </div>
        </form>
      </div>
    </div>

    <div class="col-md-6">
        <div class="box box-danger">
          <div class="box-header with-border">
            <h3 class="box-title">删除指定人员记录</h3>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="form-group">
                <label for="names">人员姓名</label>
                <input type="text" class="form-control" id="names" placeholder="如: 酸酸，小仙女">
                <p class="help-block">输入人员姓名以逗号分隔。</p>
              </div>
            </div>
            <div class="box-footer">
              <button type="submit" class="btn btn-danger J_delete">删除</button>
            </div>
          </form>
        </div>
      </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">导入钉钉请假数据 <small>(开发中...)</small></h3>
        </div>
        <form role="form" id="leave-form" action="" enctype="multipart/form-data" method="post">
          <div class="box-body">
            <div class="form-group">
              <label for="leave">请假数据</label>
              <input disabled type="file" id="leave" name="leave" accept="application/vnd.ms-excel" multiple="multiple">
              <p class="help-block">请选择整理好的 Excel 文件。</p>
            </div>
          </div>
          <div class="box-footer">
            <button disabled type="submit" class="btn btn-primary J_leave">上传</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{% endblock %}

{% block script %}
<script>
(function() {
  var attenceForm = $('#attence-form');

  // 上传按钮
  $('.J_upload').on('click', function () {
    if ($('#files').val() === '') {
      noty('warning', '请选择文件！');
      return false;
    }

    var formData = new FormData(attenceForm[0]);

    noty('info', '数据导入中，请骚等...');

    $.ajax({
      url: attenceForm.prop('action'),
      method: 'post',
      data: formData,
      contentType: false, // 注意这里应设为false
      processData: false,
    }).then(function(res) {
      if (res.code === 200) {
        noty('success', '数据导入成功');
      } else {
        noty('error', res.message);
      }
    });

    return false;
  });

  // 删除用户
  $('.J_delete').on('click', function() {
    var names = $('#names').val().trim().replace(/，/, ',');
    if (names === '') {
      noty('warning', '请输入要消灭的名字！');
      return false;
    }

    $.post('/attence/delUserRecord', { names: names }, function(res) {
      if (res.code === 200) {
        noty('success', '删除成功');
      } else {
        noty('error', res.message);
      }
    }, 'json');

    return false;
  });

})();
</script>
{% endblock %}

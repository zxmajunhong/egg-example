<!-- 考勤列表页面模版 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ title }}</title>
  <link rel="stylesheet" href="/public/css/reset.css">
  <link rel="stylesheet" href="/public/css/common.css">
  <link rel="stylesheet" href="/public/css/attence.css">
  <link rel="stylesheet" href="/public/css/iconfont/iconfont.css">
  <style>[v-cloak] { display: none }</style>
</head>
<body>

<div class="page record-main">
  <!-- 左侧侧边栏 -->
  <div class="left-menu">
    <!-- 月份选择 -->
    <div class="date-box flex-center">
      <i class="left oa-icon icon-arrowleft date-left-right"></i>
      <div class="date" data-date="{{ queryDate.getTime() }}">
        <span class="month">{{ queryDate.getMonth() + 1 }}月</span>
        <span class="year">{{ queryDate.getFullYear() }}年</span>
      </div>
      {% if queryDate.getMonth() !== dt.getMonth() %}
      <i class="right oa-icon icon-arrowright date-left-right"></i>
      {% endif %}
    </div>
    <!-- /月份选择 -->

    <!-- 搜索框 -->
    <form class="search-box">
      <input type="text" name="user" class="search-ipt" placeholder="请输入工号或姓名" value="{{ query.user }}">
      <a href="javascript:;" class="search oa-icon icon-sousuo"></a>
      <input type="submit" style="display:none">
    </form>
    <!-- /搜索框 -->

    <!-- 左侧菜单 -->
    <div class="menu-area">
      <ul class="menu-list">
      {% set development = departments[5].children.concat('研发部') %}
      {% for item in departments %}
        <li>
          <p class="line flex-left-center {{ 'on' if query.department === item.name else '' }}">
            <label class="line-icon flex-center">
              <i class="oa-icon icon-{{ item.icon }}"></i>
            </label>
            <span class="line-name">{{ item.name }}</span>
            {% if item.name === '研发部' %}
            <i class="arrow{{ ' up' if development.indexOf(query.department) >= 0 else '' }}"></i>
            {% endif %}
          </p>
          {% if development.indexOf(query.department) > -1 %}
          <div class="child-menu" style="display:block">
            {% for child in item.children %}
            <p class="line flex-left-center {{ 'on' if query.department === child else '' }}">
              <label class="line-icon"></label>
              <span class="line-name">{{ child }}</span>
            </p>
            {% endfor %}
          </div>
          {% endif %}
        </li>
      {% endfor %}
      </ul>
    </div>
    <!-- /左侧菜单 -->
  </div>
  <!-- /左侧侧边栏 -->

  <div id="app" v-cloak class="right-main">
    {# 这里直接输出源码，都交给 vue 解析 #}
    {% raw %}
    <!-- 日历 -->
    <div v-for="item of list" :key="item.number" class="each-calendar">
      <div class="info-aggre flex-around-center">
        <label class="name">{{ item.name }}（{{ item.number }}）</label>
        <label class="kq-info">
          本月共出勤<em class="total-attence">{{ item.total }}</em>天
        </label>
        <label class="kq-info">
          <i class="point no-clock"></i>
          未打卡<em class="no-clock-nums">{{ item['no-clock'] }}</em>次
          <div class="tips-box">
            <!--未申请补打卡提示-->
            <!--<span class="tips">记得钉钉申请补打卡</span>-->
            <!--已申请补打卡提示-->
            <!--<span class="tips">已使用<em>X</em>次不处罚机会</span>-->
          </div>
        </label>
        <label class="kq-info">
          <i class="point late"></i>
          迟到共<em class="late-nums">{{ item.late }}</em>次
          <div class="tips-box">
            <!--<span class="tips">已使用<em>X</em>次10分钟内不处罚机会</span>-->
          </div>
        </label>
        <label class="kq-info" style="display:none">
          <i class="point absent"></i>
          旷工<em class="absent-nums">{{ item.absent }}</em>次
        </label>
        <label class="kq-info">
          <i class="point overtime"></i>
          工作日加班<em class="work-overtime-nums">{{ item.overtime }}</em>次
        </label>
        <label class="kq-info">
          <i class="point overtime"></i>
          节假日加班<em class="holiday-overtime-nums">{{ item['overtime-holiday'] }}</em>次
        </label>
        <label class="kq-info" style="display:none">
          <i class="point leave"></i>
          请假<em class="leave-nums">{{ item.leave }}</em>次
        </label>
      </div>
      <div class="calendar-area">
        <ul class="calendar-title">
          <li class="week">日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li class="week">六</li>
        </ul>
        <ul class="calendar-content">
          <li v-for="i of item.empty" class="empty"></li>
          <li v-for="day of item.days" :class="{ week: day.isWeek }">
            <div class="info">
              <div class="info-tab">
                <span v-for="tag of day.tags" class="tab" :class="tag">{{ tags[tag] }}</span>
              </div>
              <span class="num">{{ day.num }}</span>
            </div>
            <div v-if="day.start || day.end" class="date">
              <span class="start">{{ day.start }}</span> - <span class="end">{{ day.end }}</span>
            </div>
            <div v-else class="date">&nbsp;</div>
          </li>
        </ul>
      </div>
    </div>
    {% endraw %}

    {# 原始模板，保留方便修改
    <div class="each-calendar">
      <div class="info-aggre flex-around-center">
        <label class="name">马俊鸿（69）</label>
        <label class="kq-info">
          本月共出勤<em>19</em>天
        </label>
        <label class="kq-info">
          <i class="point no-clock"></i>
          未打卡<em>1</em>次
          <div class="tips-box">
            <!--未申请补打卡提示-->
            <!--<span class="tips">记得钉钉申请补打卡</span>-->
            <!--已申请补打卡提示-->
            <span class="tips">已使用<em>X</em>次不处罚机会</span>
          </div>
        </label>
        <label class="kq-info">
          <i class="point late"></i>
          迟到共<em>6</em>次
          <div class="tips-box">
            <span class="tips">已使用<em>X</em>次10分钟内不处罚机会</span>
          </div>
        </label>
        <label class="kq-info">
          <i class="point absent"></i>
          旷工<em>2</em>次
        </label>
        <label class="kq-info">
          <i class="point overtime"></i>
          工作日加班<em>6</em>次
        </label>
        <label class="kq-info">
          <i class="point overtime"></i>
          节假日加班<em>6</em>次
        </label>
        <label class="kq-info">
          <i class="point leave"></i>
          请假<em>2</em>次
        </label>
      </div>
      <div class="calendar-area">
        <ul class="calendar-title">
          <li class="week">日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li class="week">六</li>
        </ul>
        <ul class="calendar-content">
          <li class="empty"></li>
          <li class="empty"></li>
          <li class="empty"></li>
          <li class="empty"></li>
          <li class="empty"></li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab absent">旷工</span>
              </div>
              <span class="num">1</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab">
                <span class="tab overtime">加班</span>
              </div>
              <span class="num">2</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab"></div>
              <span class="num">3</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab late">迟到</span>
              </div>
              <span class="num">4</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">5</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab overtime">加班</span>
              </div>
              <span class="num">6</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab no-clock">未打卡</span>
                <span class="tab overtime">加班</span>
              </div>
              <span class="num">7</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab late">迟到</span>
              </div>
              <span class="num">8</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab"></div>
              <span class="num">9</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab">
                <span class="tab overtime">加班</span>
              </div>
              <span class="num">10</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab absent">旷工</span>
              </div>
              <span class="num">11</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">12</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab leave">年假1天</span>
              </div>
              <span class="num">13</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab late">迟到</span>
              </div>
              <span class="num">14</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab no-clock">未打卡</span>
              </div>
              <span class="num">15</span>
            </div>
            <div class="date">
              <span class="start"></span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab"></div>
              <span class="num">16</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab"></div>
              <span class="num">17</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab no-clock">未打卡</span>
              </div>
              <span class="num">18</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end"></span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">19</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
                <span class="tab late">迟到</span>
              </div>
              <span class="num">20</span>
            </div>
            <div class="date">
              <span class="start">09:31</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">21</span>
            </div>
            <div class="date">
              <span class="start">09:05</span>&nbsp;-&nbsp;<span class="end">18:00</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">22</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">23</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">24</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">25</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">26</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">27</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">28</span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">29</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">30</span>
            </div>
          </li>
          <li class="week">
            <div class="info">
              <div class="info-tab">
              </div>
              <span class="num">31</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    #}
    <!-- /日历 -->
  </div>
</div>
<script>
window.dataList = {{ dataList | safe }}; // 后台输出的 JSON
window.holidays = {{ holidays | safe }}; // 后台输出的 JSON
</script>
<script src="//lib.baomitu.com/jquery/1.12.4/jquery.min.js"></script>
<script src="//lib.baomitu.com/vue/2.4.4/vue.js"></script>
<script src="/public/js/attence.js"></script>
</body>
</html>

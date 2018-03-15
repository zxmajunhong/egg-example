(function () {
  var $dateBox = $('.date-box'); // 日期选择框
  var $searchBox = $('.search-box'); // 搜索框
  var menuList = $('.menu-list'); // 菜单列表

  var search = {}; // queryString 解析后的对象
  // 解析对象
  window.location.search.replace(/(\w+)=([^&]+)/g, function (m, key, val) {
    search[key] = decodeURIComponent(val);
    return m;
  });

  // 月份操作事件
  $('.date-left-right', $dateBox).on('click', function () {
    var isPrev = $(this).index() === 0; // 判断是 上一个/下一个
    var date = $('.date', $dateBox).data('date'); // 获取查询日期
    var dt = date ? new Date(date) : new Date();

    dt.setMonth(dt.getMonth() + (isPrev ? -1 : 1)); // ±1月，自动处理跨年
    date = dt.getFullYear() + '-' + (dt.getMonth() + 1);

    searchRedirect({ date: date });
  });

  // 搜索框事件
  $searchBox.on('submit', function () {
    delete search.department; // 删除部门参数，部门/姓名 互斥
    searchRedirect({ user: $('.search-ipt', this).val() });
    return false;
  });

  // 搜索框搜索图标事件
  $('.search', $searchBox).on('click', function () {
    $searchBox.trigger('submit');
  });

  // 菜单栏的点击事件
  $('.line', menuList).on('click', function () {
    delete search.user; // 删除姓名参数，部门/姓名 互斥
    searchRedirect({ department: $('.line-name', this).text() });
  });

  // 通过 vm 渲染数据
  window.app = new Vue({
    el: '#app',
    data: {
      // 考勤情况标签
      tags: {
        'no-clock': '未打卡',
        late: '迟到',
        absent: '旷工',
        overtime: '加班', // '工作日加班',
        'overtime-holiday': '加班', // '节假日加班',
        leave: '请假',
        aberrant: '异常',
      },
    },
    computed: {
      // 处理原始数据
      list: function () {
        return procList(window.dataList);
      },
    },
  });

  /**
   * 处理列表数据
   *
   * @param {array} list
   */
  function procList(list) {
    var date = $('.date', $dateBox).data('date'); // 获取查询日期
    var dt = date ? new Date(date) : new Date();
    var empty = dt.getDay();

    // 考勤分析结果状态码对于具体状态
    var types = {
      2: 'late', // 迟到情况
      3: 'late', // 早退情况
      4: 'no-clock', // 未打卡
      5: 'overtime', // 工作日加班
      6: 'overtime-holiday', // 节假日加班
      7: 'leave', // 请假情况
      8: 'absent', // 旷工
      9: 'aberrant', // 异常
    };

    // 遍历处理每个人的数据
    list = list.map(function (it) {
      var item = {
        name: it.name, // 名字
        number: it.number, // 工号
        department: it.department, // 部门
        month: it.month, // 考勤数据月份

        empty: empty, // 当月1号是星期几
        days: [], // 本月每天的情况

        // 统计本月各种情况次数
        total: 0, // 本月共出勤天数
        late: 0, // 迟到次数
        'no-clock': 0, // 未打卡次数
        absent: 0, // 旷工次数
        overtime: 0, // 工作日加班次数
        'overtime-holiday': 0, // 节假日加班次数
        leave: 0, // 请假次数
      };

      // 遍历处理员工本月考勤情况
      it.list.forEach(function (day, idx, days) {
        var curdt = new Date(day.date.replace(/\b\d\b/g, '0$&'));

        var isWeek = curdt.getDay() % 6 === 0; // 是否周末
        var holiday = window.holidays[curdt.getDate()];
        var isWorkday = holiday === 0; // 是否工作日
        var isHoliday = (holiday === 1 || isWeek) && !isWorkday; // 是否是假期

        // 空考勤对象
        var noop = { start: '', end: '' };

        // 考勤分析
        var ret = analysisAttence(day, days[idx - 1] || noop, days[idx + 1] || noop, isHoliday);

        // 考情况标签处理
        var tags = ret.map(function (t) {
          var type = types[t];
          if (item[type] !== undefined) {
            item[type]++; // 次数统计
          }
          return type; // 数字转标签
        }).filter(function (t) {
          return t; // 未识别情况
        });

        if (day.start || day.end) {
          item.total++; // 出勤天数统计
        }

        item.days.push({
          num: idx + 1, // 几号
          start: day.start, // 上班打卡
          end: day.end, // 下班打卡
          date: day.date, // 当前日期

          isWeek: isWeek, // 是否周末
          isHoliday: false, // 是否假期

          tags: tags, // 考勤情况
        });
      });

      return item;
    });

    return list;
  }

  /**
   * 时间转分钟数字
   *
   * @param {any} day
   * @returns
   */
  function time2num(day) {
    /* eslint no-eval: 0 */
    // 转换打卡时间
    var start = day.start ? eval(day.start.replace(/:/, '*60+')) : -1;
    var end = day.end ? eval(day.end.replace(/:/, '*60+')) : -1;

    // 转换整点打卡时间
    var start1 = day.start ? eval(day.start.replace(/:(\d+)/, function (m, t) {
      return t < 30 ? '*60+0' : '*60+30'; // 加班时间30分钟为一个单位
    })) : -1;
    var end1 = day.end ? eval(day.end.replace(/:(\d+)/, function (m, t) {
      return t < 30 ? '*60+0' : '*60+30'; // 加班时间 30 分钟位一个单位
    })) : -1;

    return {
      start: start,
      end: end,
      start1: start1,
      end1: end1,
    };
  }

  /**
   * 解析打卡时间
   *
   * @param {any} today 当前这天的打卡记录
   * @param {any} prev 前一天的打卡记录
   * @param {any} next 后一天的打卡记录
   * @param {any} isHoliday 当日是否是节假日
   */
  function analysisAttence(today, prev, next, isHoliday) {
    var elastic = { // 弹性上班时间
      1320: 600, // 22:00 => 10:00
      1350: 630, // 22:30 => 10:30
      1380: 660, // 23:00 => 11:00
      1410: 690, // 23:30 => 11:30
    };
    var result = []; // 返回的结果

    today = time2num(today); // 当日
    prev = time2num(prev); // 前一天
    next = time2num(next); // 后一天

    // 情况1："09:00 - 18:00" 正常
    // 情况2："09:50 - 18:50" 迟到 (需要判断是否加班)
    // 情况3："09:30 - 18:00" 早退
    // 情况4："      - 18:00" 上班忘打卡
    // 情况5："09:00 -      " 下班忘打卡 (判断是否隔夜签到)

    // 情况6："09:20 - 23:40" & "10:30 - 18:30" 正常 (加班)
    // 情况7："09:00 -      " & "01:00 - 18:30" 正常 (加班)

    // 情况8："      -      " 休息或调休 需要判断是否是在工作日并且是否请假

    // 情况1 09:00 - 18:00 或者09:30 - 18:30
    if ((today.start <= 570 && today.start >= 0) && today.end - today.start >= 540) {
      // 9:30之前打卡并且上班时间9小时以上
      if (isHoliday) {
        result = [6]; // 节假日加班
      } else {
        result = [1];
      }
    } else if (today.start > 570) { // 打卡时间大于9:30
      // 判断前一天的是否有加班情况并且加班到22:00以后
      // 并且判断前一天的加班时间是否符合第二天的正常上班打卡时间
      if ((prev.end > 1320) && (today.start <= elastic[prev.end1])) {
        result = [1]; // 正常打卡时间
      } else if (today.start > 720 && true) {
        // 根据钉钉记录判断，先默认都是请假情况
        // 打卡时间是12点之后，然后判断上午有没有请假
        result = [9]; // 改为异常状态
      } else {
        // 算迟到
        result = [2];
      }
    } else if (today.start + today.end === -2) {
      // 上下班都没打卡
      if (isHoliday) {
        // 判断是否是节假日
        result = [1];
      } else if (false) {
        // TODO 判断是否请假了 根据钉钉申请记录判断
        result = [9]; // 改为异常状态
      } else if ((next.start <= 360 && next.end >= 0) || (next.start > 360 && next.end === -1)) {
        // 判断是否加班了在第二天凌晨打的卡
        // 第二天是在6点之前打的卡
        // 或者是6点之后，原则上来说第二天不用来了，那么第二天的下班打卡时间是没有的
        result = [4, 5]; // 算上班没打卡，但是加班了。
      } else {
        // 默认都是当成正常处理了。
        result = [1];
        // result = [8]; // 旷工
      }
    } else if (today.start === -1) {
      // 上班未打卡
      // TODO 还应该根据钉钉申请来判断
      result = [4];
    } else if (today.end === -1) {
      // TODO 跨月的情况还是要处理
      // 判断明天的签到时间是否在6点之前
      if (next.start <= 360 && next.end > 0) {
        // 算加班
        result = [5];
      } else if (next.start > 360 && next.end === -1) { // 如果6点之后，原则上来说第二天不用来了，那么第二天的下班打卡时间是没有的
        result = [5]; // 算加班
      } else {
        result = [4]; // 算下班没打卡
      }
    } else if (today.end < 1080 || (today.end - today.start < 540 && prev.end < 1320)) {
      // 当日签退时间少于18:00 或者是18点以后在前天没有加班的情况下总上班时间小于9小时，前一天有加班的情况在18:00之前也算早退
      if (isHoliday) {
        result = [6];
      } else if (true) {
        // 默认为请假状态
        // TODO 根据钉钉审批记录判断是否有请假
        result = [9]; // 改为异常状态
      } else {
        // 算早退
        result = [3];
      }
    } else if (today.end >= 1320) {
      // 签退时间大于10点算加班
      // TODO 还要根据钉钉的加班申请来判断
      if (isHoliday) {
        result = [6];
      } else {
        result = [5];
      }
    } else {
      result = [9]; // 未知情况
    }

    return result;
  }

  /**
   * 根据查询条件查询数据
   *
   * @param {object} query
   */
  function searchRedirect(query) {
    var param = $.param($.extend(search, query));
    window.location.search = '?' + param;
  }
}());

/**
 * ajax模块
 */
;(function(window,$) {

  var lwx = window.lwx || {};

  var domain = '';
  
  domain = domain || getDomain();

  function redefineUrl(url) {
    if (url.indexOf('?') == -1) {
      url += '?' + 'v=' + Date.now() ;
    } else {
      url += '&' + 'v=' + Date.now();
    }
    return url.indexOf(domain) >=0 ? url: api() + url;
  }

  function getDomain() {
    return  window.location.origin?
    window.location.origin:
    window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
  }

  function api() {
    return domain + '/api';
  }

  function pathname() {
    var path = window.location.pathname;
    if(path) {
      path = path.substr(1);
      if(!path) {path = 'index.html';}
    }
    return path;
  }

  lwx.http = {
    get: function (url, callback) {
      $.getJSON(redefineUrl(url), function (data) {
        if(typeof callback == 'function') callback(data);
      }).error(function(e) {
        if(typeof layer == 'object')
          layer.msg(e.responseJSON.message);
        else
          console.error(e.responseJSON.message)
      });
    },
    post: function (url, args, callback) {
      $.post(redefineUrl(url), args, function (data) {
        if(typeof callback == 'function') callback(data);
      }, "json").error(function(e) {
        if(typeof layer == 'object')
          layer.msg(e.responseJSON.message);
        else
          console.error(e.responseJSON.message)  
      });
    },
    api: api(),
    pathname: pathname()
  }
  window.lwx = lwx;

})(window,jQuery);

window.laydate = layerdate();

/**
 * 公用行为
 * @author 鹿文学
 */
$(function() {
  
  // 加载
  $('#layout').load('layout.html', function() {
    // 显示当前导航
    var path = lwx.http.pathname;
    path = path.replace(/dd\//g,'');
    if(path) {
      var current = $('.js-navList a[href="'+path+'"]').addClass('active');
      if(current.siblings('ul').length>0) {
        current.siblings('ul').find('a[href="'+path+'"]').addClass('active');
      } else if(current.closest('ul').siblings('a').length>0){
        current.closest('ul').siblings('a').addClass('active');
      }

      // 控制首页头像更换地址，当是后台传的，则屏蔽此代码
      if(path == 'index.html') {
        $('.portrait').attr('src', './public/images/portraiti.png');
      }

    }

    // 导航是否显示
    if(lwx.storage.getItem('nav')) {
      var body = document.querySelector('body');
      var name = ' active';
      if(document.querySelector('.js-nav .navItem.active~ul')) {
        name = ' activeMore';
      }
      body.className += name;
    }

    // 控制导航是否显示
    document.querySelector('.js-navController').addEventListener('click', function() {
      var body = document.querySelector('body');
      var name = ' active';
      if(document.querySelector('.js-nav .navItem.active~ul')) {
        name = ' activeMore';
      }
      if(body.className.indexOf('active')>-1) {
        body.className = body.className.replace(name, '');
        lwx.storage.removeItem('nav');
      } else {
        body.className += name;
        lwx.storage.setItem('nav',1);
      }
  
    }, false);
  
    // 退出
    $('.js-logout').click(function() {
  
  
  
  
      return false;
    });
  
    // 猪场切换下拉菜单
    $('.js-transfer,.js-account').parent().hover(function() {  
      $(this).find('.drop').toggle(); 
      return false;
    });


  });

    // 根据所选舍号级联栏号
    $('body').on('change', '.js-place', function(e) {
      var that = $(this);
      var s = that.closest('.js-selectBox').find('.js-recordSelect');
      var val = that.val();
      


    });

    // tab切换
    $('.js-tabItem').on('click', function() {
      $(this).addClass('active').siblings().removeClass('active');
      if($(this).data('for')) {
        $($(this).data('for')).show().siblings().hide();
      } else {
        var index = $(this).index();
        $('.js-panItem').hide().eq(index).show();
      }
      return false;
    });

    // 分页中的下拉
    $('body').on('click', '.dropdown .btn', function() {
      $(this).siblings().toggle();
    });


});

/**
 * 加载
 */
function loading() {
  return layer.load(2, {
    shade: [0.1,'#fff'],
    zIndex: 19891114
  });
}

/**
 * 消息
 * @param {string} msg 消息文本
 * @param {int} time 消息展示时间
 */
function msg(msg,time) {
  var time = time || 1000;
  layer.msg(msg,{time: time});
}

/**
 * 时间
 */
function layerdate() {
  var laydate;
  // 时间初始化
  layui.use('laydate', function(){
    laydate = layui.laydate;
  });
  return laydate;
}

/**
 * 表格
 * @param {string} ele 元素id
 * @param {string} url 地址
 * @param {array} cols 列表名
 * @param {function} callback 回调
 */
function table(ele,url,cols,callback) {
  /* var table;
  var index = loading();
  setTimeout(function() {
    layui.use('table', function(){
      table = layui.table;  
      if(typeof url == 'string') {
        table.render({
          id: ele,
          elem: '#'+ele,
          url: url,
          page: true,
          cols: [cols],
          done: function(res, curr, count) {
            layer.close(index);
            if(typeof callback == 'function') callback(res, curr, count)
          }
        });
      } else {
        table.render({
          id: ele,
          elem: '#'+ele,
          data: url,
          page: {
            limits: [10, 25, 50, 100], 
            layout:['count', 'limit', 'prev', 'page', 'next', 'skip']
          },
          cols: [cols],
          done: function(res, curr, count) {  
            layer.close(index);
            if(typeof callback == 'function') callback(res, curr, count)
          }
        });
      }
    });
  }, 800); */

  if(typeof url == 'string') {
  $('#'+ele).bootstrapTable({
    ajax:function(request){                    //使用ajax请求
        $.ajax({
            type:"GET",
            url: url,
            contentType:'application/json;charset=utf-8',
            dataType:'json',
            data:request.data,
            success:function (res) {
                request.success({
                    row:res.data,
                });
                $('#'+ele).bootstrapTable('load', res.data);
                if(typeof callback == 'function') callback(res)
            },
            error:function(error){
                console.log(error);
            }
        })
    },
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    pagination: true,                   //是否显示分页（*）
    queryParams : function(params) {    //上传服务器的参数
        console.log(params);
        return {
            offset :params.offset + 0,// SQL语句起始索引
            limit : params.limit  // 每页显示数量
        };
    },
    sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
    pageNumber:1,                       //初始化加载第一页，默认第一页
    pageSize: 10,                       //每页的记录行数（*）
    pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
    smartDisplay:false,
    search: false,                      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    strictSearch: true,
    showColumns: false,                 //是否显示所有的列
    showRefresh: false,                 //是否显示刷新按钮
    minimumCountColumns: 2,             //最少允许的列数
    uniqueId: "id",                     //每一行的唯一标识，一般为主键列
    showToggle:false,                   //是否显示详细视图和列表视图的切换按钮
    cardView: false,                    //是否显示详细视图
    detailView: false,                   //是否显示父子表
    columns: cols,
    paginationHAlign: 'left',
    paginationDetailHAlign: 'left',
  });
  } else {
    $('#'+ele).bootstrapTable({
      data:url,
      striped: true,                      //是否显示行间隔色
      cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
      pagination: true,                   //是否显示分页（*）
      queryParams : function(params) {    //上传服务器的参数
          console.log(params);
          return {
              offset :params.offset + 0,// SQL语句起始索引
              limit : params.limit  // 每页显示数量
          };
      },
      sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
      pageNumber:1,                       //初始化加载第一页，默认第一页
      pageSize: 10,                       //每页的记录行数（*）
      pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
      smartDisplay:false,
      search: false,                      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
      strictSearch: true,
      showColumns: false,                 //是否显示所有的列
      showRefresh: false,                 //是否显示刷新按钮
      minimumCountColumns: 2,             //最少允许的列数
      uniqueId: "id",                     //每一行的唯一标识，一般为主键列
      showToggle:false,                   //是否显示详细视图和列表视图的切换按钮
      cardView: false,                    //是否显示详细视图
      detailView: false,                   //是否显示父子表
      columns: cols,
      paginationHAlign: 'left',
      paginationDetailHAlign: 'left',
    });
  }
}

/**
 * 图标
 * @param {string} ele 
 * @param {object} data 
 */
function chart(ele,data) {
  var myChart = echarts.init(document.getElementById(ele));
  option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        top: '20',
        data: data.legend
    },
    grid: {
        left: '7.9%',
        right: '6.5%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.xAxis
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: data.series
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 删除数组中的某个元素
 */
Array.prototype.removeValue = function(value) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == value) {
      this.splice(i, 1);
      break;
    }
  }
}

/**
 * 清除数组中的空字符元素
 */
Array.prototype.trimSpace = function() {
  for (var i=0; i<this.length; i++) {
    if(this[i] == " " || this[i] == null || this[i] == "undefined" || this[i]=="") {
      this.splice(i,1);
      i--;
    }
  }
}















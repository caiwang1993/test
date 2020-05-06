/**
 * 系统设置模块行为
 * @author 鹿文学
 */

;$(function() {

  switch(lwx.http.pathname) {
    case 'param.html':
      param();
      break;
    case 'tip.html':
      tip();
      break;  
    default:
      set();
  }


});


function tip() {
  var data = [
    {'name':'断奶待配提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':1},
    {'name':'返情待配提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':2},
    {'name':'流产待配提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':3},
    {'name':'阴性待配提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':4},
    {'name':'首次妊娠提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':5},
    {'name':'二次妊娠提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':6},
    {'name':'分娩提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':7},
    {'name':'断奶提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':8},
    {'name':'后备初配提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':9},
    {'name':'育肥提示','norm':20,'relation':'>=','param':5,'time':'2020-4-16 17:22:56','operator':'超级管理员','status':1,'id':10},
  ];
  var html = '';

  $.each(data,function(index, item) {
    html += '<tr>' + 
            ' <td>'+item.name+'</td>' +
            ' <td>'+item.norm+'</td>' +
            ' <td>'+item.relation+'</td>' +
            ' <td>'+item.param+'</td>' +
            ' <td>'+item.time+'</td>' +
            ' <td>'+item.operator+'</td>' +
            ' <td><lable class="lableBox js-lableBox"><input type="checkbox" class="clickCheckbox" '+(item.status==1?'checked':'')+'><span class="clickCheckboxBtn"></span></lable></td>' +
            ' <td><a href="javascript:;" class="clickBtn js-tipEditBtn" data-id="'+item.id+'">编辑</a></td>' +
            '</tr>';
  });

  $('#tipTable tbody').append(html);
  // 开关
  $('body').on('click', '.js-lableBox input', function() {
    if($(this).prop('checked')) {
      console.log('开启')
    } else {
      console.log('关闭')
    }
  });
  // 编辑
  $('body').on('click', '.js-tipEditBtn', function() {

    return false;
  });

}

/**
 * 猪只参数
 */
function param() {
  var data = [
    {"type":"猪只类型","detail":"公猪、母猪、肉猪"},
    {"type":"猪只品种","detail":"长白、大白、二元、三元、土猪、大长、杜洛克、皮杜"},
    {"type":"进场类型","detail":"自繁、购买、转入"},
    {"type":"离场类型","detail":"死淘、育成、转出"},
    {"type":"离场原因","detail":"长期不发育、生产能力差、胎龄过大、体况过差、精液质量差、发烧、难产、肢蹄病、压死、弱仔、病死、打架、其它"},
    {"type":"猪只状态","detail":"后备、配种、空怀、返情、流产、妊娠、哺乳、断奶、保育、育肥"},
    {"type":"猪场类型","detail":"种猪场、育种场、自繁自养、商品猪场、家庭农场、集团猪场"},
    {"type":"免疫类型","detail":"普免、产前、产后、日龄、入场后"},
    {"type":"计量单位","detail":"kg、ml、支、盒、粒、袋、克"},
    {"type":"色泽","detail":"乳白色、灰白色、偏黄色、红色、绿色"},
    {"type":"气味","detail":"正常、异常"},
    {"type":"受精方式","detail":"人工受精、自然交配"},
    {"type":"妊娠结果","detail":"妊娠、流产、返情、阴性"},
    {"type":"分娩结果","detail":"顺产、难产、助产"},
    {"type":"猪舍类型","detail":"分娩舍、配种舍、保育舍、育肥舍、公猪舍、妊娠舍、混合舍"},
    {"type":"用药方式","detail":"肌注、口服、拌料、外服、滴鼻、其它"},
  ];

  var html = '';

  $.each(data,function(index, item) {
    html += '<tr><td>'+item.type+'</td><td>'+item.detail+'</td></tr>';
  });

  $('#paramTable tbody').append(html);
}

/**
 * 猪舍设置
 */
function set() {

  // 初始化下拉选择
  select();

  // 新增
  $('.js-setAddOperation').click(function() {
    room(1);
    return false;
  });

  // 编辑
  $('body').on('click', '.js-setEditOperation',  function() {
    room(2);
    return false;
  });

  // 删除
  $('body').on('click', '.js-setDeleteOperation',  function() {
    $(this).closest('tr').remove();
    return false;
  });

  // 栏号
  $('body').on('click', '.js-setColumnOperation', function() {
    var data = [{name:'1号',id:1},{name:'2号',id:2},{name:'3号',id:3}];
    column(data);
    return false;
  });

  var data = [
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':2},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':3},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':4},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':5},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':6},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':7},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':8},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':9},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
    {'name':'育肥大舍','type':'育肥舍','number':1000,'id':1},
  ];

  table('set',data,[
    {field:'name',title:'猪舍名称',width:'24', widthUnit:'%'},
    {field:'type',title:'猪舍类型',width:'24', widthUnit:'%'},
    {field:'number',title:'最大存栏数',width:'24', widthUnit:'%'},
    {field:'operation',title:'操作',width:'28', widthUnit:'%',formatter:operation,templet:operation},
  ]);

}

/**
 * 操作 
 */
function operation(value, row) {
  return [
    '<a class="clickBtn js-setColumnOperation" data-id="'+row.id+'" href="javascript:void(0)">栏号</a>　',
    '<a class="clickBtn js-setEditOperation" data-id="'+row.id+'" href="javascript:void(0)">编辑</a>　',
    '<a class="clickBtn js-setDeleteOperation" data-id="'+row.id+'" href="javascript:void(0)">删除</a>　'
  ].join('');
}

/**
 * 栏号
 * @param {object} data 栏号对象数组列表
 */
function column(data) {
  var html = '<div class="recordWork setPop setColumnPop" id="setPop">' + 
                 '<div class="recordWrapper">' +
                 '  <div class="setDetail">' +
                 '    <div class="setDetailTitle tab js-setTitle"><a href="javascript:;" class="tabItem js-setTableAdd"><i class="icon"></i><span>新增</span></a></div>' +
                 '    <div class="setDetailTableWrapper js-setTable"><table class="recordTable setDetailTable">' +
                 '<tbody>';
    if(data && data.length>0) {
      $.each(data, function(index,item) {
        html +=      '<tr>' +
                     '  <td><div class="inputBox"><input type="text" class="input js-setTableNumber" value="'+item.name+'" placeholder="请输入编号"></div></td>' +
                     '  <td><a href="javascript:;" class="setDetailDelete js-setTableDelete" data-id="'+item.id+'">删除</a></td>' +
                     '</tr>';
      });
    }
    html +=      '</tbody>' +
                 '<thead><tr>' +
                 '  <th>栏号</th>' +
                 '  <th>操作</th>' +
                 '</tr></thead>' +
                 '    </table></div>' +
                 '  </div></div></div>';
  var tr =  '<tr>' +
            '  <td><div class="inputBox"><input type="text" class="input js-setTableNumber" placeholder="请输入编号"></div></td>' +
            '  <td><a href="javascript:;" class="setDetailDelete js-setTableDelete">删除</a></td>' +
            '</tr>';
    layer.open({
      type: 1,
      skin: 'lwx-layer',
      btn: ['保存'],
      title: '猪舍栏号',
      area: ['417px', '412px'], 
      content: html,
      success: function(layero, index) {

        var h = layero.find('#setPop').parent().height()-layero.find('.js-setTitle').outerHeight() - 30;             
        layero.find('.js-setTable').addClass('scrollTop').height(h).scroll(function() {
          $(this).find('table>thead').css({'transform':'translate(0,'+this.scrollTop+'px)'});
        });

        // 删除
        layero.on('click', '.js-setTableDelete', function() {
          $(this).closest('tr').remove();
          return false;
        });
        // 新增
        layero.find('.js-setTableAdd').click(function() {
          var tbody = layero.find('.setDetailTable tbody');
          var last = tbody.find('tr:last-child');
          var number = $.trim(last.find('.js-setTableNumber').val());
          if(last.length <1 || (last.length > 0 && number)) {
            $(tr).appendTo(tbody).find('.input').focus();
          } else {
            msg('请完善上一条数据');
          }
          return false;
        });

      },
      yes: function(index, layero) {

        layer.close(index);
      }
    });
}

/**
 * 新增编辑猪舍
 * @param {int} mark 
 * @param {object} data 
 */
function room(mark, data) {
  var mark = mark || 1;
  var html =  '<div class="recordWork setPop setRoomPop" id="setPop">' + 
              ' <div class="recordWrapper">' +
              '   <table class="recordTable setDetailTable">' +
              '     <tr>' +
              '  <td class="l"><i class="mustIcon"></i>猪舍名称</td>' +
              '  <td class="r"><div class="inputBox"><input type="text" class="input" placeholder="请输入猪舍名称"></div></td>' +
              '  <td class="l"><i class="mustIcon"></i>猪舍类型</td>' +
              '  <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>分娩舍</option><option>配种舍</option><option>保育舍</option><option>育肥舍</option><option>公猪舍</option><option>妊娠舍</option><option>混合舍</option></select></div></td>' +
              '     </tr>' +
              '     <tr>' +
              '  <td class="l"><i class="mustIcon"></i>最大存栏数</td>' +
              '  <td class="r"><div class="inputBox"><input type="text" class="input" placeholder="请输入最大存栏数"></div></td>' +
              '  <td class="l">操作员</td>' +
              '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
              '     </tr>' +
              '   </table>' +
              ' </div></div>';

    layer.open({
      type: 1,
      skin: 'lwx-layer',
      btn: ['保存'],
      title: (mark==1?'新增':'编辑')+'猪舍',
      area: ['706px', 'auto'], 
      content: html,
      success: function(layero, index) {
        // 初始化下拉菜单
        layero.find('.js-recordSelect').each(function() {
          var that = $(this);
          if (that.hasClass('selectSearchHide')) {
            var select = that.select2({
              minimumResultsForSearch: -1
            });
          } else {
            var select = that.select2({});
          }
          select.data('select2').$dropdown.addClass('lwx-select');
        });
        layero.find('.layui-layer-content').css({'position':'static','overflow':'hidden'});

      },
      yes: function(index, layero) {

        layer.close(index);
      }
    });

}


/**
 * 下拉框
 */
function select() {
  $('.js-select').each(function() {
    var that = $(this);
    var placeholder = that.attr('placeholder');
    if (that.hasClass('selectSearchHide')) {
      that.select2({
        minimumResultsForSearch: -1,
        placeholder: placeholder
      });
    } else {
      that.select2({
        placeholder: placeholder
      });
    }
  });
}
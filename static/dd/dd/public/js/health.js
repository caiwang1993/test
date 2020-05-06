/**
 * 健康模块行为
 * @author 鹿文学
 */

;$(function() {

  switch(lwx.http.pathname) {
    case 'health_set.html':
      health_set();
      $("#btnSearch").click(function(){    
        health_set();
      });
      break;
    case 'health_record.html':
      health_record();
      $("#btnSearch").click(function(){    
        health_record();
      });
      break;  
    default:
      health();
      $("#btnSearch").click(function(){    
        health();
      });    
  }

  // 时间初始化
  laydate.render({
    elem: '#startTime' //指定元素
  });
  laydate.render({
    elem: '#endTime' //指定元素
  });

  // 免疫操作
  $('body').on('click', '.js-healthOperation', function() {

    var html = '<div class="recordWork healthPop" id="healthPop">' + 
                 '<table class="recordTable">' +
                 '<tbody><tr>' +
                 '  <td><label class="checkboxBox js-checkboxBox"><input type="checkbox" class="check"><i class="icon"></i></lable></td>' +
                 '  <td>R5678</td>' +
                 '  <td>配怀舍01-01</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td><label class="checkboxBox js-checkboxBox"><input type="checkbox" class="check"><i class="icon"></i></lable></td>' +
                 '  <td>R5678</td>' +
                 '  <td>配怀舍01-01</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td><label class="checkboxBox js-checkboxBox"><input type="checkbox" class="check"><i class="icon"></i></lable></td>' +
                 '  <td>R5678</td>' +
                 '  <td>配怀舍01-01</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td><label class="checkboxBox js-checkboxBox"><input type="checkbox" class="check"><i class="icon"></i></lable></td>' +
                 '  <td>R5678</td>' +
                 '  <td>配怀舍01-01</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td><label class="checkboxBox js-checkboxBox"><input type="checkbox" class="check"><i class="icon"></i></lable></td>' +
                 '  <td>R5678</td>' +
                 '  <td>配怀舍01-01</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td><label class="checkboxBox js-checkboxBox"><input type="checkbox" class="check"><i class="icon"></i></lable></td>' +
                 '  <td>R5678</td>' +
                 '  <td>配怀舍01-01</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td><label class="checkboxBox js-checkboxBox"><input type="checkbox" class="check"><i class="icon"></i></lable></td>' +
                 '  <td>R5678</td>' +
                 '  <td>配怀舍01-01</td>' +
                 '</tr></tbody>' +
                 '<thead><tr>' +
                 '  <th><label class="checkboxBox js-checkboxBoxAll"><input type="checkbox" class="check"><i class="icon"></i></lable></th>' +
                 '  <th>耳号</th>' +
                 '  <th>所在位置</th>' +
                 '</tr></thead>' +
                 '</table>' +
                 '</div>';

    layer.open({
      type: 1,
      skin: 'lwx-layer',
      btn: ['免疫'],
      title: '待免数量',
      area: ['650px', '418px'], 
      content: html,
      success: function(layero, index) {
        var length = layero.find('.js-checkboxBox').length;  
        layero.find('.layui-layer-btn').append('<div class="selectedHealthItem">已选择<span class="js-selectedHealthItemText">0</span>/'+length+'</div>');
        layero.on('click', '.js-checkboxBoxAll input', function() {
          layero.find('.js-checkboxBox input').prop('checked', this.checked);
          layero.find('.js-selectedHealthItemText').text(this.checked?length:0);
        });
        layero.on('click', '.js-checkboxBox input', function() {
          var all = layero.find('.js-checkboxBoxAll input');
          layero.find('.js-checkboxBox input').each(function() {
            if(!this.checked) {
              all.prop('checked', false);return false;
            } else {
              all.prop('checked', true);
            }
          });
          layero.find('.js-selectedHealthItemText').text(layero.find('.js-checkboxBox input:checked').length);
        });
        var h = layero.find('#healthPop').parent().height() - 30;             
        layero.find('.healthPop').addClass('scrollTop').height(h).scroll(function() {
          $(this).find('table>thead').css({'transform':'translate(0,'+this.scrollTop+'px)'});
        });

      },
      yes: function(index, layero) {
        
        

        layer.close(index);
      }
    });

    return false;
  });

  // 免疫明细
  $('body').on('click', '.js-healthDetail', function() {
    var html = '<div class="recordWork healthDetailPop" id="healthPop">' + 
                 '<table class="recordTable">' +
                 '<tbody><tr>' +
                 '  <td>华北头孢噻呋钠</td>' +
                 '  <td>1</td>' +
                 '  <td>支</td>' +
                 '  <td>肌注</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>华北头孢噻呋钠</td>' +
                 '  <td>1</td>' +
                 '  <td>支</td>' +
                 '  <td>肌注</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>华北头孢噻呋钠</td>' +
                 '  <td>1</td>' +
                 '  <td>支</td>' +
                 '  <td>肌注</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>华北头孢噻呋钠</td>' +
                 '  <td>1</td>' +
                 '  <td>支</td>' +
                 '  <td>肌注</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>华北头孢噻呋钠</td>' +
                 '  <td>1</td>' +
                 '  <td>支</td>' +
                 '  <td>肌注</td>' +
                 '</tr>' +
                 '</tbody>' +
                 '<thead><tr>' +
                 '  <th>疫苗名称</th>' +
                 '  <th>头均用量</th>' +
                 '  <th>单位</th>' +
                 '  <th>用药方式</th>' +
                 '</tr></thead>' +
                 '</table>' +
                 '</div>';

    layer.open({
      type: 1,
      skin: 'lwx-layer',
      title: '疫苗明细',
      area: ['650px', '323px'], 
      content: html,
      success: function(layero, index) {
        var h = layero.find('#healthPop').parent().height() - 40;             
        layero.find('.healthDetailPop').addClass('scrollTop').height(h).scroll(function() {
          $(this).find('table>thead').css({'transform':'translate(0,'+this.scrollTop+'px)'});
        });
      }
    });

    return false;
  });

  // 免疫新增
  $('body').on('click', '.js-healthAddOperation', function() {
    set(1);
    return false;
  });
  // 免疫编辑
  $('body').on('click', '.js-healthEditOperation', function() {
    set(2,{list:[{name:'华北头孢噻呋钠',number:2,unit:'支',way:'肌注'},{name:'华北头孢噻呋钠',number:2,unit:'支',way:'肌注'}]});
    return false;
  });
  // 免疫删除
  $('body').on('click', '.js-healthDeleteOperation', function() {
    $(this).closest('tr').remove();
    return false;
  });

  // 免疫数量
  $('body').on('click', '.js-healthRecordDetail', function() {
    var html = '<div class="recordWork healthDetailPop" id="healthPop">' + 
                 '<table class="recordTable">' +
                 '<tbody>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td>R4567</td>' +
                 '  <td>配怀舍01-02</td>' +
                 '  <td>2020-4-14</td>' +
                 '</tr>' +
                 '</tbody>' +
                 '<thead><tr>' +
                 '  <th>耳号</th>' +
                 '  <th>所在位置</th>' +
                 '  <th>免疫日期</th>' +
                 '</tr></thead>' +
                 '</table>' +
                 '</div>';

    layer.open({
      type: 1,
      skin: 'lwx-layer',
      title: '免疫数量',
      area: ['650px', '323px'], 
      content: html,
      success: function(layero, index) {
        var h = layero.find('#healthPop').parent().height() - 40;             
        layero.find('.healthDetailPop').addClass('scrollTop').height(h).scroll(function() {
          $(this).find('table>thead').css({'transform':'translate(0,'+this.scrollTop+'px)'});
        });
      }
    });
    return false;
  });

});

/**
 * 免疫记录
 */
function health_record() {
  
  var data = [
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":1},
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":2},
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":3},
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":4},
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":5},
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":6},
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":7},
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":8},
    {"time":"2019-4-12","item":"新生猪免疫","object":"种猪","type":"普免","number":"6","id":9},
  ];

  $("#health_record").bootstrapTable('destroy');
  table('health_record',data,[
    {field:'time',title:'免疫日期'},
    {field:'item',title:'免疫项目'},
    {field:'object',title:'免疫对象'},
    {field:'type',title:'免疫类型'},
    {field:'number',title:'免疫数量',formatter:health_number,templet:health_number},
    {field:'detail',title:'疫苗明细',formatter:health_detail,templet:health_detail},
  ]);
}

/**
 * 免疫设置列表
 */
function health_set() {
  var data = [
    {"item":"妊娠猪免疫","object":"肉猪","type":"普免","id":1},
    {"item":"妊娠猪免疫","object":"肉猪","type":"普免","id":1},
    {"item":"妊娠猪免疫","object":"肉猪","type":"普免","id":1},
    {"item":"妊娠猪免疫","object":"肉猪","type":"普免","id":1},
    {"item":"妊娠猪免疫","object":"肉猪","type":"普免","id":1},
    {"item":"妊娠猪免疫","object":"肉猪","type":"普免","id":1},
    {"item":"妊娠猪免疫","object":"肉猪","type":"普免","id":1},
    {"item":"妊娠猪免疫","object":"肉猪","type":"普免","id":1},
  ];
  $("#health_set").bootstrapTable('destroy');
  table('health_set',data,[
    {field:'item',title:'免疫项目'},
    {field:'type',title:'免疫类型'},
    {field:'object',title:'免疫对象'},
    {field:'detail',title:'疫苗明细',formatter:health_detail,templet:health_detail},
    {field:'operation',title:'操作',formatter:health_set_operation,templet:health_set_operation},
  ]);
}

/**
 * 免疫提示列表
 */
function health() {

  var data = [
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":2},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":3},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":4},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":5},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":6},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":7},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":8},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":9},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":10},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1},
    {"time":"2019-11-23","item":"妊娠猪免疫","object":"肉猪","type":"普免","must":"6","real":5,"id":1}
  ]

  $("#health").bootstrapTable('destroy');
  table('health',data,[
    {field:'time',title:'免疫日期'},
    {field:'item',title:'免疫项目'},
    {field:'object',title:'免疫对象'},
    {field:'type',title:'免疫类型'},
    {field:'must',title:'应免数量'},
    {field:'real',title:'实免数量'},
    {field:'detail',title:'疫苗明细',formatter:health_detail,templet:health_detail},
    {field:'operation',title:'操作',formatter:health_operation,templet:health_operation},
  ]);
}

function health_detail(value, row) {
  //console.log(value);
  //console.log(row);
  return [
      '<a class="clickBtn js-healthDetail" data-id="'+row.id+'" href="javascript:void(0)">查看</a>　'
  ].join('');
}
function health_operation(value, row) {
  return [
    '<a class="clickBtn js-healthOperation" data-id="'+row.id+'" href="javascript:void(0)">免疫</a>　'
].join('');
}
function health_set_operation(value, row) {
  return [
    '<a class="clickBtn js-healthEditOperation" data-id="'+row.id+'" href="javascript:void(0)">编辑</a>　',
    '<a class="clickBtn js-healthDeleteOperation" data-id="'+row.id+'" href="javascript:void(0)">删除</a>　'
].join('');
}
function health_number(value, row) {
  return [
    '<a class="clickBtn js-healthRecordDetail" data-id="'+row.id+'" href="javascript:void(0)">'+row.number+'</a>　',
  ].join('');
}

/**
 * 新增编辑免疫
 * @param {int} mark 标志 (1:新增，2:编辑)
 * @param {object} data 编辑时的数据
 */
function set(mark,data) {
  var mark = mark || 1;
  var html = '<div class="recordWork healthSetPop" id="healthPop">' + 
                 '<div class="recordWrapper">' +
                 '  <ul class="healthSetList recordTable js-setList">' +
                 (mark == 1?('    <li class="healthSetItem">' +
                 '      <span class="healthSetItemPrefix"><i class="mustIcon"></i>免疫项目</span>' +
                 '      <span class="healthSetItemmain"><div class="inputBox"><input type="text" class="input" placeholder="请输入免疫项目"></div></span>' +
                 '    </li>' +
                 '    <li class="healthSetItem">' +
                 '      <span class="healthSetItemPrefix"><i class="mustIcon"></i>免疫对象</span>' +
                 '      <span class="healthSetItemmain">' +
                 '        <div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>种猪</option><option>肉猪</option><option>仔猪</option></select></div>' +
                 '      </span>' +
                 '    </li>'):'') +
                 '    <li class="healthSetItem">' +
                 '      <span class="healthSetItemPrefix"><i class="mustIcon"></i>免疫类型</span>' +
                 '      <span class="healthSetItemmain">' +
                 '        <div class="selectBox">' +
                 '          <div class="placeBox"><select class="select selectSearchHide js-recordSelect"><option>入场后</option><option>普免</option><option>产前</option><option>产后</option><option>日龄</option></select></div>' +
                 '          <div class="placeBox"><div class="unitBox"><input type="number" class="input js-type" min="0" id="typeTime" value="3"><i class="icon">天</i></div></div>' +
                 '        </div>' +
                 '      </span>' +
                 '    </li>' +
                 '    <li class="healthSetItem">' +
                 '      <span class="healthSetItemPrefix"><i class="mustIcon"></i>免疫提醒</span>' +
                 '      <span class="healthSetItemmain">' +
                 '        <div class="unitBox"><input type="number" class="input js-type" min="0" id="typeTip" placeholder="提前天数提醒"><i class="icon">天</i></div>' +
                 '      </span>' +
                 '    </li>' +
                 '  </ul>' +
                 '  <div class="healthSetDetail">' +
                 '    <div class="healthSetDetailTitle js-setTitle"><span>疫苗明细</span><a href="javascript:;" class="icon js-setTableAdd"></a></div>' +
                 '    <div class="healthSetDetailTableWrapper js-setTable"><table class="recordTable healthSetDetailTable">' +
                 '<tbody>';
    if(data && data.list) {
      $.each(data.list, function(index,item) {
        html +=      '<tr>' +
                     '  <td><div class="inputBox"><input type="text" class="input js-setTableName" value="'+item.name+'" placeholder="请输入名称"></div></td>' +
                     '  <td><div class="inputBox"><input type="text" class="input js-setTableNumber" value="'+item.number+'" placeholder="请输入数量"></div></td>' +
                     '  <td><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>支</option><option>kg</option><option>ml</option><option>盒</option><option>粒</option><option>克</option></select></div></td>' +
                     '  <td><div claas="selectBox"><select class="select selectSearchHide js-recordSelect"><option>肌注</option><option>口服</option><option>拌料</option><option>外服</option><option>滴鼻</option><option>其他</option></select></div></td>' +
                     '  <td><a href="javascript:;" class="healthSetDetailDelete js-setTableDelete"></a></td>' +
                     '</tr>';
      });
    }
    html +=      '</tbody>' +
                 '<thead><tr>' +
                 '  <th>疫苗名称</th>' +
                 '  <th>头均用量</th>' +
                 '  <th>单位</th>' +
                 '  <th>用药方式</th>' +
                 '  <th>&nbsp;</th>' +
                 '</tr></thead>' +
                 '    </table></div>' +
                 '  </div></div></div>';
    var tr = '<tr>' +
            '  <td><div class="inputBox"><input type="text" class="input js-setTableName" placeholder="请输入名称"></div></td>' +
            '  <td><div class="inputBox"><input type="text" class="input js-setTableNumber" placeholder="请输入数量"></div></td>' +
            '  <td><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>支</option><option>kg</option><option>ml</option><option>盒</option><option>粒</option><option>克</option></select></div></td>' +
            '  <td><div claas="selectBox"><select class="select selectSearchHide js-recordSelect"><option>肌注</option><option>口服</option><option>拌料</option><option>外服</option><option>滴鼻</option><option>其他</option></select></div></td>' +
            '  <td><a href="javascript:;" class="healthSetDetailDelete js-setTableDelete"></a></td>' +
            '</tr>';
    layer.open({
      type: 1,
      skin: 'lwx-layer',
      btn: ['保存'],
      title: '新增免疫',
      area: ['706px', '438px'], 
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

        layero.find('.js-type').keyup(function() {
          var that = $(this);
          if($.trim(that.val())<0) {
            that.val('')
          }
          return false;
        });

        var h = layero.find('#healthPop').parent().height()-layero.find('.js-setList').outerHeight()-layero.find('.js-setTitle').outerHeight() - 30;             
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
          var tbody = layero.find('.healthSetDetailTable tbody');
          var last = tbody.find('tr:last-child');
          var name = $.trim(last.find('.js-setTableName').val());
          var number = $.trim(last.find('.js-setTableNumber').val());
          if(last.length <1 || (last.length > 0 && name && number)) {
            $(tr).appendTo(tbody).find('.js-setTableName').focus();
            tbody.find('.js-recordSelect').each(function() {
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
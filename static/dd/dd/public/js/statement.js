/**
 * 猪场报表模块行为
 * @author 鹿文学
 */
;$(function() {

  laydate.render({
    elem: '#startTime' //指定元素
  });
  laydate.render({
    elem: '#endTime' //指定元素
  });

  switch(lwx.http.pathname) {
    case 'stock.html':
      stock();
      break;
    case 'weed_out.html':
      weed();
      break;
    case 'gestational_age.html':
      gestational();
      break;    
  }


});

/**
 * 胎龄比率
 */
function gestational() {
  var data = {
    legend: ['实际比', '标准比'],
    xAxis: ['0', '1', '2', '3', '4', '5', '6','7+'],
    series: {
      '母猪': [20, 20, 30, 50, 30, 26, 18, 20],
      '实际比': [10, 20, 21, 12, 5, 6, 20, 6],
      '标准比': [10, 20, 21, 12, 5, 6, 20, 6]
    }
  };
  var html='';
  var temp = [];
  var series = [];
  var color = {'实际比':'#3F93ED','标准比':'#F8B551'};
  $.each(data.series, function(index, item) {
    html += '<tr><td>'+index+(index == '母猪'?'(头)':'(%)')+'</td>';
    var sum = 0;
    for(var i=0; i<item.length; i++) {
      sum += parseInt(item[i]);
      html += '<td>'+item[i]+'</td>';
    }
    html += '<td>'+sum+'</td></tr>';
    if(index == '母猪') {return;}
    var style = color[index];
    series.push({name: index, type: 'bar', stack: '', barMaxWidth: 20, itemStyle: {color: style},data: item});
  });

  chart('gestationalChart', {
    legend: data.legend,
    xAxis: data.xAxis,
    series: series
  });

  $('#gestationalTable tbody').empty().append(html);

}

/**
 * 死淘分析
 */
function weed() {

  var data = {
    legend: ['公猪', '母猪', '肉猪'],
    xAxis: ['发烧', '难产', '压死', '弱仔', '病死', '打架', '肢蹄病', '胎龄过大', '体况过差', '长期不发育', '生产能力差', '精液质量差', '其它'],
    series: {
      '公猪': [3, 2, 1, 4, 3, 3, 2, 2, 5, 3, 2, 1, 5],
      '母猪': [1, 2, 1, 4, 9, 2, 2, 1, 5, 3, 2, 4, 6],
      '肉猪': [2, 2, 1, 4, 2, 3, 3, 2, 4, 5, 6, 3, 2]
    }
  };

  var temp = [];
  var series = [];
  var total = 0;
  var color = {'公猪':'#F39800','母猪':'#8FC31F','肉猪':'#3F93ED'};
  $.each(data.series, function(index, item) {
    var style = color[index];
    series.push({name: index, type: 'bar', stack: '总量', barMaxWidth: 20, itemStyle: {color: style},data: item});
    for(var i=0; i<item.length; i++) {
      if(!temp[i] || temp[i].length<1) {
        temp[i] = [];
      }
      temp[i].push(item[i]);
      total += parseInt(item[i]);
    }
  });

  if(series.length>0) {

    chart('weedChart',{
      legend: data.legend,
      xAxis: data.xAxis,
      series: series
    });

    var html = '';
    for(var i=0; i<temp.length; i++) {
      html += '<tr><td>'+data.xAxis[i]+'</td>';
      var sum = 0;
      for( var j=0; j<temp[i].length; j++) {
        var n = temp[i][j];
        html += '<td>'+n+'</td>';
        sum += parseInt(n);
      }
      html += '<td>'+sum+'</td><td>'+(sum/total*100).toFixed(2)+'%</td>';
      html += '</tr>';
    }
    
    $('#weedTable tbody').empty().append(html);

  }
}

/**
 * 猪舍存栏
 */
function stock() {
  var data = [
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
    {'name':'混合舍','total':1000,'boar':100,'sow':100,'lactation':100,'feeding':100,'fatten':100,'max':1000,'rate':'100%'},
  ];
  table('stock',data,[
    {field:'name',title:'猪舍名称'},
    {field:'total',title:'总计'},
    {field:'boar',title:'种公猪'},
    {field:'sow',title:'种母猪'},
    {field:'lactation',title:'哺乳猪'},
    {field:'feeding',title:'保育猪'},
    {field:'fatten',title:'育肥猪'},
    {field:'max',title:'最大存栏数'},
    {field:'rate',title:'猪舍使用率'}
  ]);
}
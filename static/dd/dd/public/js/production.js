/**
 * 生产管理行为
 * @author 鹿文学
 */

 $(function() {
    // 初始化下拉选择
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

    // 登记进场
    $('.js-enter').click(function() {
      var pork = $(this).hasClass('pork')? 1: 0;
      var html = '<div class="recordWork enterRoom" id="enter">' + 
                 '<table class="recordTable">' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>进场日期</td><td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="enterTime"><i class="icon"></i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>耳号</td><td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
                 '</tr>' +
                 (pork==1?'':('<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>猪只类型</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>母猪</option><option>公猪</optioin></select></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>入场胎次</td>' +
                 '  <td class="r"><div class="inputBox"><input type="text" class="input" ></div></td>' +
                 '</tr>')) +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>进场类型</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect js-enterType"><option>自繁</option><option>外购</optioin><option>转入</optioin></select></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>所在位置</td>' +
                 '  <td class="r"><div class="selectBox clear js-selectBox"><div class="placeBox"><select class="select js-recordSelect js-place"><option>配种舍01</option><option>配种舍02</option><option>配种舍03</option><option>配种舍04</option></select></div><div class="placeBox"><select class="select js-recordSelect"><option>01</option><option>02</option><option>03</option><option>04</option></select></div></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>状态</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>后备</option><option>配种</optioin><option>流产</optioin></select></div></td>' +
                 '  <td class="l">品种</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>大白</option></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l portBirthday">'+(pork==1?'<i class="mustIcon"></i>':'')+'出生日期</td>' +
                 '  <td class="r portBirthday"><div class="timeBox"><input type="text" class="input time layui-input" readonly id="birthday"><i class="icon"></i></div></td>' +           
                 '  <td class="l">操作员</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">备注</td>' +
                 '  <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
                 '</tr>' +
                 '</table>' +
                 '</div>' +
                 '<div class="recordExport">' +
                 '<span class="recordExportItem">选择导入文件<a href="">(下载模板)</a></span><button type="button" class="layui-btn" id="exportUpload">选择文件</button>' +
                 '</div>';
      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '登记进场',
        area: ['706px', 'auto'], 
        content: html,
        success: function(layero) {
          portBirthday(layero,pork,layero.find('.js-enterType').val());
          laydate.render({
            elem: '#enterTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
          laydate.render({
            elem: '#birthday'
          });
          layui.use('upload', function(){
            var upload = layui.upload;
            
            //执行实例
            var uploadInst = upload.render({
              elem: '#exportUpload' //绑定元素
              ,url: '/upload/' //上传接口
              ,done: function(res){
                //上传完毕回调
              }
              ,error: function(){
                //请求异常回调
              }
            });
          });
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
          layero.find('.js-enterType').on('change',function() {
            portBirthday(layero,pork,$(this).val());
          });
        },
        yes: function(index, layero) {
          


          layer.close(index);
        }
      });

      return false;
    });

    // 转舍
    $('.js-turn').click(function() {
      var pork = $(this).hasClass('pork')? 1: 0;
      var html = '<div class="recordWork turnRoom" id="turn">' + 
                 '<table class="recordTable">' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>转舍日期</td><td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="turnTime"><i class="icon"></i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>耳号</td><td class="r"><div class="inputBox js-overbitSelect"><input type="text" readonly class="input overbitInput"><i class="icon">查看</i></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>转入位置</td>' +
                 '  <td class="r"><div class="selectBox clear js-selectBox"><div class="placeBox"><select class="select js-recordSelect js-place"><option>配种舍01</option><option>配种舍02</option><option>配种舍03</option><option>配种舍04</option></select></div><div class="placeBox"><select class="select js-recordSelect"><option>01</option><option>02</option><option>03</option><option>04</option></select></div></div></td>' +
                 '  <td class="l">操作员</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">备注</td>' +
                 '  <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
                 '</tr>' +
                 '</table>' +
                 '</div>';

      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '登记转舍',
        area: ['706px', 'auto'], 
        content: html,
        success: function(layero, index) {
          lwx.storage.removeItem('overbit1');
          // 初始化时间插件
          laydate.render({
            elem: '#turnTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
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

          // 选择耳号
          layero.find('.js-overbitSelect').click(function() {
            var that = $(this);
            var offset = that.offset();
            offset.top += parseFloat(that.height());
            overbit({mark:1,offset:offset,data:JSON.parse(lwx.storage.getItem('overbit1'))}, function(data) {
              var value = data.overbit.join(',');
              lwx.storage.setItem('overbit1',JSON.stringify(data));
              if(data.overbit.length>1) { 
                that.addClass('overspreadBox').find('input').val(value); 
              } else {
                that.removeClass('overspreadBox').find('input').val(value);
              }
            });
            return false;
          });
        },
        yes: function(index, layero) {
         

          lwx.storage.removeItem('overbit1');

          layer.close(index);
        }
      });

      return false;
    });

    // 登记离场
    $('.js-leave').click(function() {
      var pork = $(this).hasClass('pork')? 1: 0;
      var html = '<div class="recordWork leaveRoom" id="leave">' + 
                 '<table class="recordTable">' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>离场日期</td><td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="leaveTime"><i class="icon"></i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>耳号</td><td class="r"><div class="inputBox js-overbitSelect"><input type="text" readonly class="input overbitInput"><i class="icon">查看</i></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>离场类型</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect js-leaveType"><option>死淘</option><option>育成</option><option>转出</option></select></div></td>' +
                 '  <td class="l leaveReason js-leaveReason"><i class="mustIcon"></i>离场原因</td>' +
                 '  <td class="r leaveReason js-leaveReason"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>发烧</option><option>难产</option><option>压死</option><option>弱仔</option><option>病死</option><option>打架</option></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">重量</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ><i class="icon">kg</i></div></td>' +
                 '  <td class="l">金额</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ><i class="icon">元</i></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">头单价</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ><i class="icon">元</i></div></td>' +
                 '  <td class="l">操作员</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">备注</td>' +
                 '  <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
                 '</tr>' +
                 '</table>' +
                 '</div>';

      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '登记离场',
        area: ['706px', 'auto'], 
        content: html,
        success: function(layero, index) {
          lwx.storage.removeItem('overbit2');
          // 初始化时间插件
          laydate.render({
            elem: '#leaveTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
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


          // 选择耳号
          layero.find('.js-overbitSelect').click(function() {
            var that = $(this);
            var offset = that.offset();
            offset.top += parseFloat(that.height());
            overbit({mark:2,offset:offset,data:JSON.parse(lwx.storage.getItem('overbit2'))}, function(data) {
              var value = data.overbit.join(',');
              lwx.storage.setItem('overbit2',JSON.stringify(data));
              if(data.overbit.length>1) { 
                that.addClass('overspreadBox').find('input').val(value); 
              } else {
                that.removeClass('overspreadBox').find('input').val(value);
              }
            });
            return false;
          });


          if(layero.find('.js-leaveType').val() == '死淘') {
            $('.js-leaveReason').show();
          }

          layero.find('.js-leaveType').change(function() {

            if(layero.find('.js-leaveType').val() == '死淘') {
              $('.js-leaveReason').show();
            } else {
              $('.js-leaveReason').hide();
            }

          });

        },
        yes: function(index, layero) {
          
          lwx.storage.removeItem('overbit2');

          layer.close(index);
        }
      });

      return false;
    });

    // 详情
    $('body').on('click', '.js-overbit', function() {
      var text = $(this).text();
      var load = loading();

      var pork = $(this).hasClass('pork')?1:0;

      var result = detail({},pork);

      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '耳号【'+text+'】种猪详情',
        area: ['1000px', 'auto'], 
        content: result,
        success: function(layero, index) {         
          layer.close(load);
          // 标签切换
          layero.find('.js-detailTabItem').click(function() {
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            layero.find('.detailPanItem').eq(index).show().siblings().hide();
            if(index == 1 && !$(this).hasClass('no')) {
              var h = layero.find('.detail').parent().height() - layero.find('.detailTab').outerHeight() - layero.find('.detailOperation').outerHeight() - layero.find('.detailInfo').outerHeight()-55;
              
              layero.find('.detailListBox').height(h).scroll(function() {
                $(this).find('.detailListTable>thead').css({'transform':'translate(0,'+this.scrollTop+'px)'});
              });
              $(this).addClass('no');

            }
          });
          // 初始化日期插件
          laydate.render({
            elem: '#enterTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
          laydate.render({
            elem: '#birthdayTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
          laydate.render({
            elem: '#tableime',
            value: (new Date()).format("yyyy-MM-dd")
          });
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
          // 展开隐藏信息
          layero.find('.js-detailShow').click(function() {
            $(this).closest('tr').removeClass('hide');
            return false;
          });
          
          // 配种
          layero.find('.js-hybridization').click(function() {           
            hybridization(text);
            return false;
          });

          // 妊娠
          layero.find('.js-gestation').click(function() {
            gestation(text);
            return false;
          });

          // 分娩
          layero.find('.js-parturition').click(function() {
            parturition(text);
            return false;
          });

          // 断奶
          layero.find('.js-ablactation').click(function() {
            ablactation(text);
            return false;
          });

          // 采精
          layero.find('.js-semen').click(function() {
            semen();
            return false;
          });

        },
        yes: function(index, layero) {
          var detail = layero.find('iframe').contents();
          


          
          layer.close(index);
        }
      });

      return false;
    });

    // 任务 配种
    $('body').on('click', '.js-hybridizationPage', function() {
      var text = $(this).attr('data-overbit');
      hybridization(text);
      return false;
    });
    // 任务 妊娠
    $('body').on('click', '.js-gestationPage', function() {
      var text = $(this).attr('data-overbit');
      gestation(text);
      return false;
    });
    // 任务 分娩
    $('body').on('click', '.js-parturitionPage', function() {
      var text = $(this).attr('data-overbit');
      parturition(text);
      return false;
    });
    // 任务 断奶
    $('body').on('click', '.js-ablactationPage', function() {
      var text = $(this).attr('data-overbit');
      ablactation(text);
      return false;
    });

});

/**
 * 控制出生日期
 */
function portBirthday(layero,pork,val) {
  if(pork == 1) {
    if(val == '自繁') {
      layero.find('.portBirthday').hide();
    } else {
      layero.find('.portBirthday').show();
    }         
  }
}

/**
 * 详情页渲染
 * @param {object} data
 */
function detail(data, pork) {
  var html = '<div class="detail">' + 
              '<div class="detailTab clear">' +
              ' <a href="javascript:;" class="detailTabItem js-detailTabItem active"><span>基本信息</span></a>' +
              (pork == 1?'':' <a href="javascript:;" class="detailTabItem js-detailTabItem"><span>生产信息</span></a>') +
              '</div>' +
              '<div class="detailPan">' +
              ' <div class="detailPanItem" style="display: block;"><div class="detailBase">' +
              '   <table class="detailTable">' +
              '     <tr>' +
              '       <td class="l">猪只类型：</td>' +
              '       <td class="r"><div class="textBox">'+(pork==1?'肉猪':'母猪')+'</div></td>' +
              '       <td class="l">是否在场：</td>' +
              '       <td class="r"><div class="textBox">是</div></td>' +
              '     </tr>' +
              '     <tr>' +
              '       <td class="l">猪只耳号：</td>' +
              '       <td class="r"><div class="inputBox"><input type="text" class="input" value="M54687"></div></td>' +
              '       <td class="l">所在位置：</td>' +
              '       <td class="r"><div class="selectBox clear js-selectBox"><div class="placeBox"><select class="select js-recordSelect js-place"><option>配种舍01</option><option>配种舍02</option><option>配种舍03</option><option>配种舍04</option></select></div><div class="placeBox"><select class="select js-recordSelect"><option>01</option><option>02</option><option>03</option><option>04</option></select></div></div></td>' +
              '     </tr>' +
              '     <tr>' +
              '       <td class="l">品种：</td>' +
              '       <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>大白</option><option>二元</option></select></div></td>' +
              '       <td class="l">重量：</td>' +
              '       <td class="r"><div class="unitBox"><input type="text" class="input" ><i class="icon">kg</i></div></td>' +
              '     </tr>' +
              '     <tr>' +
              '       <td class="l">出生日期：</td>' +
              '       <td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="birthdayTime"><i class="icon"></i></div></td>' +
              '       <td class="l">状态天数：</td>' +
              '       <td class="r"><div class="textBox">80</div></td>' +
              '     </tr>' +
              '     <tr>' +
              '       <td class="l">进场日期：</td>' +
              '       <td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="enterTime"><i class="icon"></i></div></td>' +
              '       <td class="l">进场类型：</td>' +
              '       <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>自繁</option><option>外购</optioin><option>转入</optioin></select></div></td>' +
              '     </tr>';
    if(pork != 1) {
    html += '     <tr>' +
              '       <td class="l">本场胎次：</td>' +
              '       <td class="r"><div class="textBox">9</div></td>' +
              '       <td class="l">入场胎次：</td>' +
              '       <td class="r"><div class="textBox">9</div></td>' +
              '     </tr>';
    }
    html +=   '     <tr>' +           
              '       <td class="l">当前状态：</td>' +
              '       <td class="r"><div class="textBox">'+(pork==1?'保育':'妊娠')+'</div></td>' +
              '     </tr>' +
              '     <tr>' +
              '       <td class="l">备注：</td>' +
              '       <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
              '     </tr>' +
              '   </table>' +
              ' </div></div>';
    if(pork != 1) {
     html +=  ' <div class="detailPanItem">' +
              '   <div class="detailOperation clear">' +
              
              '     <a href="javascript:;" class="detailOperationItem disabled js-hybridization">配种</a>' +
              '     <a href="javascript:;" class="detailOperationItem current js-gestation">妊娠</a>' +
              '     <a href="javascript:;" class="detailOperationItem js-parturition">分娩</a>' +
              '     <a href="javascript:;" class="detailOperationItem disabled js-ablactation">断奶</a>' +

              '     <a href="javascript:;" class="detailOperationItem disabled js-semen">采精</a>' +

              '   </div>' +
              '   <div class="detailInfo">' +
              '     <ul class="clear">' +
              '       <li><span class="l">配种次数：</span><span class="r">20</span></li>' +
              '       <li><span class="l">流产次数：</span><span class="r">1</span></li>' +
              '       <li><span class="l">返情次数：</span><span class="r">1</span></li>' +
              '       <li><span class="l">窝均活仔：</span><span class="r">20</span></li>' +
              '       <li><span class="l">断奶次数：</span><span class="r">3</span></li>' +
              '       <li><span class="l">分娩次数：</span><span class="r">3</span></li>' +
              '       <li><span class="l">总产仔数：</span><span class="r">60</span></li>' +
              '       <li><span class="l">分娩活仔：</span><span class="r">50</span></li>' +
              '       <li><span class="l">窝均产仔：</span><span class="r">20</span></li>' +
              '       <li><span class="l">窝仔均重：</span><span class="r">20</span></li>' +
              '       <li><span class="l">窝均断奶数：</span><span class="r">20</span></li>' +
              '     </ul>' +
              '   </div>' +
              '   <div class="detailList"><div class="detailListBox">' +
              '     <table class="detailListTable">' +
              
              '       <tbody>' +
              '         <tr class="detailListTableItem">' +
              '           <td class="td">7</td>' +
              '           <td class="td" colspan="2">' +
              '             <table class="detailListTableSub">' +

              '               <tr>' +
              '                 <td class="td">断奶</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              /* '                     <tr>' +
              '                       <td class="l">断奶日期：</td>' +
              '                       <td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="tableime"><i class="icon"></i></div></td>' +
              '                       <td class="l">断奶窝数：</td>' +
              '                       <td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">断奶窝重：</td>' +
              '                       <td class="r"><div class="unitBox"><input type="text" maxlength="10" class="input"><i class="icon"></i></div></td>' +
              '                       <td class="l">仔猪转入：</td>' +
              '                       <td class="r">' +
              '                         <div class="selectBox clear js-selectBox"><div class="placeBox"><select class="select js-recordSelect js-place"><option>哺乳舍01</option><option>哺乳舍02</option><option>哺乳舍03</option><option>哺乳舍04</option></select></div><div class="placeBox"><select class="select js-recordSelect"><option>01</option><option>02</option><option>03</option><option>04</option></select></div></div>' +
              '                       </td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
              '                     </tr>' + */
              '                     <tr>' +
              '                       <td class="l">断奶日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">断奶窝数：</td>' +
              '                       <td class="r"><div class="textBox">20</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">断奶窝重：</td>' +
              '                       <td class="r"><div class="textBox">20</div></td>' +
              '                       <td class="l">仔猪转入：</td>' +
              '                       <td class="r"><div class="textBox">哺乳舍01-01</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +

              '               <tr>' +
              '                 <td class="td">分娩</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              /* '                     <tr>' +
              '                       <td class="l">分娩日期：</td>' +
              '                       <td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="tableime"><i class="icon"></i></div></td>' +
              '                       <td class="l">分娩状况：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>顺产</option><option>难产</optioin><option>助产</optioin></select></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">产程：</td>' +
              '                       <td class="r"><div class="unitBox"><input type="text" maxlength="10" class="input"><i class="icon">分钟</i></div></td>' +
              '                       <td class="l">健仔：</td>' +
              '                       <td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">弱仔：</td>' +
              '                       <td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
              '                       <td class="l">畸形：</td>' +
              '                       <td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">死胎：</td>' +
              '                       <td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
              '                       <td class="l">木乃伊：</td>' +
              '                       <td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
              '                     </tr>' + */
              '                     <tr>' +
              '                       <td class="l">分娩日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">分娩状况：</td>' +
              '                       <td class="r"><div class="textBox">顺产</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">产程：</td>' +
              '                       <td class="r"><div class="textBox">50分钟</div></td>' +
              '                       <td class="l">健仔：</td>' +
              '                       <td class="r"><div class="textBox">10</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">弱仔：</td>' +
              '                       <td class="r"><div class="textBox">5</div></td>' +
              '                       <td class="l">畸形：</td>' +
              '                       <td class="r"><div class="textBox">1</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">死胎：</td>' +
              '                       <td class="r"><div class="textBox">0</div></td>' +
              '                       <td class="l">木乃伊：</td>' +
              '                       <td class="r"><div class="textBox">0</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +


              '               <tr>' +
              '                 <td class="td">妊娠</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              '                     <tr>' +
              '                       <td class="l">妊娠日期：</td>' +
              '                       <td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="tableime"><i class="icon"></i></div></td>' +
              '                       <td class="l">妊娠结果：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>妊娠</option><option>流产</optioin><option>返情</optioin><option>阴性</optioin></select></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
              '                     </tr>' +
              /* '                     <tr>' +
              '                       <td class="l">妊娠日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">妊娠结果：</td>' +
              '                       <td class="r"><div class="textBox">妊娠</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' + */
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +

              '               <tr>' +
              '                 <td class="td">配种</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              /* '                     <tr>' +
              '                       <td class="l">配种日期：</td>' +
              '                       <td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="tableime"><i class="icon"></i></div></td>' +
              '                       <td class="l">配种公猪：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>G53453</option><option>G345342</optioin><option>G43442</optioin></select></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">受精方式：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>人工受精</option><option>自然交配</optioin></select></div></td>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
              '                     </tr>' + */
              '                     <tr>' +
              '                       <td class="l">配种日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">配种公猪：</td>' +
              '                       <td class="r"><div class="textBox">G53453</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">受精方式：</td>' +
              '                       <td class="r"><div class="textBox">人工受精</div></td>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +
              '               <tr>' +
              '                 <td class="td">配种</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              '                     <tr>' +
              '                       <td class="l">配种日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">配种公猪：</td>' +
              '                       <td class="r"><div class="textBox">G53453</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">受精方式：</td>' +
              '                       <td class="r"><div class="textBox">人工受精</div></td>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +

              

              '               <tr>' +
              '                 <td class="td">采精</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              /* '                     <tr>' +
              '                       <td class="l">采精日期：</td>' +
              '                       <td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="tableime"><i class="icon"></i></div></td>' +
              '                       <td class="l">采精量：</td>' +
              '                       <td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">ml</i></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">色泽：</td>' +
              '                       <td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
              '                       <td class="l">气味：</td>' +
              '                       <td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">活力：</td>' +
              '                       <td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">%</i></div></td>' +
              '                       <td class="l">密度：</td>' +
              '                       <td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">%</i></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">畸形率：</td>' +
              '                       <td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">%</i></div></td>' +
              '                       <td class="l">稀释分数：</td>' +
              '                       <td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">份</i></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">PH值：</td>' +
              '                       <td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon"></i></div></td>' +
              '                       <td class="l">所在位置：</td>' +
              '                       <td class="r">' +
              '                         <div class="selectBox clear js-selectBox"><div class="placeBox"><select class="select js-recordSelect js-place"><option>哺乳舍01</option><option>哺乳舍02</option><option>哺乳舍03</option><option>哺乳舍04</option></select></div><div class="placeBox"><select class="select js-recordSelect"><option>01</option><option>02</option><option>03</option><option>04</option></select></div></div>' +
              '                       </td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
              '                     </tr>' + */
              '                     <tr>' +
              '                       <td class="l">采精日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">采精量：</td>' +
              '                       <td class="r"><div class="textBox">100ml</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">色泽：</td>' +
              '                       <td class="r"><div class="textBox">乳白色</div></td>' +
              '                       <td class="l">气味：</td>' +
              '                       <td class="r"><div class="textBox">正常</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">活力：</td>' +
              '                       <td class="r"><div class="textBox">50%</div></td>' +
              '                       <td class="l">密度：</td>' +
              '                       <td class="r"><div class="textBox">20%</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">畸形率：</td>' +
              '                       <td class="r"><div class="textBox">10%</div></td>' +
              '                       <td class="l">稀释分数：</td>' +
              '                       <td class="r"><div class="textBox">10</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">PH值：</td>' +
              '                       <td class="r"><div class="textBox">7.2</div></td>' +
              '                       <td class="l">所在位置：</td>' +
              '                       <td class="r"><div class="textBox">配种舍01-01</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +


              '             </table>' +
              '           </td>' +
              '         </tr>' +
              '         <tr class="detailListTableItem hide">' +
              '           <td class="td">6</td>' +
              '           <td class="td" colspan="2">' +
              '             <a href="javascript:;" class="detailShow js-detailShow">详情</a>' +
              '             <table class="detailListTableSub">' +

              '               <tr>' +
              '                 <td class="td">断奶</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              '                     <tr>' +
              '                       <td class="l">断奶日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">断奶窝数：</td>' +
              '                       <td class="r"><div class="textBox">20</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">断奶窝重：</td>' +
              '                       <td class="r"><div class="textBox">20</div></td>' +
              '                       <td class="l">仔猪转入：</td>' +
              '                       <td class="r"><div class="textBox">哺乳舍01-01</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +
              '               <tr>' +
              '                 <td class="td">分娩</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              '                     <tr>' +
              '                       <td class="l">分娩日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">分娩状况：</td>' +
              '                       <td class="r"><div class="textBox">顺产</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">产程：</td>' +
              '                       <td class="r"><div class="textBox">50分钟</div></td>' +
              '                       <td class="l">健仔：</td>' +
              '                       <td class="r"><div class="textBox">10</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">弱仔：</td>' +
              '                       <td class="r"><div class="textBox">5</div></td>' +
              '                       <td class="l">畸形：</td>' +
              '                       <td class="r"><div class="textBox">1</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">死胎：</td>' +
              '                       <td class="r"><div class="textBox">0</div></td>' +
              '                       <td class="l">木乃伊：</td>' +
              '                       <td class="r"><div class="textBox">0</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +
              '               <tr>' +
              '                 <td class="td">妊娠</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              '                     <tr>' +
              '                       <td class="l">妊娠日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">妊娠结果：</td>' +
              '                       <td class="r"><div class="textBox">妊娠</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +
              '               <tr>' +
              '                 <td class="td">配种</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              '                     <tr>' +
              '                       <td class="l">配种日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">配种公猪：</td>' +
              '                       <td class="r"><div class="textBox">G53453</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">受精方式：</td>' +
              '                       <td class="r"><div class="textBox">人工受精</div></td>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +
              '               <tr>' +
              '                 <td class="td">配种</td>' +
              '                 <td class="td">' +
              '                   <div class="detailListTableSubBox"><table class="detailListTableSubDetail">' +
              '                     <tr>' +
              '                       <td class="l">配种日期：</td>' +
              '                       <td class="r"><div class="textBox">2020-04-10</div></td>' +
              '                       <td class="l">配种公猪：</td>' +
              '                       <td class="r"><div class="textBox">G53453</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">受精方式：</td>' +
              '                       <td class="r"><div class="textBox">人工受精</div></td>' +
              '                       <td class="l">操作员：</td>' +
              '                       <td class="r"><div class="textBox">钱一一</div></td>' +
              '                     </tr>' +
              '                     <tr>' +
              '                       <td class="l">备注：</td>' +
              '                       <td class="r" colspan="3"><div class="textBox">母猪</div></td>' +
              '                     </tr>' +
              '                   </table></div>' +
              '                 </td>' +
              '               </tr>' +
              
              '             </table>' +
              '           </td>' +
              '         </tr>' +
              '         <tr class="detailListTableItem hide"><td class="td">5</td><td class="td" colspan="2"><a href="javascript:;" class="detailShow js-detailShow">详情</a><table class="detailListTableSub"><tr><td class="td">断奶</td><td class="td"></td></tr><tr><td class="td">分娩</td><td class="td"></td></tr><tr><td class="td">妊娠</td><td class="td"></td></tr><tr><td class="td">配种</td><td class="td"></td></tr></table></td></tr>' +
              '         <tr class="detailListTableItem hide"><td class="td">4</td><td class="td" colspan="2"><a href="javascript:;" class="detailShow js-detailShow">详情</a><table class="detailListTableSub"><tr><td class="td">断奶</td><td class="td"></td></tr><tr><td class="td">分娩</td><td class="td"></td></tr><tr><td class="td">妊娠</td><td class="td"></td></tr><tr><td class="td">配种</td><td class="td"></td></tr><tr><td class="td">配种</td><td class="td"></td></tr></table></td></tr>' +
              '         <tr class="detailListTableItem hide"><td class="td">3</td><td class="td" colspan="2"><a href="javascript:;" class="detailShow js-detailShow">详情</a><table class="detailListTableSub"><tr><td class="td">断奶</td><td class="td"></td></tr><tr><td class="td">分娩</td><td class="td"></td></tr><tr><td class="td">妊娠</td><td class="td"></td></tr><tr><td class="td">配种</td><td class="td"></td></tr></table></td></tr>' +
              '         <tr class="detailListTableItem hide"><td class="td">2</td><td class="td" colspan="2"><a href="javascript:;" class="detailShow js-detailShow">详情</a><table class="detailListTableSub"><tr><td class="td">断奶</td><td class="td"></td></tr><tr><td class="td">分娩</td><td class="td"></td></tr><tr><td class="td">妊娠</td><td class="td"></td></tr><tr><td class="td">配种</td><td class="td"></td></tr><tr><td class="td">配种</td><td class="td"></td></tr></table></td></tr>' +
              '         <tr class="detailListTableItem hide"><td class="td">1</td><td class="td" colspan="2"><a href="javascript:;" class="detailShow js-detailShow">详情</a><table class="detailListTableSub"><tr><td class="td">断奶</td><td class="td"></td></tr><tr><td class="td">分娩</td><td class="td"></td></tr><tr><td class="td">妊娠</td><td class="td"></td></tr><tr><td class="td">配种</td><td class="td"></td></tr></table></td></tr>' +
              '       </tbody>' +

              '       <thead><tr><th class="th">胎次</th><th class="th">事件</th><th class="th">详情</th></tr></thead>' +

              '     </table>' +
              '   </div></div>' +
              ' </div>';
    }
      html += '</div></div>';

  return html;

}

/**
 * 登记配种弹窗
 * @param {int} overbit 耳号
 */
function hybridization(overbit) {
  
  var html = '<div class="recordWork hybridizationRoom" id="hybridization">' + 
                 '<table class="recordTable">' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>配种日期</td><td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="hybridizationTime"><i class="icon"></i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>配种公猪</td><td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>M54657</option><option>M54658</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>受精方式</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect js-leaveType"><option>死淘</option><option>育成</option><option>转出</option></select></div></td>' +
                 '  <td class="l">操作员</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">备注</td>' +
                 '  <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
                 '</tr>' +
                 '</table>' +
                 '</div>';

      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '耳号【'+overbit+'】母猪登记配种',
        area: ['706px', 'auto'], 
        content: html,
        success: function(layero, index) {
          // 初始化时间插件
          laydate.render({
            elem: '#hybridizationTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
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
 * 登记妊娠弹窗
 * @param {int} overbit 耳号
 */
function gestation(overbit) {
  var html = '<div class="recordWork gestationRoom" id="gestation">' + 
                 '<table class="recordTable">' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>妊娠日期</td><td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="gestationTime"><i class="icon"></i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>妊娠结果</td><td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>妊娠</option><option>流产</optioin><option>返情</optioin><option>阴性</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">操作员</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">备注</td>' +
                 '  <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
                 '</tr>' +
                 '</table>' +
                 '</div>';

      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '耳号【'+overbit+'】母猪登记妊娠',
        area: ['706px', 'auto'], 
        content: html,
        success: function(layero, index) {
          // 初始化时间插件
          laydate.render({
            elem: '#gestationTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
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
 * 登记分娩弹窗
 * @param {int} overbit 耳号
 */
function parturition(overbit) {
  var html = '<div class="recordWork parturitionRoom" id="parturition">' + 
                 '<table class="recordTable">' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>分娩日期</td><td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="parturitionTime"><i class="icon"></i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>分娩状况</td><td class="r"><div class="selectBox"><select class="select selectSearchHide js-recordSelect"><option>顺产</option><option>难产</optioin><option>助产</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>产程</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" maxlength="10" ><i class="icon">分钟</i></div></td>' +
                 '  <td class="l">健仔</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">弱仔</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ></div></td>' +
                 '  <td class="l">畸形</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">死胎</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ></div></td>' +
                 '  <td class="l">木乃伊</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">活仔</td>' +
                 '  <td class="r"><div class="unitBox"><input type="text" class="input" ></div></td>' +
                 '  <td class="l">操作员</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">备注</td>' +
                 '  <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
                 '</tr>' +
                 '</table>' +
                 '</div>';

      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '耳号【'+overbit+'】母猪登记分娩',
        area: ['706px', 'auto'], 
        content: html,
        success: function(layero, index) {
          // 初始化时间插件
          laydate.render({
            elem: '#parturitionTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
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
 * 登记断奶弹窗
 * @param {int} overbit 耳号
 */
function ablactation(overbit) {
  var html = '<div class="recordWork ablactationRoom" id="ablactation">' + 
                 '<table class="recordTable">' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>断奶日期</td><td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="ablactationTime"><i class="icon"></i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>断奶仔数</td><td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">断奶窝重</td><td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
                 '  <td class="l">仔猪转入</td>' +
                 '  <td class="r"><div class="selectBox clear js-selectBox"><div class="placeBox"><select class="select js-recordSelect js-place"><option>配种舍01</option><option>配种舍02</option><option>配种舍03</option><option>配种舍04</option></select></div><div class="placeBox"><select class="select js-recordSelect"><option>01</option><option>02</option><option>03</option><option>04</option></select></div></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">操作员</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">备注</td>' +
                 '  <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
                 '</tr>' +
                 '</table>' +
                 '</div>';

      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '耳号【'+overbit+'】母猪登记断奶',
        area: ['706px', 'auto'], 
        content: html,
        success: function(layero, index) {
          // 初始化时间插件
          laydate.render({
            elem: '#ablactationTime',
            value: (new Date()).format("yyyy-MM-dd")
          });
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
 * 登记采精弹窗
 * @param {int} overbit 耳号
 */
function semen(overbit) {
  var html = '<div class="recordWork semenRoom" id="semen">' + 
                 '<table class="recordTable">' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>采精日期</td><td class="r"><div class="timeBox"><input type="text" readonly class="input time layui-input" id="semenTime"><i class="icon"></i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>采精量</td><td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">ml</i></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>色泽</td><td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>气味</td><td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>活力</td><td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">%</i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>密度</td><td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">%</i></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>畸形率</td><td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">%</i></div></td>' +
                 '  <td class="l"><i class="mustIcon"></i>稀释分数</td><td class="r"><div class="unitBox"><input type="text" class="input"><i class="icon">份</i></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l"><i class="mustIcon"></i>PH值</td><td class="r"><div class="inputBox"><input type="text" class="input"></div></td>' +
                 '  <td class="l">操作员</td>' +
                 '  <td class="r"><div class="selectBox"><select class="select js-recordSelect"><option>钱一一</option><option>小米</optioin></select></div></td>' +
                 '</tr>' +
                 '<tr>' +
                 '  <td class="l">备注</td>' +
                 '  <td class="r" colspan="3"><textarea class="textarea"></textarea></td>' +
                 '</tr>' +
                 '</table>' +
                 '</div>';

      layer.open({
        type: 1,
        skin: 'lwx-layer',
        btn: ['保存'],
        title: '耳号【'+overbit+'】公猪登记采精',
        area: ['706px', 'auto'], 
        content: html,
        success: function(layero, index) {
          // 初始化时间插件
          laydate.render({
            elem: '#semenTime',
            value: (new Date()).format("yyyy-MM-dd")
          });

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
 * 选择查看耳号
 * @param {object} option 选项
 * @param {function} fn 回调
 */
function overbit(option,fn) {

  var load = loading();

  var transfor={
    room: 0, // 舍编号
    text: '', // 舍
    column: [], // 栏编号列表
    overbit: [], // 耳号列表
    chain:{},
    all: 0
  };

  var primary = [];
  var keys = [];

  if(option.data) {
    console.log(option.data)
    transfor = option.data;
  }

  // ajax请求的响应数据
  var list = [
    {
      "id": 1,
      "text": "育肥舍",
      "child": [
        {
          "id": 1,
          "text": "栏号1",
          "child": [
            {
              "id": 1,
              "text": "MZ0001"
            },
            {
              "id": 2,
              "text": "MZ0002"
            }
          ]
        },
        {
          "id": 2,
          "text": "栏号2",
          "child": [
            {
              "id": 1,
              "text": "GZ0001"
            },
            {
              "id": 2,
              "text": "GZ0002"
            }
          ]
        },{
          "id": 3,
          "text": "栏号3",
          "child": [
            {
              "id": 1,
              "text": "RZ0001"
            },
            {
              "id": 2,
              "text": "RZ0002"
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "text": "配怀舍",
      "child": [
        {
          "id": 11,
          "text": "栏号1",
          "child": [
            {
              "id": 0,
              "text": "PH0001"
            },
            {
              "id": 0,
              "text": "PH0002"
            },
            {
              "id": 0,
              "text": "PH0003"
            },
            {
              "id": 0,
              "text": "PH0004"
            },
            {
              "id": 0,
              "text": "PH0005"
            },
            {
              "id": 0,
              "text": "PH0006"
            }
          ]
        },
        {
          "id": 12,
          "text": "栏号2"
        }
      ]
    },
    {
      "id": 3,
      "text": "产房",
      "child": [
        {
          "id": 21,
          "text": "栏号1"
        },
        {
          "id": 22,
          "text": "栏号2"
        }
      ]
    },
    {
      "id": 4,
      "text": "配怀舍1",
      "child": [
        {
          "id": 31,
          "text": "栏号1"
        },
        {
          "id": 32,
          "text": "栏号2"
        }
      ]
    },
    {
      "id": 5,
      "text": "配怀舍2",
      "child": []
    },
    {
      "id": 6,
      "text": "配怀舍3",
      "child": []
    }
  ];


  $.each(list, function(index, item) {
    if(item.child)
      $.each(item.child, function(cindex, citem) {
        if(citem.child) {
          $.each(citem.child, function(oindex, oitem) {
            primary[oitem.text] = (item.id+','+citem.id+','+oitem.text);
            keys.push(oitem.text);
          });
        }
      });
  });

  var html = '<div class="recordWork overbitSelectBox" id="overbit">' + 
          ' <div class="overbitSelectWrapper clear">' +
          '   <div class="overbitSelectItem">' +
          '     <div class="overbitSelectTitle">选择</div>' +
          '     <div class="overbitSelectContent">' +
          '       <div class="overbitSelectSearch"><input type="text" class="inputSearech js-inputSearch"><i class="icon"></i><div class="inputSearchList js-inputSearchList"></div></div>' +
          '       <div class="overbitSelectLinkBox">' +
          ((transfor.column && transfor.column.length>0)?'<a href="javascript:;" class="overbitSelectLink js-overbitLink">溪谷猪场</a><a href="javascript:;" class="overbitSelectLink current">栋舍['+transfor.text+']</a>':'<a href="javascript:;" class="overbitSelectLink js-overbitLink current">溪谷猪场</a>') +
          '       </div>' +
          '       <div class="overbitRoomList js-overbitRoomList">';
if(list) {
  if(transfor.column && transfor.column.length>0) {
    var col;
    $.each(list,function(index, item) {
      if(item.id == transfor.room) {
        col = item.child;
      }
    });
    if(col) {
      if(option.mark == 2) {
        html += '<label class="overbitRoomItemFence js-overbitRoomFenceAll"><input type="checkbox" '+(transfor.all?'checked':'')+' class="check"><i class="icon"></i><span>全选</span></label>';
      }
      $.each(col,function(index, item) {
        var chain = transfor.column;
        var n=0;
        for(var i=0; i<chain.length; i++) {
          n++;
          if(chain[i] == item.id) {
            html += '<label class="overbitRoomItemFence js-overbitRoomFence"><input type="checkbox" checked class="check"><i class="icon"></i><span>'+item.text+'</span></label>';
            n--;
            break;
          }
        }
        if(n == chain.length) {
          html += '<label class="overbitRoomItemFence js-overbitRoomFence"><input type="checkbox" class="check"><i class="icon"></i><span>'+item.text+'</span></label>';
        }
      });
    }
  } else {
    $.each(list,function(index, item) {
      html += '         <a href="javascript:;" class="overbitRoomItem js-overbitRoom"><span>'+item.text+'</span><i class="icon">下级</i></a>';
    });
  }
}
  html += '       </div>' +
          '     </div>' +
          '   </div>' +
          '   <div class="overbitSelectItem">' +
          '     <div class="overbitSelectTitle">已选</div>' +
          '     <div class="overbitSelectContent">' +
          '       <div class="overbitSelectList js-overbitList">';
          
if(transfor.column && transfor.column.length>0) {
  $.each(transfor.chain,function(index, item) {
    for(var i=0; i<item.length; i++) {
      text = item[i];
      html += '<a href="javascript:;" class="overbitSelectListItem js-overbitDelete" data-pid="'+index+'" data-id="'+text+'"><span>'+text+'</span><i class="icon"></i></a>';
    }
  });
}


  html += '       </div>' +
          '     </div>' +
          '   </div>' +
          ' </div>' +
          '</div>';
  
    layer.open({
      type: 1,
      skin: 'lwx-layer lwx-layer-btn',
      btn: ['确定'],
      title: '选择耳号',
      area: ['646px', 'auto'],
      offset: [option.offset.top+'px',option.offset.left+'px'], 
      content: html,
      success: function(layero, index) {

        layer.close(load);
        var column;
        if(col) {column = col;}
        // 搜索
        layero.find('.js-inputSearch').keyup(function() {   
          var that = $(this)
          var val = $.trim(that.val()).toLowerCase();
          if(val) {
            var html = '';
            for(var k=0; k<keys.length; k++) {
              if(keys[k].toLowerCase().indexOf(val) > -1) {
                html += '<a href="javascript:;" class="inputSearchListItem js-inputSearchListItem">'+keys[k]+'</a>';
              }
            }
            if(!html) {
              html = '<span class="inputSearchListItemEmpty">没搜索到结果</span>';
            }
            layero.find('.js-inputSearchList').empty().show().append(html);
          } else {
            layero.find('.js-inputSearchList').empty().hide();
          }
          return false;
        });
        // 搜索结果选择
        layero.on('click', '.js-inputSearchListItem', function() {
          var overbit = $(this).text();
          var chain = primary[overbit].split(',');
          var temp;
          var text;
          $.each(list, function(index, item) {
            if(item.id == chain[0]) {
              temp = item.child;
              transfor.text = text = item.text;
              transfor.room = item.id;

            }
          });
          var columnId = chain[1];
          var html = '';
          transfor.overbit = [];
          transfor.column = [];
          transfor.chain={};
          transfor.all = 0;
          if(temp) {
            transfor.column.push(columnId);
            if(option.mark == 2) {
              html += '<label class="overbitRoomItemFence js-overbitRoomFenceAll"><input type="checkbox" class="check"><i class="icon"></i><span>全选</span></label>';
            }
            $.each(temp,function(index, item) {
              if(columnId == item.id) {
                html += '<label class="overbitRoomItemFence js-overbitRoomFence"><input type="checkbox" checked class="check"><i class="icon"></i><span>'+item.text+'</span></label>';
              } else {
                html += '<label class="overbitRoomItemFence js-overbitRoomFence"><input type="checkbox" class="check"><i class="icon"></i><span>'+item.text+'</span></label>';
              }
            });
            layero.find('.js-overbitRoomList').empty().append(html);
            if(layero.find('.js-overbitLink').siblings().length>0) {
              layero.find('.js-overbitLink').siblings().remove();
            }
            layero.find('.js-overbitLink').removeClass('current').after('<a href="javascript:;" class="overbitSelectLink current">栋舍['+text+']</a>');
            transfor.chain[columnId] = [];
            var html = '';
            html += '<a href="javascript:;" class="overbitSelectListItem js-overbitDelete" data-pid="'+columnId+'" data-id="'+overbit+'"><span>'+overbit+'</span><i class="icon"></i></a>';
            transfor.overbit.push(overbit);
            transfor.chain[columnId].push(overbit);
            layero.find('.js-overbitList').empty().append(html);
          }
          $(this).parent().hide().empty();
          layero.find('.js-inputSearch').val('')
          return false;
        });

        // 进入某个栋舍的栏列表
        layero.on('click', '.js-overbitRoom', function(e) {
          var parent = $(this).parent();
          var text = $(this).find('span').text();
          column = '';
          $.each(list,function(index, item) {
            if(text == item.text) {
              column = item.child;
              transfor.room = item.id;
              transfor.text = item.text;
            }
          });
          var html = '';
          if(column) {
            var m = 0;
            $.each(column,function(index, item) {
              var n = 0;
              var chain = transfor.column;
              for(var j=0; j<chain.length;j++) {
                n++;
                if(chain[j] == item.id) {
                  html += '<label class="overbitRoomItemFence js-overbitRoomFence"><input type="checkbox" checked class="check"><i class="icon"></i><span>'+item.text+'</span></label>';
                  n--;
                  continue;
                }
              }
              if(n == chain.length) {
                m++;
                html += '<label class="overbitRoomItemFence js-overbitRoomFence"><input type="checkbox" class="check"><i class="icon"></i><span>'+item.text+'</span></label>';
              }
            });
            if(option.mark == 2) {
              if(m<1) {
                html = '<label class="overbitRoomItemFence js-overbitRoomFenceAll"><input type="checkbox" '+(transfor.all?'checked':'')+' class="check"><i class="icon"></i><span>全选</span></label>' + html;
              } else {
                html = '<label class="overbitRoomItemFence js-overbitRoomFenceAll"><input type="checkbox" class="check"><i class="icon"></i><span>全选</span></label>' + html;
              } 
            }
            parent.empty().append(html);
            layero.find('.js-overbitLink').removeClass('current').after('<a href="javascript:;" class="overbitSelectLink current">栋舍['+text+']</a>');
          } else {
            msg('此舍无栏');
          }
          return false;
        });

        // 全选
        layero.on('click', '.js-overbitRoomFenceAll input', function() {
          var overbit = layero.find('.js-overbitList');
          if($(this).siblings().find('input:checked').length<1) {
            overbit.empty();
            transfor.overbit = [];
            transfor.column = [];
            transfor.chain={};
            transfor.all = 0;
          }
          $(this).parent().siblings('.js-overbitRoomFence').find('input').prop('checked', this.checked)
          if(this.checked) {             
            var html = '';
            $.each(column,function(index, value) {
              transfor.column.push(value.id);
              transfor.chain[value.id] = [];
              if(value.child) {
                $.each(value.child,function(index, item) {
                  html += '<a href="javascript:;" class="overbitSelectListItem js-overbitDelete" data-pid="'+value.id+'" data-id="'+item.text+'"><span>'+item.text+'</span><i class="icon"></i></a>';
                  transfor.overbit.push(item.text);
                  transfor.chain[value.id].push(item.text);
                });
              }
            });
            transfor.all = 1;
            overbit.append(html);
          } else {
            overbit.empty();
            transfor.overbit = [];
            transfor.column = [];
            transfor.chain={};
            transfor.all = 0;
          }                         
        });

        // 选择栏号
        layero.on('click', '.js-overbitRoomFence input', function() {
          var that = $(this);
          var overbit = layero.find('.js-overbitList');
          var text = that.siblings('span').text();
          var parent = that.parent();
          var input = parent.siblings().find('input:checked');

          if(option.mark == 2) {

            var all = that.parent().siblings('.js-overbitRoomFenceAll').find('input');

            if(input.length<1) {
              overbit.empty();
              transfor.overbit = [];
              transfor.column = [];
              transfor.chain={};
              transfor.all = 0;
            }
            that.closest('.js-overbitRoomList').find('.js-overbitRoomFence input').each(function() {
              if(!this.checked) {
                transfor.all = 0;
                all.prop('checked', false);return false;
              } else {
                transfor.all = 1;
                all.prop('checked', true);
              }
            });
          } else {
            if(input.length>0) {
              msg('此为单选');
              return false;
            }
            
            transfor.overbit = [];
            transfor.column = [];
            transfor.chain = {};
            overbit.empty();    
          }


          if(this.checked) {

            var html = '';
            $.each(column,function(index, item) {
              if(text == item.text) {
                value = item;
                transfor.column.push(item.id);
                transfor.chain[item.id] = [];
              }
            });
            if(value.child) {
              $.each(value.child,function(index, item) {
                html += '<a href="javascript:;" class="overbitSelectListItem js-overbitDelete" data-pid="'+value.id+'" data-id="'+item.text+'"><span>'+item.text+'</span><i class="icon"></i></a>';
                transfor.overbit.push(item.text);
                transfor.chain[value.id].push(item.text);
              });
              overbit.append(html);
            } else {
              msg('此栏无猪');
            }

          } else {
            if(option.mark == 2) {
              $.each(column,function(index, item) {
                if(text == item.text) {
                  transfor.column.removeValue(item.id);
                  value = item;
                }
              });
              if(value.child) {
                $.each(value.child, function(index, item) {
                  delete transfor.chain[value.id];
                  layero.find('.js-overbitDelete[data-id='+item.text+']').remove();
                });
              }
            }
          }

        });

        // 返回栋舍列表
        layero.find('.js-overbitLink').click(function() {
          var that = $(this);
          var html = '';
          var room = layero.find('.js-overbitRoomList');
          $.each(list,function(index, item) {
            html += '         <a href="javascript:;" class="overbitRoomItem js-overbitRoom" data-id="'+item.text+'"><span>'+item.text+'</span><i class="icon">下级</i></a>';
          });
          room.empty().append(html);
          that.addClass('current').siblings().remove();
          return false;
        });
        
        // 删除耳号
        layero.on('click', '.js-overbitDelete', function() {
          transfor.overbit.removeValue($(this).attr('data-id'));
          transfor.chain[$(this).attr('data-pid')].removeValue($(this).attr('data-id'));
          $(this).remove();           
          return false;
        });

      },
      yes: function(index) {   
        if(typeof fn == 'function') fn(transfor);
        layer.close(index);
      }
    });

}




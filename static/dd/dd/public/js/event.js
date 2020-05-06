/**
 * 事件查询
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

    // 时间初始化
    laydate.render({
        elem: '#startTime' //指定元素

    });
    laydate.render({
        elem: '#endTime' //指定元素
    });
    // 时间初始化
    laydate.render({
        elem: '#startTime2' //指定元素

    });
    laydate.render({
        elem: '#endTime2' //指定元素
    });

//日期按钮切换
    $('.formItem .data-btn').click(function () {
        $(this).addClass("select").closest(".formItem").siblings(".formItem").find(".data-btn").removeClass("select")
    });

    //查看数量
    $('body').on('click', '.js-earNumber', function() {
        var html = '<div class="recordWork earNumDetailPop" id="earNumberPop">' +
            '<table class="recordTable">' +
            '<tbody>' +
            '<tr>' +
            '  <td>1</td>' +
            '  <td>R545488</td>' +
            '</tr>' +
            '<tr>' +
            '  <td>2</td>' +
            '  <td>R545488</td>' +
            '</tr>' +
            '<tr>' +
            '  <td>3</td>' +
            '  <td>R545488</td>' +
            '</tr>' +
            '<tr>' +
            '  <td>4</td>' +
            '  <td>R545488</td>' +
            '</tr>' +
            '<tr>' +
            '  <td>5</td>' +
            '  <td>R545488</td>' +
            '</tr>' +
            '<tr>' +
            '  <td>6</td>' +
            '  <td>R545488</td>' +
            '</tr>' +
            '<tr>' +
            '  <td>7</td>' +
            '  <td>R545488</td>' +
            '</tr>' +
            '</tbody>' +
            '<thead><tr>' +
            '  <th>序号</th>' +
            '  <th>耳号</th>' +
            '</tr></thead>' +
            '</table>' +
            '</div>';

        layer.open({
            type: 1,
            skin: 'lwx-layer',
            title: '耳号数量',
            area: ['650px', '323px'],
            content: html,
            success: function(layero, index) {
                var h = layero.find('#earNumberPop').parent().height() - 40;
                layero.find('.earNumDetailPop').addClass('scrollTop').height(h).scroll(function() {
                    $(this).find('table>thead').css({'transform':'translate(0,'+this.scrollTop+'px)'});
                });
            }
        });

        return false;
    });

});

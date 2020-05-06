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





});

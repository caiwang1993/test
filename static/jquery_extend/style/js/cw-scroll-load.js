/**
 * Created by cw on 2020/4/16.
 * 本插件基于jquery
 * 用于移动端列表数据加载
 * 向上滑动加载数据
 */
;(function () {
    //创建构造函数Scroll
    let Scroll = function (ele,options) {
        this.default = {                           //默认值
            limit:20,
            html:''
        };
        this.opts = $.extend({},this.default,options); //传进来的参数覆盖默认值
        this.totalHeight = $(document).height(); //页面、文档总高度
        this.sTopHeight = $(window).scrollTop(); // 当前页面滑动条顶部距离
        this.seeHeight = $(window).height();    //页面可视高度
        this.$list = ele;
        console.log(this.opts)
    };
    Scroll.prototype = {
        add: function () {
            let that = this;

            let add_list=[
                {item_:'item1'},
                {item_:'item2'},
                {item_:'item3'},
                {item_:'item4'},
                {item_:'item5'},
                {item_:'item6'},
                {item_:'item7'},
                {item_:'item8'},
                {item_:'item9'},
                {item_:'item10'}
            ];
           let add_li = add_list.map(item =>  {
               return `<li>${item.item_}</li>`
           });
            that.$list.append(add_li)
        },
      inital : function () {
          let that = this;
          that.totalHeight= $(document).height();
          that.sTopHeight =  document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          //距离底部50的时候加载
          if(that.sTopHeight+that.seeHeight +50 >= that.totalHeight){
              that.add()
          }
      }
    };
    //滑动滚动条加载此数据
    $.fn.scroll = function (options) {
        let that = this;
        let scroll = new Scroll(that,options);
        window.onscroll= function () {
            return scroll.inital()
        }
    };

})(jQuery,window,document,undefined);
/**
 * Created by cw on 2020/4/15.
 * 基于jquery的图片查看插件
 */
;(function () {
    /*创建构造函数ImgView*/
    let ImgView = function (elem) {
        this.$img = elem;
        this.$parent = elem.closest("body");
        this.status = 0 ;   //img打开状态，0未打开，1已打开
    };
    ImgView.prototype = {
        open:function (ele) {
            let that = this;
            that.status = 1 ;
            let imgSrc = ele.attr("src");
            that.$parent.append('<div class="imgView" style = "position: fixed;top: 0;left: 0;width: 100vw;height: 100vh;background: rgba(0,0,0,0.8);display: flex;align-items: center;justify-content: center"><img src="'+imgSrc+'" style="max-width: 80%;"></div>')
        },
        close:function () {
            let that = this;
            that.status = 0 ;
            that.$parent.find('.imgView').remove()
        },
        status:function () {

        },
        inital:function () {
            let that = this;
            that.$img.click(function (e) {
                //调用打开函数
                e.stopPropagation();
                let salf_item = $(this);
                that.open(salf_item);
            });
            that.$parent.click(function () {
               /* if(that.status){*/
                    that.close();
               /* }*/

            })
        }
    };
    $.fn.imgView= function () {
        console.log(this);
        //使用new创建新对象
        let imgView = new ImgView(this);
        return imgView.inital()
    }
    })(jQuery,window,document,undefined);
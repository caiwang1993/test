/**
 * Created by Administrator on 2019/5/22.
 */
jQuery(function () {
    document.body.addEventListener('touchstart', function () { });
    /*判断当前浏览器宽度，如果小于1200，添加自适应尺寸*/
    var ht = $('html');
    var dwidth = window.innerWidth;
    var dheight = window.innerHeight;
    if (ht.width()<=1200) {
        orientation(ht);
    }
    function orientation(ht) {
        var supportOrientation = (typeof window.orientation == 'number' && typeof window.onorientationchange === 'object');
        var init = function() {
            var htmlNode = document.body.parentNode,orientation;
            var fontSize = ht.width()*625/1242;
            var updateOrientation = function(){
                if (supportOrientation) {
                    orientation = window.orientation;
                    switch(orientation) {
                        case 90:
                        case -90:
                            fontSize = ht.width()*625/1242/1.77777;break;
                    }
                } else {
                    if(window.innerWidth>window.innerHeight && window.innerWidth==dheight && window.innerHeight == dwidth) {
                        fontSize = ht.width()*625/1242/1.77777;
                    }
                }
                ht.css({'font-size':fontSize+'%'});
            }
            if (supportOrientation) {
                window.addEventListener('orientationchange',updateOrientation,false);
            } else{
                window.addEventListener('resize',updateOrientation,false);
            }
            updateOrientation();
        };
        window.addEventListener('DOMContentLoaded',init,false);
    }
});
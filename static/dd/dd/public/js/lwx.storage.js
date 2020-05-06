/**
 * 客户端存储
 *  长久存储
 * lwx.storage.setItem(key, value[, prefix])  存储数据（键，值[，前缀]）
 * lwx.storage.gettItem(key[, prefix])        获取存储数据（键[，前缀]）
 * lwx.storage.removeItem(key[, prefix])      删除存储数据（键[，前缀]）
 *  临时存储(会话)
 * lwx.storage.setSession(key, value[, prefix])  存储数据（键，值[，前缀]）
 * lwx.storage.getSession(key[, prefix])         获取存储数据（键[，前缀]）
 * lwx.storage.removeSession(key[, prefix])      删除存储数据（键[，前缀]）
 * 用法：引入即可使用，如上
 * @author 鹿文学
 */
;(function(window) {

  var lwx = window.lwx || {};

  function setCookie(key,value) {
    var time = new Date;
    time.setTime(time.getTime() + 31536e6),
    document.cookie = key + "=" + escape(value) + ";expires=" + time.toGMTString()
  }

  function getCookie(key) {
    var value = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
    return null != value ? unescape(value[2]) : null
  }

  function removeCookie(key) {
    var time = new Date;
    time.setTime(time.getTime() - 1);
    var value = lwx.storage.getItem(key);
    null != value && (document.cookie = key + "=" + value + ";expires=" + time.toGMTString())
  }

  function setKey(key,prefix) {
    if(!prefix) {prefix = 'lwx_'}
    return prefix + key;
  }

  lwx.storage = {
    setItem: function(key,value,prefix) {
      if(window.localStorage) {
        try{
          window.localStorage.setItem(setKey(key,prefix),value);
        } catch(e) {}
      } else 
        setCookie(setKey(key,prefix), value);
    },
    getItem: function(key,prefix) {
      if (window.localStorage)
          return window.localStorage.getItem(setKey(key,prefix));
      else
        getCookie(setKey(key,prefix));
    },
    removeItem: function(key,prefix) {
      if (window.localStorage)
          window.localStorage.removeItem(setKey(key,prefix));
      else 
        removeCookie(setKey(key,prefix));
    },
    setSession: function(key, value, prefix) {
      window.sessionStorage && window.sessionStorage.setItem(setKey(key,prefix), value)
    },
    getSession: function(key,prefix) {
      return window.sessionStorage ? window.sessionStorage.getItem(setKey(key,prefix)) : null
    },
    removeSession: function(key,prefix) {
      window.sessionStorage && window.sessionStorage.removeItem(setKey(key,prefix))
    }

  };

  window.lwx = lwx;

})(window);
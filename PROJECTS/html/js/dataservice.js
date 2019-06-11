(function() {
  var serverUrl = 'http://demo.huhuiyu.top/projectsdataservice';
  var serverTokenKey = 'server.token';
  var DarkKnight = {};
  DarkKnight.ajax = {};

  DarkKnight.ajax.send = function(url, param, cd) {
    var senurl = serverUrl + url;
    //传送token信息
    param.token = localStorage.getItem(serverTokenKey);
    //避免缓存，传递时间戳
    param.timestamp = new Date().getTime();
    $.ajax({
      url: senurl,
      data: param,
      method: 'POST',
      dataType: 'json'
    }).done(function(data) {
      //需要保存服务器端的token
      if (data.token) {
        localStorage.setItem(serverTokenKey, data.token);
      }
      //回调
      cd(data);
    });
  };
  //判断json是不是一个json对象
  DarkKnight.isJson = function(json) {
    //1：必须存在 2：类型要是object. 3:不能有长度属性
    //4：转成字符串是object
    return json && typeof json == 'object' && !json.length && Object.prototype.toString.call(json).toLowerCase() == '[object object]';
  };
  //将多级别json转化为一级json
  DarkKnight.jsonToFlat = function(json) {
    if (!DarkKnight.isJson(json)) {
      return json;
    }
    return funJsonToFlat(json, '');
  };
  //递归方法实现多级json转换一级json
  //第一个参数是要转换的json,第二个参数是基础的json名称
  //第三个参数是json处理结果
  function funJsonToFlat(json, baseName, outjson) {
    if (!outjson) {
      outjson = {};
    }
    //key in json
    //例如json 是{'abc':'123','def':'afadfd'}
    //key就是abc,def
    //json获取key对应的值方法
    //json.abc的到的就是123
    //json['abc']也可以
    //递归
    for (var key in json) {
      console.log(key);
      //获取值
      var value = json[key];
      //如果值是json,就要递归处理
      var keyname = baseName ? baseName + '.' + key : key;
      if (DarkKnight.isJson(value)) {
        funJsonToFlat(value,keyname, outjson);
      } else {
        outjson[keyname] = value;
      }
    }
    return outjson;
  }
//转换json到表单的url编码
  DarkKnight.jsonToDeepLink=function(json){
    json=funJsonToFlat(json,'');
    var result='';
    for(var key in json){
       result+='&'+key+'='+encodeURI(json[key]);
    }
    result=result.replace('&','');
    return result;
  }
  
  window.DarkKnight = DarkKnight;
})();

(function() {
  var huhuiyu = {};

  huhuiyu.isJson = function(json) {
    //1：必须存在 2：类型要是object. 3:不能有长度属性
    //4：转成字符串是object
    return json && typeof json == 'object' && !json.length && Object.prototype.toString.call(json).toLowerCase() == '[object object]';
  };
  //将json转换成查询字符串
  huhuiyu.jsonToQs = function(json) {
    if (!huhuiyu.isJson(json)) {
      return json;
    }
    return jsonToQueryString(json, '');
  };
  function jsonToQueryString(json, baseName) {
    var qs = '';
    for (var key in json) {
      var keyname = baseName ? baseName + '.' + key : key;
      var value = json[key];
      if (huhuiyu.isJson(value)) {
        qs += '&' + jsonToQueryString(value, keyname);
      } else {
        qs += '&' + keyname + '=' + encodeURI(value);
      }
    }
    qs = qs.replace('&', '');
    return qs;
  }
  //ajax是js技术词汇,表示异步的js和xml,通过浏览器的XMLHttpRequest
  //对象完成js访问后端数据，现代浏览器Promise, fetch来完成相同的任务
  //js,后端数据请求的url,请求的数据，应答回来的结果
  var serverUrl = 'http://demo.huhuiyu.top/projectsdataservice/';
  var serverTokenKey='server.token';

  //发送axios的ajax请求
  huhuiyu.send = function(url, params, cd) {
    var token = localStorage.getItem(serverTokenKey);
    var ts = new Date().getTime();
    params.token = token;
    params.timestamp = ts;
    //转换json为查询字符串
    var qs = huhuiyu.jsonToQs(params);
    var sendurl = serverUrl + url;
    axios
      .post(sendurl, qs)
      .then(function(resp) {
        //处理token保存
        var data = resp.data;
        if (data && data.token) {
          localStorage.setItem(serverTokenKey, data.token);
        }
        cd(data);
      })
      .catch(function(error) {
        console.log(error);
        cb({ code: 500, message: '服务器错误', err: error });
      });
  };

  window.huhuiyu = huhuiyu;
})();

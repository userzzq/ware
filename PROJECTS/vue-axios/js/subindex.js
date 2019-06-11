(function() {
  var app = new Vue({
    el: '#app',
    data: {
      list:[]
    },
    methods: {
      back: back,
      toinfo: toinfo
    }
  });
  function back() {
    location = 'teachindex.html';
  }
  function getTtid() {
    // 获取查询字符串中ttid
    var url = location.href;
    console.log(url);
    //?后面是查询字符串
    if (url.indexOf('?') == -1) {
      //没有查询字符串就返回0
      return 0;
    }
    url = url.substr(url.indexOf('?') + 1);
    console.log(url);
    //&符号是多个查询参数的分割符
    //abc&def&dfdf
    //[abc,def,dfdf]
    //ttid=1&tstid=2&tstid=3&ttid=3
    //ttid=1
    //tstid=2
    //tstid=3
    //ttid=3
    //application program interface api应用程序编程接口
    var params = url.split('&');
    //abcaacabbc a ab
    //abbcababcabbbc
    for (var i = 0; i < params.length; i++) {
      var param = params[i];
      console.log(param);
      //ttid=100
      //1100
      if (param.substr(0, 5) == 'ttid=') {
        return param.replace('ttid=', '');
      }
    }
    console.log(params.join('&'));
  }

  var ttid = getTtid();
  console.log(ttid);

  function toinfo(d) {
    location = 'infoindex.html?ttid=' + ttid + '&tstid=' + d.tstid;
  }
  function query() {
    huhuiyu.send(
      '/teachsubtype/queryByType',
      {
        'tbTeachSubtype.ttid': ttid
      },
      function(data) {
        console.log(data);
        if (!data.success) {
          alert(data.message);
          return;
        }
        app.list = data.datas.list;
      }
    );
  }
  query();
})();

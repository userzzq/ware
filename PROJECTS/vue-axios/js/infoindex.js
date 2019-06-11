(function() {
  console.log('in infoindex.js');

  var url = location.href;
  var index = url.indexOf('?');
  if (index < 0) {
    location = 'teachindex.html';
    return;
  }
  url = url.substr(index + 1);
  var params = url.split('&');
  var ttid;
  var tstid;
  var tstidKey = 'tstid=';
  var ttidKey = 'ttid=';
  for (var i = 0; i < params.length; i++) {
    var param = params[i];
    if (param.indexOf(tstidKey) == 0) {
      tstid = param.substr(tstidKey.length);
    }
    if (param.indexOf(ttidKey) > -1) {
      ttid = param.substr(ttidKey.length);
    }
  }
  console.log(tstid, ttid);

  var app = new Vue({
    el: '#app',
    data: {
      list: [],
      config: {}
    },
    methods: {
      back: back
    }
  });

  function back() {
    location = 'subindex.html?ttid=' + ttid;
  }

  function query() {
    huhuiyu.send(
      '/teachinfo/queryBySubtype',
      {
        'tbTeachInfo.tstid': tstid
      },
      function(data) {
        console.log(data);
        if (!data.success) {
          alert(data.message);
          return;
        }
        app.list = data.datas.list;
        app.config = data.datas.config;
      }
    );
  }

  query();
})();

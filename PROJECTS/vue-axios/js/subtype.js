(function() {
  var app = new Vue({
    el: '#app',
    data: {
      page: { pageNumber: 1, pageSize: 5 },
      tbTeachSubtype: { ttid: -1 },
      types: [],
      list: [],
      pages: [2, 5, 10, 20, 50, 100],
      inmodify: false
    },
    methods: {
      query: query,
      showtime: showtime,
      showTypeName: showTypeName,
      resize: resize,
      topage: topage,
      add: add,
      toModify: toModify,
      modify: modify,
      cancel: cancel,
  
    }
  });
  function modify() {
    huhuiyu.send('/auth/teachsubtype/update', { tbTeachSubtype: app.tbTeachSubtype }, function(data) {
      alert(data.message);
      if (data.success) {
        cancel();
        query();
      }
    });
  }
  function toModify(d) {
    app.inmodify = true;
    app.tbTeachSubtype = huhuiyu.copy(d);
  }
  function cancel() {
    app.inmodify = false;
    app.tbTeachSubtype = { ttid: -1 };
  }
  function add() {
    huhuiyu.send('/auth/teachsubtype/add', { tbTeachSubtype: app.tbTeachSubtype }, function(data) {
      alert(data.message);
      if (data.success) {
        app.tbTeachSubtype = { ttid: -1 };
        query();
      }
    });
  }
  function cancel() {
    app.inmodify = false;
    app.tbTeachSubtype = { ttid: -1 };
  }
  function resize() {
    app.page.pageNumber = 1;
    query();
  }

  function topage(pn) {
    if (pn <= 0 || pn > app.page.pageCount || pn == app.page.pageNumber) {
      return;
    }
    app.page.pageNumber = pn;
    query();
  }

  function showTypeName(ttid) {
    for (var i = 0; i < app.types.length; i++) {
      var type = app.types[i];
      if (ttid == type.ttid) {
        return type.typeName;
      }
    }
    return '';
  }

  function showtime(time) {
    var date = new Date();
    date.setTime(time);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  function query() {
    huhuiyu.send(
      '/auth/teachsubtype/queryAll',
      {
        page: app.page
      },
      function(data) {
        if (data.success) {
          app.page = data.datas.page;
          app.list = data.datas.list;
          app.types = data.datas.types;
          // app.tbTeachSubtype.ttid = app.types[0].ttid;
          return;
        }
        alert(data.message);
      }
    );
  }

  query();
})();

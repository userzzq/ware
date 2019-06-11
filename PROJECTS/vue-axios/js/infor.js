(function() {
  var app = new Vue({
    el: '#app',
    data: {
      pages: [2, 5, 10, 20, 50, 100],
      page: { pageNumber: 1, pageSize: 5 },
      list: [],
      inadd: false,
      inmodify: false,
      types: [],
      subtypes: [],
      infotypes: [],
      formdata: {
        tbTeachInfo: {},
        ttid: 0
      }
    },
    methods: {
      resize: resize,
      topage: topage,
      queryAddBaseInfo: queryAddBaseInfo,
      changeType: changeType
    }
  });
  function changeType() {
    huhuiyu.send('/teachsubtype/queryByType', { 'tbTeachSubtype.ttid': app.formdata.ttid }, function(data) {
      console.log(data);
      if (!data.success) {
        alert(data.message);
        return;
      }
      app.subtypes = data.datas.list;
      if (app.subtypes && app.subtypes.length > 0) {
        app.formdata.tbTeachInfo.tstid = app.subtypes[0].tstid;
      }
    });
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

  function query() {
    huhuiyu.send('/auth/teachinfo/queryAll', { page: app.page }, function(data) {
      if (data.success) {
        app.page = data.datas.page;
        app.list = data.datas.list;
        return;
      }
      alert(data.message);
    });
  }
  query();
  function queryAddBaseInfo() {
    huhuiyu.send('/auth/teachinfo/queryAddBaseInfo', {}, function(data) {
      console.log(data);
      if (data.success) {
        app.types = data.datas.types;
        app.formdata.ttid = app.types[0].ttid;
        app.infotypes = data.datas.infotypes;
        app.inadd = true;
        changeType();
        return;
      }
      app.inadd = false;
      alert(data.message);
    });
  }
})();

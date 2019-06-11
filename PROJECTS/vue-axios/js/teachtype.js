(function() {
  console.log('in teachtype.js...');

  var app = new Vue({
    el: '#app',
    data: {
      page: { pageNumber: 1, pageSize: 5 },
      types: [],
      tbTeachType: {},
      modify: false,
      pages: [2, 5, 10, 20, 50, 100]
    },
    computed: {},
    methods: {
      showtime: function(time) {
        var date = new Date();
        date.setTime(time);
        return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      },
      addType: addType,
      showModify: function(type) {
        this.tbTeachType = huhuiyu.copy(type);
        this.modify = true;
      },
      hideModify: function() {
        this.tbTeachType = {};
        this.modify = false;
      },
      modifyType: modifyType,
      topage: topage,
      resize: resize
    }
  });

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

  function modifyType() {
    huhuiyu.send(
      '/auth/teachtype/update',
      {
        tbTeachType: app.tbTeachType
      },
      function(data) {
        alert(data.message);
        if (data.success) {
          app.hideModify();
          query();
        }
      }
    );
  }

  function addType() {
    huhuiyu.send(
      '/auth/teachtype/add',
      {
        tbTeachType: app.tbTeachType
      },
      function(data) {
        alert(data.message);
        if (data.success) {
          app.tbTeachType = {};
          query();
        }
      }
    );
  }

  //数据查询
  function query() {
    huhuiyu.send(
      '/auth/teachtype/queryAll',
      {
        page: app.page
      },
      function(data) {
        console.log(data);
        if (!data.success) {
          alert(data.message);
          return;
        }
        app.types = data.datas.list;
        app.page = data.datas.page;
      }
    );
  }

  query();
})();

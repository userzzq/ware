(function() {
  var app = new Vue({
    el: '#app',
    data: {
      types: []
    },
    methods: {
      tosub: tosub
    }
  });
  function tosub(t) {
    location = 'subindex.html?ttid=' + t.ttid;
  }

  function query() {
    huhuiyu.send('/teachtype/queryAll', {}, function(data) {
      if (data.success) {
        app.types = data.datas.list;
        return;
      }
      alert(data.message);
    });
  }
  query();
})();

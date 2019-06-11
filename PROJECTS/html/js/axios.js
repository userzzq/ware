(function() {
  console.log('in vue.js...');
  var jsonObj = {
    tbAdmin: {
      username: '王五',
      password: 'abc-123',
      dept: {
        deptId: 10000,
        deptName: '开发部'
      }
    }
  };
  console.log(huhuiyu.jsonToQs(jsonObj));
  huhuiyu.send('/', { echo: '测试' }, function(data) {
    console.log(data);
  });
  var app = new Vue({
    //el是绑定指定元素为vue的app
    el: '#vueapp',
    //data是页面数据绑定
    data: {
      title: 'vue+axios整合',
      echo: ''
    },
    //methods是页面事件
    methods: {
      showTitle: function() {
        alert(this.title);
      },
      ajax: function() {
        //websocket
        axios
          .post('http://demo.huhuiyu.top/projectsdataservice/', 'echo=' + this.echo)
          .then(function(resp) {
            console.log(resp);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  });
})();

(function() {
  console.log('in Hello vue...');
  var app = new Vue({
    el: '#app',
    data: {
      tbAdmin: {
        username: '',
        password: ''
      },
      error: '',
      inaction: false
    },
    methods: {
      reset: function() {
        //重置按钮,vue自生的体系会自动重置this关键，指向的是vue对象
        //this.可以直接访问data定义的对象，和methods中定义的方法
        //但是如果是执行了回调函数，this对象就不再是vue对象
        //这个时候需要用vue的实例对象名称访问
        this.tbAdmin.username = '';
        this.tbAdmin.password = '';
      },
      login: function() {
        this.error = '';
        //登录
        if (this.inaction) {
          this.error = '登录中。。。';
          return;
        }
        //状态切换成正在登录
        this.inaction = true;
        if (!this.tbAdmin.username) {
          this.error = '用户名必须填写...';
          this.inaction = false;
          return;
        }
        if (!this.tbAdmin.password) {
          this.error = '密码必须填写...';
          this.inaction = false;
          return;
        }
        this.tbAdmin.password = huhuiyu.md5(this.tbAdmin.password);
        huhuiyu.send('/TbAdmin/login', { tbAdmin: this.tbAdmin }, function(data) {
          app.tbAdmin.password = '';
          if (data.success) {
            // alert('登录成功');
            location='main.html';
            return;
          }
          app.error = data.message;
        });
      }
    }
  });
})();

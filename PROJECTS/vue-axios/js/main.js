(function() {
  console.log('in main js....');

  var app = new Vue({
    el: '#app',
    data: {
      adminuser: {},
      menu: {},
      menus:[]
    },
    methods: {
      logout: logout,
      changeMenu: changeMenu
      // logout: function() {
      //   huhuiyu.send('/TbAdmin/logout', {}, function(data) {
      //     alert('确认退出？');
      //     location = 'login.html';
      //   });
      // }
    }
  });
  //切换菜单
  app.menus = [
    {
      text:'欢迎界面',
      page:'welcome.html'
    },
    {
      text:'分类管理',
      page: 'teachtype.html'
    },{
      text:'小类管理',
      page:'subtype.html'
    },{
      text:'中类管理',
      page:'teachindex.html'
    },{
      text:'信息管理',
      page:'infor.html'
    }
  ];
  function changeMenu(menu) {
    app.menu = menu;
  }
  changeMenu(app.menus[0])
  //安全退出
  function logout() {
    huhuiyu.send('/TbAdmin/logout', {}, function(data) {
      alert('确认退出?');
      location = 'login.html';
    });
  }
  //获取登录用户信息
  function queryUserInfo() {
    huhuiyu.send('/TbAdmin/getAdminInfo', {}, function(data) {
      console.log(data);
      // //如果获取数据不成功
      // if (!data.success || !data.datas || !data.datas.admin) {
      //   alert('需要登录 ！');
      //   location = 'login.html';
      //   return;
      // }
      app.adminuser = data.datas.admin;
    });
  }
  queryUserInfo();
})();

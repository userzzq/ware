var serverUrl = 'http://demo.huhuiyu.top/projectsdataservice';
(function() {
  console.log('in jq.js...');

  function login() {
    var url = serverUrl + '/TbAdmin/login';

    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        'tbAdmin.username': 'test',
        'tbAdmin.password': huhuiyu.md5('123456'),
        token:localStorage.getItem('server.token')
      },
      method: 'POST'
    }).done(function(data) {
      console.log(data);
       //如果token存在就保存浏览器本地存储
       if (data.token) {
        localStorage.setItem('server.token', data.token);
      }
    });
  }
  login();
  function getUserInfo() {
    var url = serverUrl + '/TbAdmin/getAdminInfo';

    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        token:localStorage.getItem('server.token')
      },
      method: 'POST'
    }).done(function(data) {
      console.log(data);
      if (data.token) {
        localStorage.setItem('server.token', data.token);
      }
    });
  }
  getUserInfo();
})();

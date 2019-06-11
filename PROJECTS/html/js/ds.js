(function() {
  console.log('in jq-dataservice...',DarkKnight);
  var jsonObj = {};
  var dateObj = new Date();
  var strObj = 'df';
  var arrayObj = [{ abc: '123' }];
  console.log(typeof jsonObj);
  console.log(typeof dateObj);
  console.log(typeof strObj);
  console.log(typeof arrayObj);
  console.log('======================');
  console.log(jsonObj.toString());
  console.log(dateObj.toString());
  console.log(strObj.toString());
  console.log(arrayObj.toString());
  console.log('======================');
  console.log(jsonObj.lenght);
  console.log(arrayObj.length);
  console.log('======================');
  console.log(DarkKnight.isJson(jsonObj));
  console.log(DarkKnight.isJson(dateObj));
  console.log(DarkKnight.isJson(strObj));
  console.log(DarkKnight.isJson(arrayObj));
  console.log(DarkKnight.isJson(null));
  console.log(DarkKnight.isJson(undefined));
  console.log(DarkKnight.isJson());

  $('#btnLogin').click(function() {
    $('#divReult').html('登录查询中。。。');
    DarkKnight.ajax.send(
      '/TbAdmin/login',
      {
        'tbAdmin.username': 'test',
        'tbAdmin.password': huhuiyu.md5('123456')
      },
      function(data) {
        $('#divResult').html(JSON.stringify(data, null, 4));
      }
    );
  });

  $('#btnUserinfo').click(function() {
    $('#divReult').html('获取用户信息中。。。');
    DarkKnight.ajax.send(
      '/TbAdmin/getAdminInfo',
      {
        'tbAdmin.username': 'test',
        'tbAdmin.password': huhuiyu.md5('123456')
      },
      function(data) {
        $('#divResult').html(JSON.stringify(data, null, 4));
      }
    );
  });

  $('#btnLogout').click(function() {
    $('#divReult').html('退出查询中。。。');
    DarkKnight.ajax.send('/TbAdmin/logout', {}, function(data) {
      $('#divResult').html(JSON.stringify(data, null, 4));
    });
  });
  var model={
    tbAdmin:{
      username:'张 三',
      password:'abc-123',
      dept:{
        deptId:1
      }
    }
  };

  console.log('json转换=====================================');
  var flatJson=DarkKnight.jsonToFlat(model);
  console.log('转换后的json',flatJson);
  console.log('json转换url:',DarkKnight.jsonToDeepLink(model));
})();

(function() {
  console.log('in index.js');
  var txtUsername = document.getElementById('txtUsername');
  var txtPassword = document.getElementById('txtPassword');
  var btnLogin = document.getElementById('btnLogin');
  btnLogin.addEventListener('click', function() {
    var username = txtUsername.value;
    var password = txtPassword.value;
    if (password == '') {
      alert('密码必须填写');
      return;
    }
    password = huhuiyu.md5(password);
    console.log('密码:', password);
    //js内置ajax请求对象
    var xhr = new XMLHttpRequest();
    //监听状态
    xhr.onreadystatechange = function() {
      //4表示请求已经准备完毕
      if(xhr.readyState===4){
        //status是请求结果的状态码
         if (xhr.status==200) {
           //responseText是应答的结果
           console.log(xhr.responseText);
         }
      }else{
        console.log(xhr.readyState,'---',xhr.status);
      }
    };
  });
})();

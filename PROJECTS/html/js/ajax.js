var serverUrl = 'http://demo.huhuiyu.top/projectsdataservice';
(function() {
  var txtEcho = document.getElementById('txtEcho');
  var btnAjaX = document.getElementById('btnAjaX');

  btnAjaX.addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    //监听状态
    xhr.onreadystatechange = function() {
      //4表示请求已经准备完毕
      if (xhr.readyState === 4) {
        //status是请求结果的状态码
        if (xhr.status == 200) {
          //responseText是应答的结果
          console.log(xhr.responseText);
          //转换文本为json对象
          console.log(JSON.parse(xhr.responseText));
        }
      } else {
        console.log(xhr.readyState, '---', xhr.status);
      }
    };
    //开启请求，第一个参数是请求模式，一般是get和post
    //第二个是请求地址
    xhr.open('POST', serverUrl + '/');
    //设置发送数据的类型urlencoded表示表单url编码
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //发送请求，get请求不用发送参数
    xhr.send('echo=' + txtEcho.value);
  });
})();

//jquery版本
$(function() {
  console.log('in jquery...');
  var txtEcho = $('#txtEcho');
  var btnJq = $('#btnJq');
  btnJq.click(function() {
    $.ajax({
      url: serverUrl + '/',
      dataType: 'json',
      method: 'POST',
      data: { echo: txtEcho.val() }
    }).done(function(data) {
      console.log(data);
    });
  });
});

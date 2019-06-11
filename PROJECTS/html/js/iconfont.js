(function(){
  console.log('in iconfont.js...');
  var divIconfont=document.getElementById('divIconfont');
  var icons=['&#xe678;','&#xe603;','&#xe613;','&#xe63d;','&#xe653;'];
  for(var i=0; i<icons.length; i++){
    var eleSpan=document.createElement('span');
    eleSpan.classList.add('iconfont');
    eleSpan.innerHTML=icons[i];
    //<span class="iconfont">&#xe678;</span>
    divIconfont.append(eleSpan);
    //=================================
    eleSpan=document.createElement('span');
    eleSpan.innerText=icons[i];
    divIconfont.append(eleSpan);
  }
})();
function swap_spoiler_states(obj){
  var div=obj.getElementsByTagName('div');
  if(div[0]){
    if(div[0].style.visibility=="visible"){
      div[0].style.visibility='hidden';
    }
    else if(div[0].style.visibility=="hidden" || !div[0].style.visibility){
      div[0].style.visibility='visible';
    }
  }
}

$(window).scroll(function(e){
  parallax();
});
function parallax(){
  var scrolled = $(window).scrollTop();
  $('h3.game').css('background-position-y',50-(scrolled*0.11)+'%');
}

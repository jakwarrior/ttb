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

function swap_spoiler_states(obj){
  var div=obj.getElementsByTagName('div');
  if(div[0]){
    if(div[0].style.visibility === "visible"){
      div[0].style.visibility = 'hidden';
    }
    else if(div[0].style.visibility === "hidden" || !div[0].style.visibility){
      div[0].style.visibility = 'visible';
    }
  }
}

function parallax(){
  var scrolled = $(window).scrollTop();
  $('h3.game').css('background-position-y',50-(scrolled*0.11)+'%');
}

$(window).scroll(function(e){
  parallax();
});

function stickIt() {

  var orgElementPos = $('.original').offset();
  var orgElementTop = orgElementPos.top;

    if ($(window).scrollTop() >= (572 - 120)) {
        $('#header').addClass('noshadow');

    }
    else {
        $('#header').removeClass('noshadow');

    }

  if ($(window).scrollTop() >= (572 - 110)) {
    // scrolled past the original position; now only show the cloned, sticky element.

    // Cloned element should always have same left position and width as original element.
    //orgElement = $('.original');
    //coordsOrgElement = orgElement.offset();
    //leftOrgElement = coordsOrgElement.left;
    //widthOrgElement = orgElement.css('width');

    $('.cloned').show();
    $('.original').css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility','visible');

  }
}

$(document).ready(function()
{

    // Create a clone of the menu, right next to original.
    $('.header_menu').addClass('original').clone().insertAfter('.header_menu').addClass('cloned').removeClass('original').hide();

    var scrollIntervalID = setInterval(stickIt, 10);
});

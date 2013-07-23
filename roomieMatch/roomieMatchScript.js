window.answerSlider = new Swipe(document.getElementById('roomieSlider'), {
  startSlide: 0,
  speed: 400,
  //auto: 9000000000000,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
  callback: function(index, elem) {},
  transitionEnd: function(index, elem) {}
});
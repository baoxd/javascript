/*
	throttle: 节流函数
*/
// 简化版
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, timer;
  return function () {
  	var context = scope || this;
  	var now = +new Date,
  	    args = arguments;
  	if (last && now < last + threshhold) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
  	} else {
  	  last = now;
  	  fn.apply(context, args);
  	}
  }
}

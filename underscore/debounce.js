/*
	debounce: 防抖动函数 和throttle（节流函数）还是有区别的
*/

// 简化版
function debounce(fn, delay){
  var timer = null;
  return function () {
  	var context = this, args = arguments;
  	clearTimeout(timer);
  	timer = setTimeout(function () {
      fn.apply(context, args);
  	}, delay);
  }
}

// underscore的实现
function _debounce(func, wait, immediate) {
  var timout, args, context, timestamp, result;

  var later = function() {
  	var last = Date.now() - timestamp;

  	if (last < wait && last >= 0){
  	  timestamp = setTimeout(later, wait - last);
  	} else {
  	  timout = null;
  	  if (!immediate) {
  	    result = func.apply(context, args);
  	    if (!timout) context = args = null; 
  	  }
  	}
  }
  return function() {
  	context = this;
  	args = arguments;
  	timestamp = Date.now();
  	var callNow = immediate && !timout;
  	if (!timout) {
  	  timout = setTimeout(later, wait);
  	}
  	if (callNow) {
      result = func.apply(context, args);
      context = args = null;
  	}
  	return result;
  }
}


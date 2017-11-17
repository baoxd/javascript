/**
	修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。
*/

var counter = 0;

var add = function () {
  counter++;
};

@add
function foo() {
}

/**
	上面的代码，意图是执行后counter等于 1，但是实际上结果是counter等于 0。因为函数提升，使得实际执行的代码是下面这样。
*/
@add
function foo() {
}

var counter;
var add;

counter = 0;

add = function () {
  counter++;
};

/**
	下面是另一个例子。
*/
var readOnly = require("some-decorator");

@readOnly
function foo() {
}

/**
	上面代码也有问题，因为实际执行是下面这样。
*/
var readOnly;

@readOnly
function foo() {
}

readOnly = require("some-decorator");

/**
	总之，由于存在函数提升，使得修饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。

	另一方面，如果一定要修饰函数，可以采用高阶函数的形式直接执行
*/

function doSomething(name) {
  console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

const wrapped = loggingDecorator(doSomething);
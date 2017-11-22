// http://javascript.ruanyifeng.com/stdlib/arraybuffer.html

// 下面的函数可以用来判断，当前视图是小端字节序，还是大端字节序。
const BIG_ENDIAN = Symbol('BIG_ENDIAN');
const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

function getPlatformEndianness() {
  let arr32 = Uint32Array.of(0x12345678);
  let arr8 = new Uint8Array(arr32.buffer);
  switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) + (arr8[3])) {
    case 0x12345678:
      return BIG_ENDIAN;
    case 0x78563412:
      return LITTLE_ENDIAN;
    default:
      throw new Error('Unknown endianness');
  }
}

// ArrayBuffer转为字符串，参数为ArrayBuffer对象
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// node的buffer转为arraybuffer
function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

// arraybuffer转为Buffer
function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}

//将String字符串转换成Blob对象
var blob = new Blob(["Hello World!"], {
    type: 'text/plain'
});
console.info(blob);
console.info(blob.slice(1, 3, 'text/plain'));

// 将TypeArray  转换成 Blob 对象
var array = new Uint16Array([97, 32, 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33]);
//测试成功
//var blob = new Blob([array], { type: "application/octet-binary" });
//测试成功， 注意必须[]的包裹
var blob = new Blob([array]);
//将 Blob对象 读成字符串
var reader = new FileReader();
reader.readAsText(blob, 'utf-8');
reader.onload = function (e) {
    console.info(reader.result); //a Hello world!
}

// ArrayBuffer转Blob
var buffer = new ArrayBuffer(32);
var blob = new Blob([buffer]);       // 注意必须包裹[]

// 将Blob对象转换成String字符串，使用FileReader的readAsText方法
//将字符串转换成 Blob对象
var blob = new Blob(['中文字符串'], {
    type: 'text/plain'
});
//将Blob 对象转换成字符串
var reader = new FileReader();
reader.readAsText(blob, 'utf-8');
reader.onload = function (e) {
    console.info(reader.result);
}


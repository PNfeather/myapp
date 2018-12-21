// 缓存代理模式核心
let proxyFactory = function (fn) {
  let cache = {};
  return function () {
    let args = Array.prototype.join.call(arguments, ',');
    if (args in cache) return cache[args];
    return (cache[args] = fn.apply(this, arguments));
  };
};

export default proxyFactory;

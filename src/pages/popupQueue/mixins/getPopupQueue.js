let getpopupQueueArray = (current) => { // 找到含有popupQueueArray数组属性的父级vue实例，并返回该数组
  if (current.popupQueueArray) return current.popupQueueArray;
  if (current.$parent) return getpopupQueueArray(current.$parent);
  return console.log('给父元素添加queueWatchMixins');
};

export default {getpopupQueueArray};

export {getpopupQueueArray};

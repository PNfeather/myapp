export const resetStorage = () => {
  Object.getPrototypeOf(localStorage).__setToggle__ = false;
  const resetFun = (oldFun) => {
    return function () {
      if (Object.getPrototypeOf(localStorage).__setToggle__ === false) {
        console.warn('请在/src/tools/localStorage/data中注入缓存变量');
      } else {
        Object.getPrototypeOf(localStorage).__setToggle__ = false;
        return oldFun.apply(this, arguments);
      }
    };
  };
  Object.getPrototypeOf(localStorage).setItem = resetFun(Object.getPrototypeOf(localStorage).setItem);
};

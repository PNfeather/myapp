let strategies = {
  isNotEmpty: function (val, errorMsg) {
    if (errorMsg[0] == '@') errorMsg = errorMsg.split('@')[1] + '不能为空';
    if (val === '') {
      return errorMsg;
    }
  },
  minLength: function (val, len, errorMsg) {
    if (errorMsg[0] == '@') errorMsg = errorMsg.split('@')[1] + '长度不能小于' + len + '位';
    if (val.length < len) {
      return errorMsg;
    }
  },
  isPhone: function (val, errorMsg) {
    if (errorMsg[0] == '@') errorMsg = '手机号码格式不正确';
    if (!/(^[1][3|5|8][0-9]{9}$)/.test(val)) {
      return errorMsg;
    }
  }
};

let Validator = function () {
  this.cache = [];
};

Validator.prototype.add = function (val, rules) {
  let self = this;
  for (let i = 0; i < rules.length; i++) {
    (function (rule) {
      let strategyArr = rule.strategy.split('-');
      let errorMsg = rule.errorMsg;

      self.cache.push(function () {
        let strategy = strategyArr.shift();
        strategyArr.unshift(val);
        strategyArr.push(errorMsg);
        return strategies[strategy].apply(null, strategyArr);
      });
    })(rules[i]);
  }
};

Validator.prototype.start = function () {
  let cache = this.cache;

  for (let i = 0; i < cache.length; i++) {
    let errorMsg = cache[i]();
    if (errorMsg) return errorMsg;
  }
};

export default Validator;

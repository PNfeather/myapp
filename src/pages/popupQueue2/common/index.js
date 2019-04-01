import _ from '@/plugins/lodash';

let changeTargetAttr = function (current, target, attr, val) {
  if (!current) return (console.log('无效目标'));
  if (current.$options.name === target) {
    current[attr] = val;
  }
  if (current.$children) {
    _.forEach(current.$children, (item) => {
     return changeTargetAttr(item, target, attr, val);
    });
  }
};

export {changeTargetAttr};

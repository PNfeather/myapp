import _lodash from 'lodash';

// 将lodash常用方法封装到_里面
var _ = {};
_.merge = _lodash.merge;
_.drop = _lodash.drop;
_.forEach = _lodash.forEach;
_.map = _lodash.map;
_.extend = _lodash.extend;
_.debounce = _lodash.debounce;
_.throttle = _lodash.throttle;
_.uniq = _lodash.uniq;
_.chain = _lodash.chain;
_.partition = _lodash.partition;
_.find = _lodash.find;
_.isEmpty = _lodash.isEmpty;
_.clone = _lodash.clone;
_.findIndex = _lodash.findIndex;
_.groupBy = _lodash.groupBy;
_.mapKeys = _lodash.mapKeys;
_.mapValues = _lodash.mapValues;
_.omit = _lodash.omit;
_.remove = _lodash.remove;
_.zipWith = _lodash.zipWith;
_.cloneDeep = _lodash.cloneDeep;
_.filter = _lodash.filter;
_.minBy = _lodash.minBy;
export default _;

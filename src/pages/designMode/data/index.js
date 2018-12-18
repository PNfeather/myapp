import adapterMode from '../children/adapterMode';
import agentMode from '../children/agentMode';
import combinationMode from '../children/combinationMode';
import decorateMode from '../children/decorateMode';
import flyweightPatternMode from '../children/flyweightPatternMode';
import intermediaryMode from '../children/intermediaryMode';
import iterationMode from '../children/iterationMode';
import orderMode from '../children/orderMode';
import publishSubscriptionMode from '../children/publishSubscriptionMode';
import responsibilityMode from '../children/responsibilityMode';
import singleRowMode from '../children/singleRowMode';
import statusMode from '../children/statusMode';
import tacticsMode from '../children/tacticsMode';
import templateMode from '../children/templateMode';

export const config = [
  {
    name: 1,
    label: '单列模式',
    template: singleRowMode
  }, {
    name: 2,
    label: '策略模式',
    template: tacticsMode
  }, {
    name: 3,
    label: '代理模式',
    template: agentMode
  }, {
    name: 4,
    label: '迭代器模式',
    template: iterationMode
  }, {
    name: 5,
    label: '发布-订阅模式',
    template: publishSubscriptionMode
  }, {
    name: 6,
    label: '命令模式',
    template: orderMode
  }, {
    name: 7,
    label: '单列模式',
    template: combinationMode
  }, {
    name: 8,
    label: '模板模式',
    template: templateMode
  }, {
    name: 9,
    label: '享元模式',
    template: flyweightPatternMode
  }, {
    name: 10,
    label: '职责链模式',
    template: responsibilityMode
  }, {
    name: 11,
    label: '中介者模式',
    template: intermediaryMode
  }, {
    name: 12,
    label: '装饰者模式',
    template: decorateMode
  }, {
    name: 13,
    label: '状态模式',
    template: statusMode
  }, {
    name: 14,
    label: '适配器模式',
    template: adapterMode
  }
];

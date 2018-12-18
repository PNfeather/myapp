import router from '@/router';
import Vue from 'vue';
export const rightBtnConfig = [
  {
    'text': '指令测试页',
    'fun': () => {
      router.push({'path': '/directTestPage'});
    }
  },
  {
    'text': 'BscrollTabs测试页',
    'fun': () => {
      router.push({'path': '/BscrollTabsTestPage'});
    }
  },
  {
    'text': 'tabs测试页',
    'fun': () => {
      router.push({'path': '/tabsTestPage'});
    }
  },
  {
    'text': 'tabs点击切换测试',
    'fun': () => {
      router.push({'path': '/clickTabsTestPages'});
    }
  },
  {
    'text': '设计模式',
    'fun': () => {
      router.push({'path': '/designMode'});
    }
  },
  {
    'text': 'dom测试页',
    'fun': () => {
      router.push({'path': '/testDom'});
    }
  },
  {
    'text': '待配置跳转',
    'fun': () => {
      Vue.$toast('该页待配置');
    }
  }
];

<template>
    <app-page id='test-dom'>
      <app-header :title='title'></app-header>
    </app-page>
</template>

<script>
  import formatNum from './common/formatNum';
  import {LinkedList} from '@/tools/linkedList/linkedList';
  import {Queue} from '@/tools/queue/queue';
  export default {
      name: 'test-dom',
      data () {
        return {
          title: 'testDom',
          linkedList: new LinkedList(),
          queue: new Queue()
        };
      },
      methods: {
        test () { // 测试重复调接口会拦截
          this.$http.get('/test').then((res) => {
            console.log(res);
          });
          this.$http.get('/test', {
            data: {
              test: 0
            }
          }).then((res) => {
            console.log(res);
          });
        },
        test1 () {
          let a = 1;
          this.test2().then((res) => {
            if (res) {
              console.log(a);
            }
          });
        },
        test2 () {
          return this.$messagebox.confirm('', {
            title: '温馨提示',
            message: '测试'
          }).then(() => {
            return Promise.resolve(true);
          }).catch(() => {
            return Promise.resolve(false);
          });
        },
        sort (arr) {
          for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
              if (arr[i] > arr[j]) {
                let tem = arr[i];
                arr[i] = arr[j];
                arr[j] = tem;
              }
            }
          }
          return arr;
        },
        showLinkedList () {
          let logThree = () => {
            console.log(3);
          };
          this.linkedList.append(() => {
            console.log(1);
          });
          this.linkedList.append(() => {
            console.log(2);
          });
          this.linkedList.doLinkedList();
          this.linkedList.insert(1, logThree);
          this.linkedList.removeAt(2);
          console.log(this.linkedList.indexOf(logThree));
          console.log(this.linkedList.size());
          console.log(this.linkedList.isEmpty());
          console.log(this.linkedList.getHead());
          console.log(this.linkedList.toString());
        },
        showQueue () {
          console.log(this.queue.isEmpty());
          this.queue.enqueue(1);
          this.queue.enqueue([3, 4]);
          this.queue.print();
          this.queue.dequeue();
          this.queue.print();
          console.log(this.queue.isEmpty());
          console.log(this.queue.front());
          console.log(this.queue.size());
        },
        showFormatNum (val) {
          console.log(formatNum(val));
        }
      },
      components: {
      },
      created () {
        // this.test();
      },
      mounted () {
        // console.log(this.sort([1, 3, 2, 8, 9]));
        // this.test1();
        // this.showFormatNum(1231231231);
        // this.showLinkedList();
        // this.showQueue();
      }
    };
</script>

<style lang='less' scoped>
    #test-dom{
    }
</style>

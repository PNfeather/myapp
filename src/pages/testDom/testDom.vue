<template>
    <app-page id='test-dom'>
      <app-header :title='title'></app-header>
      <div></div>
    </app-page>
</template>

<script>
  import formatNum from './common/formatNum';
  import {LinkedList} from '@/tools/linkedList/linkedList';
  import {ArrayList} from '@/tools/arraySort/arraySort';
  import {Queue} from '@/tools/queue/queue';
  // import _ from '@/plugins/lodash';
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
        },
        getArray () {
          return this.$http.get('/arraySort').then((res) => {
            let result = res.data;
            if (result.resultCode === '000000') {
              let data = result.resultData;
              return Promise.resolve(data);
            }
          });
        },
        sortTest () {
          this.getArray().then((res) => {
            let arrayList = new ArrayList();
            arrayList.insert(res);
            console.log(arrayList.toString());
            // arrayList.bubbleSort();
            // arrayList.selectionSort();
            // arrayList.insertionSort();
            arrayList.mergeSort();
            console.log(arrayList.toString());
          });
        }
      },
      components: {
      },
      created () {
        // this.test();
      },
      mounted () {
        // let getIncName = (string, node) => {
        //   let numArr = [];
        //   let nameNum = 0;
        //   let id = 1;
        //   let traverse = (string, node) => {
        //     let [name, num] = node.name.split('_');
        //     !num && (num = 0);
        //     (name === string) && numArr.push(+num);
        //     (+node.id >= id) && (id = +node.id + 1);
        //     if (node.children) {
        //       node.children.forEach(item => {
        //         traverse(string, item);
        //       });
        //     }
        //   };
        //   traverse(string, node);
        //   numArr.length && numArr.sort().forEach(item => {
        //     nameNum === item && (nameNum++);
        //   });
        //   return {
        //     id: id.toString(),
        //     type: string.slice(0, 1).toUpperCase() + string.slice(1),
        //     name: string + (nameNum ? ('_' + nameNum) : '')
        //   };
        // };
        // let tree = {
        //   id: '1',
        //   type: 'View',
        //   name: 'view',
        //   children: [
        //     {
        //       id: '2',
        //       type: 'Button',
        //       name: 'button'
        //     },
        //     {
        //       id: '3',
        //       type: 'View',
        //       name: 'view_2',
        //       children: [
        //         {
        //           id: '4',
        //           type: 'Button',
        //           name: 'button_2'
        //
        //         },
        //         {
        //           id: '5',
        //           type: 'View',
        //           name: 'view_1'
        //         },
        //         {
        //           id: '6',
        //           type: 'Button',
        //           name: 'button_1'
        //         },
        //         {
        //           id: '7',
        //           type: 'Button',
        //           name: 'button_4'
        //         }
        //       ] }
        //   ] };
        // console.log(getIncName('button', tree));

        // let findNodeById = (root, id) => {
        //   let result = null;
        //   let find = (node, id) => {
        //     if (node.id == id) {
        //       result = node;
        //     }
        //     node.children && node.children.forEach(item => {
        //       find(item, id);
        //     });
        //   };
        //   find(root, id);
        //   return (result || '查无此id');
        // };
        // let tree = {
        //   id: '1',
        //   label: 'first',
        //   children: [
        //     {
        //       id: '2',
        //       label: 'second'
        //     },
        //     {
        //       id: '3',
        //       label: 'third',
        //       children: [
        //         {
        //           id: '4',
        //           label: 'fourth'
        //         },
        //         {
        //           id: '5',
        //
        //           label: 'fifth'
        //         }
        //       ] }
        //   ] };
        // console.log(findNodeById(tree, 3));

        // let getGrade = (score) => {
        //   return score < 60 ? 'C' : score < 80 ? 'B' : 'A';
        // };
        // let students = [
        //   {name: '张三', score: 84}, {name: '李李四', score: 58}, {name: '王五', score: 99}, {name: '赵六', score: 69}
        // ];
        // let groupBy = (students) => {
        //   let resultCatch = {};
        //   students.forEach(student => {
        //     const studentGrade = getGrade(student.score);
        //     resultCatch[studentGrade] ? resultCatch[studentGrade].push(student) : (resultCatch[studentGrade] = [student]);
        //   });
        //   return resultCatch;
        // };
        // console.log(groupBy(students));

        // let findLongest = (string) => {
        //   let arr = string.split('');
        //   let current = '';
        //   let currentCount = 1;
        //   let longestCatch = {
        //     count: 0,
        //     children: {}
        //   };
        //   let computed = () => {
        //     if (longestCatch.count < currentCount) {
        //       longestCatch.count = currentCount;
        //       longestCatch.children = {};
        //       longestCatch.children[current] = 1;
        //     } else if (longestCatch.count === currentCount) {
        //       if (longestCatch.children[current]) {
        //         longestCatch.children[current]++;
        //       } else {
        //         longestCatch.children[current] = 1;
        //       }
        //     }
        //   }
        //   arr.forEach((item, index) => {
        //     if (current !== item) {
        //       computed();
        //       current = item;
        //       currentCount = 1;
        //     } else {
        //       currentCount++;
        //       if (index === arr.length - 1) {
        //         computed();
        //       }
        //     }
        //   });
        //   return longestCatch;
        // };
        // let string = 'laadkjfdddddddkkkkkkkdddddddaaaaaaaaaaaa';
        // console.log(findLongest(string));

        let string = 'a1<b1<c1, c2<d1, d2>>, b2<c3>>';
        let dealString = (string) => {
          let stringCatch = {
            type: ''
          };
          let childString = '';
          let floor = 0;
          for (let i of string.replace(/\s+/g, '')) {
            switch (i) {
              case '<':
                floor++;
                if (floor === 1) {
                  stringCatch.typeArgs = [];
                } else {
                  childString += i;
                }
                break;
              case ',':
                if (floor === 1) {
                  stringCatch.typeArgs && stringCatch.typeArgs.push(dealString(childString));
                  childString = '';
                } else {
                  childString += i;
                }
                break;
              case '>':
                floor--;
                if (floor) {
                  childString += i;
                } else {
                  stringCatch.typeArgs && stringCatch.typeArgs.push(dealString(childString));
                }
                break;
              default:
                if (floor) {
                  childString += i;
                } else {
                  stringCatch.type += i;
                }
                break;
            }
          }
          return stringCatch;
        };
        console.log(dealString(string));
        // let getTotal = (time) => {
        //   let count = 1;
        //   for (let i = 1; i <= time; i++) {
        //     if (i === 3 || i === 5) {
        //       count++;
        //     } else if (i === 6) {
        //       count--;
        //     }
        //   }
        // };
        // console.log(this.sort([1, 3, 2, 8, 9]));
        // this.test1();
        // this.showFormatNum(1231231231);
        // this.showLinkedList();
        // this.showQueue();
        // this.sortTest();
      }
    };
</script>

<style lang='less' scoped>
    #test-dom{
    }
</style>

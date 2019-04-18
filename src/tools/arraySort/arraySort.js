const swap = Symbol('swap'); // Symbol方法定义唯一变量
const mergeSortRec = Symbol('mergeSortRec');
const merge = Symbol('merge');

class ArrayList { // es6构造函数类
  constructor () {
    this.array = [];
  }

  [swap] (index1, index2) { // 定义私有方法，交换数组制定两项
    [this.array[index1], this.array[index2]] = [this.array[index2], this.array[index1]];
  }

  [mergeSortRec] (array) {
    let len = array.length;
    if (len === 1) return array;
    let mid = Math.floor(len / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid, len);
    return this[merge](this[mergeSortRec](left), this[mergeSortRec](right));
  }

  [merge] (left, right) {
    let result = [];
    let il = 0;
    let ir = 0;
    while (il < left.length && ir < right.length) {
      left[il] < right[ir] ? result.push(left[il++]) : result.push(right[ir++]);
    }
    while (il < left.length) {
      result.push(left[il++]);
    }
    while (ir < right.length) {
      result.push(right[ir++]);
    }
    return result;
  }

  insert (arr) { // 数组添加方法
    this.array.push(...arr);
  }

  toString () { // 类toString方法
    return this.array.join();
  }

  bubbleSort () { // 冒泡排序,每内轮循环选出最大数
    let len = this.array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (this.array[j] > this.array[j + 1]) {
          this[swap](j, j + 1);
        }
      }
    }
  }

  selectionSort () { // 选择排序,每轮内循环标记出最小值得index值，并将之与外前循环的第一项互换；
    let len = this.array.length;
    let indexMin;
    for (let i = 0; i < len - 1; i++) {
      indexMin = i;
      for (let j = i + 1; j < len; j++) {
        if (this.array[indexMin] > this.array[j]) {
          indexMin = j;
        }
      }
      (i !== indexMin) && this[swap](i, indexMin);
    }
  }

  insertionSort () {
    let len = this.array.length;
    let j;
    let temp;
    for (let i = 1; i < len; i++) {
      temp = this.array[i];
      j = i;
      while (j > 0 && this.array[j - 1] > temp) {
        this.array[j] = this.array[j - 1];
        j--;
      }
      this.array[j] = temp;
    }
  }

  mergeSort () { // 归并排序
    this.array = this[mergeSortRec](this.array);
  }
}

export default ArrayList;

export {ArrayList};

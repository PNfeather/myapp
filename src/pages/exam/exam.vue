<template>
    <app-page id="exam">
        <app-header :title="title"></app-header>
        <app-main v-model="scrollObj">
          <section v-if="currentObj && !showResult">
            <section class="examArea">
              <div class="question">{{currentObj.index}}、{{currentObj.question}}：</div>
              <div class="answer answer-a" v-for="item in currentObj.answers" :key="`${currentIndex}-${item.answer}`" @click="pickAnswer(currentIndex, item.answer)">
                <span class="chooseIcon" :class="{'active': testeeAnswers[currentIndex] === item.answer}">{{item.answer | toUp}}</span>{{item.text}}
              </div>
            </section>
            <section class="warning">{{currentIndex + 1 }} / {{questionList.length}}</section>
            <section>
              <div class="btnGroup">
                <div v-show="this.currentIndex > 0" class="btn pre" @click="pre">上一题</div>
                <div class="btn next" @click="next">{{nextText}}</div>
              </div>
            </section>
          </section>
          <section class="examResult" v-if="showResult && examResult">
            <div class="text">您的得分是{{examResult.score}}分！</div>
            <div class="text">{{examResult.text}}！</div>
            <div class="btn" @click="reExam">重测</div>
          </section>
        </app-main>
    </app-page>
</template>

<script>
    export default {
      name: 'exam',
      data () {
        return {
          title: '模拟测试',
          scrollObj: '',
          questionList: [],
          currentIndex: 0,
          testeeAnswers: {},
          showResult: false,
          examResult: null
        };
      },
      methods: {
        init () {
          this.$http.get('/exam').then((res) => {
            let data = res.data;
            if (data.resultCode === '000000') {
              this.questionList = [...data.resultData];
            } else {
              this.$toast(data.resultMsg || '网络异常');
            }
          });
        },
        pickAnswer (index, answer) {
          this.$set(this.testeeAnswers, index, answer);
          console.log(this.testeeAnswers);
        },
        pre () {
          this.currentIndex--;
        },
        getSubmitText () {
          let noAnswerQuestion = [];
          let msg = '确认交卷吗?';
          for (let i = 0; i < this.questionList.length; i++) {
            !this.testeeAnswers[i] && noAnswerQuestion.push(this.questionList[i].index);
          }
          (noAnswerQuestion.length) && (msg = '第' + noAnswerQuestion.join('、') + '题未做答！确认交卷吗？');
          return {msg: msg, len: this.questionList.length - noAnswerQuestion.length};
        },
        next () {
          if (this.currentIndex !== this.questionList.length - 1) {
            this.currentIndex++;
          } else {
            let answersResult = this.getSubmitText();
            this.$messagebox.confirm('', {
              title: '温馨提示',
              message: answersResult.msg,
              confirmButtonText: '交卷了',
              cancelButtonText: '再看看'
            }).then((res) => {
              console.log(res);
              this.showResult = true;
              this.$http.post('/exam/result', {len: answersResult.len}).then((res) => {
                let data = res.data;
                if (data.resultCode === '000000') {
                  this.examResult = data.resultData;
                  console.log(data.resultData);
                } else {
                  this.$toast(data.resultMsg || '网络异常');
                }
              });
            }).catch((err) => {
              console.log(err);
            });
          }
        },
        reExam () {
          this.currentIndex = 0;
          this.showResult = false;
          this.testeeAnswers = {};
          this.init();
        }
      },
      components: {},
      computed: {
        currentObj () {
          if (this.questionList.length) {
            return this.questionList[this.currentIndex];
          } else {
            return null;
          }
        },
        nextText () {
          return ((this.currentIndex === this.questionList.length - 1) ? '提交' : '下一题');
        }
      },
      filters: {
        toUp (val) {
          return val.toUpperCase();
        }
      },
      created () {
        this.init();
      },
      mounted () {}
    };
</script>

<style lang='less' scoped>
    #exam{
      .examArea{
        text-align: left;
        margin-top: .5rem;
        padding: 1rem;
        background: #fff;
        .question{
          font-size: .8rem;
          line-height: 1.8rem;
        }
        .answer{
          font-size: .7rem;
          line-height: 1.2rem;
          padding: .4rem 0;
          .chooseIcon{
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 1.2rem;
            background: #999999;
            text-align: center;
            margin-right: .4rem;
          }
          .active{
            background: #5CD4FE;
          }
        }
      }
      .warning{
        text-align: right;
        margin: .4rem .5rem 0 0;
        color: #999999;
      }
      .btnGroup{
        display: flex;
        justify-content: space-around;
        margin-top: .5rem;
        .btn{
          height: 2rem;
          font-size: .7rem;
          width: 40%;
          border-radius: 0.2rem;
          background-color: aqua;
          border: 1px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .examResult{
        padding: .5rem;
        .text{
          line-height: 1.8rem;
          font-size: .9rem;
          color: #999999;
        }
        .btn{
          height: 2rem;
          font-size: .7rem;
          width: 40%;
          margin: 0 auto;
          border-radius: 0.2rem;
          background-color: aqua;
          border: 1px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
</style>

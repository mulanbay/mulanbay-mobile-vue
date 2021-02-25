<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">我的评分</span>
    </top-bar>
    <!--日期选择-->
    <van-cell title="选择日期" :value="endDate" @click="showcalendar = true" />
    <van-calendar v-model="showcalendar" :show-confirm="true" @confirm="onConfirmDate" :min-date="calendarMinDate"/>
    <van-cell center class="custom-cell" title="总计得分" :value="totalScore" is-link :to="{ name:'UserScoreStat' }"/>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <van-list
        v-model="pushLoading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="10"
      >
      <van-cell-group v-for="(item, index) in dataList" :key="index" >
        <van-cell center>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <svg-icon icon-class="score" className="icon-list" />
          </template>
          <template #title>
            <span class="custom-cell-title">{{item.name}}</span>
          </template>
          <template #default>
            <span v-if="item.score==item.maxScore" style="color: green;">
              <svg-icon icon-class="good" />
            </span>
            <span v-else-if="item.score==0" style="color: red;">
              <svg-icon icon-class="bad" />
            </span>
            <span class="custom-cell-title">得分:{{item.score}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="单项满分">
          <template #default>
            <span class="custom-cell-title">{{item.maxScore}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="统计值">
          <template #default>
            <span class="custom-cell-title">{{item.statValue}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="参考值">
          <template #default>
            <span class="custom-cell-title">{{item.limitValue}}</span>
          </template>
        </van-cell>
        <van-cell center :value="item.remark" value-class="desc-class"/>
      </van-cell-group>

      </van-list>
    </van-pull-refresh>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
  </div>
</template>

<script>
  import { getScoreCompare } from '@/api/auth/user'
  import { Col,Row,List,PullRefresh,Tag,Calendar  } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate } from '@/utils/datetime'

export default {
  name:'UserScore',
  components: {
    TopBar,
    [Calendar.name]: Calendar,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Tag.name]: Tag

  },
  data() {
    return {
      //下拉刷新使用
      pullLoading:false,
      //列表上拉的刷新使用
      pushLoading: false,
      finished: false,
      page:0,
      dataList:[],
      endDate:getNowDateString(),
      //时间选择
      showcalendar:false,
      totalScore:0
    }
  },
  computed: {

  },
  mounted() {
    this.getDataList();
  },
  methods: {
    /**时间选择确定*/
    onConfirmDate(date){
      this.endDate = getFormatDate(date,'yyyy-MM-dd');
      this.showcalendar = false;
      this.getDataList();
    },
    /**重置搜索*/
    resetSearch(){
      this.pullLoading = false;
      this.dataList = [];
      this.page=1;
      this.finished = false;
      this.getDataList();
    },
    /**获取数据列表*/
    getDataList() {
      this.pushLoading = true;
      // 请求接口数据
      const para = {
        endDate:this.endDate
      }
      this.dataList = [];
      this.finished = false;
      getScoreCompare(para).then(response => {
        this.pushLoading = false;
        let nowData = response.nowData;
        this.totalScore=0;
        for (var i = 0; i < nowData.length; i++){
          this.totalScore+=nowData[i].score;
          //nowData.diffScore = this.calDiff(nowData[i].score,response.beforeData,nowData[i].scoreConfigId);
        }
        this.dataList = nowData;
        this.finished = true;
      }).catch(() => {
      });
    },
    /**计算差异*/
    calDiff(score,beforeData,scoreConfigId){
      if(beforeData==null||beforeData.length==0){
        return 0;
      }else{
        for (var i = 0; i < beforeData.length; i++){
          if(scoreConfigId==beforeData[i].scoreConfigId){
              return score-beforeData[i].score;
          }
        }
        return 0;
      }
    }
  }
}
</script>

<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">我的积分</span>
    </top-bar>
    <!--日期选择-->
    <van-cell title="选择日期" :value="startDate" @click="showcalendar = true" />
    <van-calendar v-model="showcalendar" :show-confirm="true" @confirm="onConfirmDate" :min-date="calendarMinDate"/>
    <van-row type="flex" justify="center">
      <van-col span="6" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="circle" @click="getCalendarDay(0)" style="width: 100%;">今天</van-button>
      </van-col>
      <van-col span="6" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="arrow-left" @click="getCalendarDay(-1)" style="width: 100%;">前一天</van-button>
      </van-col>
      <van-col span="6" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="arrow" @click="getCalendarDay(1)" style="width: 100%;">后一天</van-button>
      </van-col>
      <van-col span="6" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="chart-trending-o" :to="{ name:'UserRewardPointsStat' }" style="width: 100%;">统计</van-button>
      </van-col>
    </van-row>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <van-cell-group>
        <van-cell center class="custom-cell" title="得分次数" :value="dailyData.totalCount">
          <template #icon>
            <svg-icon icon-class="item" className="icon-item" />
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="当日积分" :value="dailyData.totalPoints" >
          <template #icon>
            <svg-icon icon-class="item" className="icon-item" />
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="累计积分" :value="dailyData.currentPoints" >
          <template #icon>
            <svg-icon icon-class="item" className="icon-item" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-list
        v-model="pushLoading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="10"
        @load="onLoad"
      >
      <van-cell-group v-for="(item, index) in dataList" :key="index" >
        <van-cell center is-link @click="showMessageContent(item.id)">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <svg-icon icon-class="point" className="icon-list" />
          </template>
          <template #title>
            <span class="custom-cell-title">积分奖励:{{item.rewards}}</span>
          </template>
          <template #default>
            <span class="custom-cell-title">类型:{{item.rewardSourceName}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="创建时间">
          <template #default>
            <span class="custom-cell-title">{{item.createdTime}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="累计积分">
          <template #default>
            <span class="custom-cell-title">{{item.afterPoints}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="积分来源">
          <template #default>
            <span class="custom-cell-title">{{item.sourceName}}</span>
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
  import { fetchList,dailyStat,getMessageContent } from '@/api/data/userRewardPointRecord'
  import { Col,Row,List,PullRefresh,Calendar,Dialog  } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate } from '@/utils/datetime'

export default {
  name:'UserCalendar',
  components: {
    TopBar,
    [Calendar.name]: Calendar,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Dialog.Component.name]: Dialog.Component
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
      dailyData:{},
      startDate:getNowDateString(),
      //时间选择
      showcalendar:false,
    }
  },
  computed: {

  },
  mounted() {
    //this.getDataList();
    this.getDailyStat();
  },
  methods: {
    /**时间选择确定*/
    onConfirmDate(date){
      this.startDate = getFormatDate(date,'yyyy-MM-dd');
      this.showcalendar = false;
      this.reset();
      this.getDataList();
      this.getDailyStat();
    },
    /**时间快速选择*/
    getCalendarDay(n){
      if(n==0){
        this.startDate = getNowDateString();
      }else{
        this.startDate = getDayByDate(n,this.startDate);
      }
      this.reset();
      this.getDataList();
      this.getDailyStat();
    },
    /**重置搜索*/
    resetSearch(){
      this.pullLoading = false;
      this.dataList = [];
      this.page=1;
      this.finished = false;
      this.getDataList();
    },
    /**重置*/
    reset() {
      this.pullLoading = false;
      this.dataList = [];
      this.page=1;
      this.finished = false;
    },
    /**展示消息内容*/
    showMessageContent(id){
      getMessageContent(id).then(response => {
        Dialog.alert({
          title: '消息内容',
          message: response.para,
        }).then(() => {
          // on close
        });
      }).catch(() => {
      });
    },
    /**总的统计*/
    getDailyStat(){
      // 请求接口数据
      const para = {
        date:this.startDate
      }
      dailyStat(para).then(response => {
        this.dailyData = response;
      }).catch(() => {
      });
    },
    /**获取数据列表*/
    getDataList() {
      this.pushLoading = true;
      // 请求接口数据
      const para = {
        startDate:this.startDate,
        endDate:this.startDate,
        page:this.page,
        pageSize:10,
        needTotal:false
      }
      fetchList(para).then(response => {
        this.pushLoading = false;
        this.dataList = this.dataList.concat(response.rows);
        if(response.rows.length==0){
          this.finished = true;
        }
      }).catch(() => {
      });
    },
    /**下拉刷新*/
    onLoad(){
      this.page+=1;
      this.getDataList();
    }
  }
}
</script>

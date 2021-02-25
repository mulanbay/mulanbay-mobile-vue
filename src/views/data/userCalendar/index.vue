<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">我的日历</span>
    </top-bar>
    <!--日期选择-->
    <van-cell title="选择日期" :value="startDate" @click="showCalendar = true" />
    <van-calendar v-model="showCalendar" :show-confirm="true" @confirm="onConfirmDate" :min-date="calendarMinDate"/>
    <van-row type="flex" justify="center">
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="circle" @click="getCalendarDay(0)" style="width: 100%;">今天</van-button>
      </van-col>
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="arrow-left" @click="getCalendarDay(-1)" style="width: 100%;">前一天</van-button>
      </van-col>
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="arrow" @click="getCalendarDay(1)" style="width: 100%;">后一天</van-button>
      </van-col>
    </van-row>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <van-list
        v-model="pushLoading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="10"
      >
      <van-cell-group v-for="(item, index) in dataList" :key="index" >
        <van-swipe-cell>
          <van-cell center is-link @click="showCalendarContent(item)">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <svg-icon icon-class="calendar" className="icon-list" />
            </template>
            <template #title>
              <span class="custom-cell-title">{{item.title}}</span>
            </template>
            <template #default>
              <span class="custom-cell-title">延迟次数:{{item.delayCounts}}</span>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除"  @click="handleDelete(item.id)" />
            <van-button square type="primary" text="完成" v-if="'ONCE'==item.period" @click="handleFinish(item.id)"/>
          </template>
        </van-swipe-cell>
        <van-cell center class="custom-cell" title="日历时间">
          <template #default>
            <span class="custom-cell-title">
            {{formatBussDay(item)}}
            </span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="失效时间">
          <template #default>
            <span class="custom-cell-title">{{item.expireTime}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="创建时间">
          <template #default>
            <span class="custom-cell-title">{{item.createdTime}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="行程来源">
          <template #default>
            <span class="custom-cell-title">{{item.sourceTypeName}}</span>
          </template>
        </van-cell>
        <van-cell center :value="item.content" value-class="desc-class" />
      </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <van-button round block type="primary" class="btn-block" @click="handleSendToMe" >
        发送给我
    </van-button>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
    <!--日历内容-->
    <van-popup v-model="showContent" position="bottom">
      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">日历内容</van-divider>
      <van-cell center :value="content" value-class="desc-class" icon="info" />
      <span v-if="expireTimes>0">
      <van-cell center class="custom-cell" title="剩余时间">
        <template #default>
          <van-count-down :time="expireTimes" format="DD 天 HH 时 mm 分 ss 秒" />
        </template>
      </van-cell>
      </span>
      <span v-else>
        <van-cell center :value="'已经过去:'+pastedDays" value-class="desc-class" />
      </span>
      </br>
      <van-button round block type="primary" class="app-color" @click="showContent=false" >
          关闭
      </van-button>
    </van-popup>
  </div>
</template>

<script>
  import { getList,sendCalendarMessage,finishUserCalendar,deleteUserCalendar } from '@/api/data/userCalendar'
  import { Col,Row,List,PullRefresh,Tag,Calendar,SwipeCell,Notify,Dialog,Popup,CountDown,Divider  } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate,formatDays,tillNowDays } from '@/utils/datetime'

export default {
  name:'UserCalendar',
  components: {
    TopBar,
    [Calendar.name]: Calendar,
    [SwipeCell.name]: SwipeCell,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Tag.name]: Tag,
    [Dialog.Component.name]: Dialog.Component,
    [Notify.Component.name]: Notify.Component,
    [Popup.name]: Popup,
    [CountDown.name]: CountDown,
    [Divider.name]: Divider,

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
      startDate:getNowDateString(),
      //时间选择
      showCalendar:false,
      //展示内容
      showContent:false,
      expireTimes:0,
      pastedDays:undefined,
      content:undefined
    }
  },
  computed: {

  },
  mounted() {
    this.getDataList();
  },
  methods: {
    /**格式化日历时间*/
    formatBussDay(item){
      let s = item.bussDay;
      if(s.length>=11){
        s = s.substr(11, 5);
      }
      if(item.periodName!=null){
        s+='('+item.periodName+(item.periodValues==null? '':item.periodValues)+')';
      }
      return s;
    },
    /**日历内容展示*/
    showCalendarContent(item){
      this.showContent = true;
      this.content = item.content;
      this.expireTimes=0;
      let days = tillNowDays(null,item.expireTime);
      if(days<0){
        this.pastedDays = formatDays(0-days);
      }else{
        this.expireTimes = days*24*60*60*1000;
      }

    },
    /**时间选择确定*/
    onConfirmDate(date){
      this.startDate = getFormatDate(date,'yyyy-MM-dd');
      this.showCalendar = false;
      this.getDataList();
    },
    /**时间快速选择*/
    getCalendarDay(n){
      if(n==0){
        this.startDate = getNowDateString();
      }else{
        this.startDate = getDayByDate(n,this.startDate);
      }
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
        startDate:this.startDate,
        endDate:this.startDate,
        needTotal:false,
        needFinished:false,
        needPeriod:true,
        needBudget:true,
        needTreatDrug:true,
        needBandLog:false
      }
      this.dataList = [];
      this.finished = false;
      getList(para).then(response => {
        this.pushLoading = false;
        this.dataList = response;
        //没有分页功能
        this.finished = true;
      })
    },
    /**删除日历*/
    handleDelete(id) {
      Dialog.confirm({
        title: '确认删除?',
        message: '您是否要删除该条行程?',
      }).then(() => {
        //确认
        deleteUserCalendar(id).then(response => {
          Notify({ type: 'success', message: '删除成功' });
          this.getDataList();
        })
      }).catch(() => {
        //取消
      });
    },
    /**完成日历*/
    handleFinish(id) {
      Dialog.confirm({
        title: '确认完成?',
        message: '您是否要把该条行程手动设置为完成?',
      }).then(() => {
        //确认
        finishUserCalendar(id).then(response => {
          Notify({ type: 'success', message: '操作成功' });
          this.getDataList();
        })
      }).catch(() => {
        //取消
      });
    },
    /**发送给我*/
    handleSendToMe() {
      Dialog.confirm({
        title: '确认发送?',
        message: '您是否要把该天的任务列表发送到我的消息?<br>（消息接收模式以个人配置的短信或者微信形式）',
      }).then(() => {
        //确认
        const para = {
          date:this.startDate,
          calendarDate:this.startDate
        }
        sendCalendarMessage(para).then(response => {
          Notify({ type: 'success', message: '发送成功' });
        })
      }).catch(() => {
        //取消
      });
    }
  }
}
</script>

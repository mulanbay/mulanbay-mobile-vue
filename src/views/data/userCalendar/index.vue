<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">我的日历</span>
    </top-bar>
    <!--日期选择-->
    <van-cell :value="startDate" @click="showCalendar = true" >
      <template #title>
        <span class="custom-title">选择日期</span>
        <van-tag type="primary" round v-if="bussDayTitle!=null">{{bussDayTitle}}</van-tag>
      </template>
    </van-cell>
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
      <van-steps direction="vertical" :active="-1" inactive-icon="underway">
        <van-step v-for="(item, index) in dataList" :key="index">
          <van-cell :value="item.date"/>
          <van-card
            :tag="item.sourceTypeName">
            <template #title>
              <svg-icon icon-class="title"/>
              <span class="card-title">
                {{item.title}}
              </span>
            </template>
            <template #desc>
              </br>
              <svg-icon icon-class="content"/>
              <span class="card-content">
                {{item.content}}
              </span>
              </br>
              <svg-icon icon-class="item"/>
              <span v-if="item.period!=null" class="card-content">
                {{item.periodName}}{{item.periodValues}}
              </span>
              </br>
              <svg-icon icon-class="item"/>
              <span class="card-content">
                延迟:{{item.delayCounts}}次
              </span>
            </template>
            <template #thumb>
              <svg-icon :icon-class="item.iconClass" className="icon-card" />
            </template>
          </van-card>
          <van-row type="flex" justify="center">
            <van-col span="8" style="text-align: center;">
              <van-button plain class="app-menu-color" size="small" icon="info-o" @click="showCalendarContent(item)" style="width: 100%;">详情</van-button>
            </van-col>
            <van-col span="8" style="text-align: center;">
              <van-button v-if="'ONCE'==item.period" plain class="app-menu-color" size="small" icon="close" @click="handleFinish(item.id)" style="width: 100%;" >关闭</van-button>
              <van-button v-else disabled plain class="app-menu-color" size="small" icon="close" @click="handleFinish(item.id)" style="width: 100%;" >关闭</van-button>
            </van-col>
            <van-col span="8" style="text-align: center;">
              <van-button v-if="item.id>0" plain class="app-menu-color" size="small" icon="delete-o" @click="handleDelete(item.id)" style="width: 100%;">删除</van-button>
              <van-button v-else disabled plain class="app-menu-color" size="small" icon="delete-o" @click="handleDelete(item.id)" style="width: 100%;">删除</van-button>
            </van-col>
          </van-row>
        </van-step>
      </van-steps>
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
      <van-cell title="开始时间" :value="form.bussDay" icon="info-o"/>
      <van-cell title="过期时间" :value="form.expireTime" icon="info-o"/>
      <van-cell center v-if="form.sourceMsg!=null" :value="form.sourceMsg" value-class="desc-class"/>
      <van-cell center :value="form.content" value-class="desc-class" />
      <span v-if="form.expireTimes>0">
      <van-cell center class="custom-cell" title="剩余时间">
        <template #default>
          <van-count-down :time="form.expireTimes" format="DD 天 HH 时 mm 分 ss 秒" />
        </template>
      </van-cell>
      </span>
      <span v-else>
        <van-cell center :value="'已经过去:'+form.pastedDays" value-class="desc-class" />
      </span>
      </br>
      <van-button round block type="primary" class="app-color" @click="showContent=false" >
          关闭
      </van-button>
      </br>
    </van-popup>
  </div>
</template>

<script>
  import { getList,sendCalendarMessage,finishUserCalendar,deleteUserCalendar } from '@/api/data/userCalendar'
  import {getUserMessageByUser} from "@/api/message/userMessage";
  import { Col,Row,List,PullRefresh,Tag,Calendar,SwipeCell,Notify,Dialog,Popup,CountDown,Divider,Card,Step, Steps  } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate,formatDays,tillNowDays } from '@/utils/datetime'
  import { getBussIconClass,sortData  } from '@/utils/index'

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
    [Card.name]: Card,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  data() {
    return {
      //下拉刷新使用
      pullLoading:false,
      //列表上拉的刷新使用
      pushLoading: false,
      finished: false,
      page:0,
      //数据列表
      dataList:[],
      startDate:getNowDateString(),
      //时间选择
      showCalendar:false,
      //展示内容
      form:{},
      showContent:false,
      //日期标题
      bussDayTitle:undefined
    }
  },
  computed: {

  },
  mounted() {
    this.setBussDayTitle();
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
    /** 设置日期标题 */
    setBussDayTitle(){
      const now = new Date(Date.parse(getNowDateString().replace(/-/g,"/")));
      const bd = new Date(Date.parse(this.startDate.replace(/-/g,"/")));
      const days = tillNowDays(now,bd);
      switch(days){
        case 0:
          this.bussDayTitle='今天';
          break;
        case 1:
          this.bussDayTitle='明天';
          break;
        case -1:
          this.bussDayTitle='昨天';
          break;
        default:
          if(days>0){
            this.bussDayTitle=days+'天后';
          }else{
            this.bussDayTitle=(0-days)+'天前';
          }
      }
    },
    /**日历内容展示*/
    showCalendarContent(item){
      this.showContent = true;
      this.form = item;
      let days = tillNowDays(null,item.expireTime);
      if(days<0){
        this.form.pastedDays = formatDays(0-days);
      }else{
        this.form.expireTimes = days*24*60*60*1000;
      }
      if(this.form.messageId!=null){
        getUserMessageByUser(this.form.messageId).then(
          response => {
            if(response!=null){
              let sourceMsg ='来源:'+response.content+'['+response.title+']';
              this.form.sourceMsg=sourceMsg;
              //需要刷新显示
              this.$forceUpdate();
            }
          }
        );
      }
    },
    /**时间选择确定*/
    onConfirmDate(date){
      this.startDate = getFormatDate(date,'yyyy-MM-dd');
      this.showCalendar = false;
      this.setBussDayTitle();
      this.getDataList();
    },
    /**时间快速选择*/
    getCalendarDay(n){
      if(n==0){
        this.startDate = getNowDateString();
      }else{
        this.startDate = getDayByDate(n,this.startDate);
      }
      this.setBussDayTitle();
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
        this.dataList=new Array();
        let datas = response;
        const n=datas.length;
        //倒序
        for (var i = 0; i <n; i++){
          let row = datas[i];
          row.iconClass=getBussIconClass(row.sourceType);
          if(row.allDay==true){
            row.date = '全天';
          }else{
            row.date = row.bussDay.substr(11,5);
          }
          this.dataList.push(row);
        }
        sortData(this.dataList,'asc');
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

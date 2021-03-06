<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">用药日历</span>
    </top-bar>
    <!--日期选择-->
    <van-cell :value="bussDay" @click="showCalendar = true" >
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
      <template v-for="cld in dataList">
        <van-divider :style="{ color: '#009999', borderColor: '#009999' }">{{cld.name}}</van-divider>
        <van-steps direction="vertical" :active="-1" inactive-icon="underway">
          <van-step>
            <span style="color: #550000;">
              {{'From '+cld.startHour+':00'}}
            </span>
          </van-step>
          <van-step v-for="(item, index) in cld.detailList" :key="index">
            <span style="color: green;" v-if="item.occurTimeStr!=null">
              {{item.occurTimeStr}}
              <svg-icon icon-class="finish"/>
            </span>
            <van-card
              :tag="item.tag">
              <template #title>
                <svg-icon icon-class="title"/>
                <span class="card-title">
                  {{item.name}}
                </span>
              </template>
              <template #desc>
                </br>
                <svg-icon icon-class="content"/>
                  针对疾病:{{item.disease}}
                </br>
                <svg-icon icon-class="item"/>
                {{ item.perDay }}天{{item.perTimes}}次
                </br>
                <svg-icon icon-class="item"/>
                每次{{item.ec}}{{ item.eu }}
                </br>
                <svg-icon icon-class="item"/>
                {{item.useWay}}
              </template>
              <template #thumb>
                <svg-icon icon-class="health" className="icon-card" />
              </template>
            </van-card>
            <van-row type="flex" justify="center">
              <van-col span="8" style="text-align: center;">
                <van-button plain class="app-menu-color" size="small" icon="apps-o" :to="{ name:'TreatDrugDetail',params: {treatDrugId:item.treatDrugId,fromPath:'TreatTrug'} }" style="width: 100%;">记录</van-button>
              </van-col>
              <van-col span="8" style="text-align: center;">
                <van-button v-if="null==item.occurTime" plain class="app-menu-color" size="small" icon="add-o" :to="{ name:'TreatDrugDetailAdd',params: {treatDrugId:item.treatDrugId} }" style="width: 100%;" >服用</van-button>
                <van-button v-else disabled plain class="app-menu-color" size="small" icon="add-o" style="width: 100%;" >服用</van-button>
              </van-col>
              <van-col span="8" style="text-align: center;">
                <van-button plain class="app-menu-color" size="small" icon="delete-o" @click="handleStop(item.id)" style="width: 100%;">暂停</van-button>
              </van-col>
            </van-row>
          </van-step>
          <van-step>
            <span style="color: #550000;">
              {{'To '+cld.endHour+':59'}}
            </span>
          </van-step>
        </van-steps>
      </template>
    </van-pull-refresh>
    <van-goods-action>
      <van-goods-action-icon icon="close" text="未服用" :badge="unTakes" />
      <van-goods-action-icon icon="passed" text="已服用" :badge="takes"/>
      <van-goods-action-icon icon="question-o" text="未匹配" :badge="unMatchs"/>
      <van-goods-action-icon icon="cart-o" text="药品数" :badge="drugs"/>
      <van-goods-action-button
        type="primary"
        class="app-color"
        text="药品列表"
        :to="{ name:'TreatDrug',params: {} }"
      />
    </van-goods-action>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
  </div>
</template>

<script>
  import {calendar} from "@/api/health/treat/treatDrug";
  import { Col,Row,PullRefresh,Tag,Calendar,Notify,Dialog,Divider,Card,Step, Steps,  } from 'vant';
  import { GoodsAction, GoodsActionIcon, GoodsActionButton} from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate,formatDays,tillNowDays } from '@/utils/datetime'
  import { getBussIconClass,sortData  } from '@/utils/index'

export default {
  name:'Calendar',
  components: {
    TopBar,
    [Calendar.name]: Calendar,
    [Col.name]: Col,
    [Row.name]: Row,
    [PullRefresh.name]: PullRefresh,
    [Tag.name]: Tag,
    [Dialog.Component.name]: Dialog.Component,
    [Notify.Component.name]: Notify.Component,
    [Divider.name]: Divider,
    [Card.name]: Card,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
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
      bussDay:getNowDateString(),
      //时间选择
      showCalendar:false,
      //展示内容
      form:{},
      showContent:false,
      //日期标题
      bussDayTitle:undefined,
      //统计
      unTakes:0,
      takes:0,
      drugs:0,
      unMatchs:0
    }
  },
  computed: {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const r = to.params.r;
      if(true==r){
        vm.resetSearch();
      }
    })
  },
  mounted() {
    this.setBussDayTitle();
    this.getDataList();
  },
  methods: {
    /** 设置日期标题 */
    setBussDayTitle(){
      const now = new Date(Date.parse(getNowDateString().replace(/-/g,"/")));
      const bd = new Date(Date.parse(this.bussDay.replace(/-/g,"/")));
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
    /**时间选择确定*/
    onConfirmDate(date){
      this.bussDay = getFormatDate(date,'yyyy-MM-dd');
      this.showCalendar = false;
      this.setBussDayTitle();
      this.getDataList();
    },
    /**时间快速选择*/
    getCalendarDay(n){
      if(n==0){
        this.bussDay = getNowDateString();
      }else{
        this.bussDay = getDayByDate(n,this.bussDay);
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
      let para={
        bussDay:this.bussDay
      };
      this.dataList = [];
      this.finished = false;
      calendar(para).then(response => {
        this.pushLoading = false;
        //统计
        this.unTakes=0;
        this.takes=0;
        this.drugs=0;
        this.unMatchs=0;
        let map = new Map();
        let datas = response;
        for(let i=0;i<datas.length;i++){
          let detailList = datas[i].detailList;
          for(let j=0;j<detailList.length;j++){
            let dt = detailList[j];
            if(dt.occurTime==null){
              //dt.occurTimeStr = '未用药';
              this.unTakes++;
              dt.tag = '未用药';
            }else{
              dt.occurTimeStr = dt.occurTime.substr(11,5);
              this.takes++;
            }
            if(dt.match==false){
              dt.tag='未匹配';
              this.unMatchs++;
            }
            map.set(dt.treatDrugId,1);
          }
        }
        this.drugs=map.size;
        this.dataList = datas;
        sortData(this.dataList,'asc');
        //没有分页功能
        this.finished = true;
      })
    },
    /**服用*/
    handleAddDrugDetail(item){

    },
    /**暂停*/
    handleStop(id) {
      Dialog.confirm({
        title: '确认暂停?',
        message: '该药是否已经停止服用?',
      }).then(() => {
        //确认
        Notify({ type: 'warning', message: '暂时未实现' });
      }).catch(() => {
        //取消
      });
    },
  }
}
</script>

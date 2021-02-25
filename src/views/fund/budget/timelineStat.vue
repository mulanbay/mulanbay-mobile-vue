<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">预算进度统计</span>
    </top-bar>
    <van-tabs v-model="dataType" @change="changeDataType">
      <van-tab title="月度预算"  name="MONTHLY"></van-tab>
      <van-tab title="年度预算" name="YEARLY"></van-tab>
    </van-tabs>
    <van-cell title="选择日期" :value="bussDay" @click="showDate = true" />
    <van-field
      v-model="statTypeName"
      label="数据类型"
      placeholder="请选择数据类型"
      :readonly="true"
      is-link
      @focus="showStatType=true"
      :rules="[{ required: true, message: '请选择数据类型' }]"
    />
    </br>
    <!--图表数据-->
    <div :id="id" :class="className" :style="{height:height,width:width,margin:0 }" >
    </div>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
    <van-action-sheet v-model="showStatType" :actions="statTypeOptions" @select="onSelectStatType" />
    <!--时间选择器-->
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="vanDate"
        :type="vanDateFormat"
        title="选择年月日"
        :min-date="calendarMinDate"
        @cancel="showDate = false"
        @confirm="onConfirmDate"
      />
    </van-popup>
  </div>
</template>

<script>
  import { getBudgetTimelineStat } from '@/api/fund/budget'
  import { getNowDateString,getFormatDate,getDayByDate,getMonthDateRange } from '@/utils/datetime'
  import {chartProps,createLineChart} from "@/utils/echarts";
  import { Field,Tab, Tabs,DatetimePicker,Popup,ActionSheet,Toast  } from 'vant';
  import TopBar from "components/TopBar";
  import * as echarts from 'echarts';

export default {
  name:'BudgetTimelineStat',
  components: {
    TopBar,
    [Field.name]:Field,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [DatetimePicker.name]: DatetimePicker,
    [ActionSheet.name]:ActionSheet,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dataType:'MONTHLY',
      bussDay:undefined,
      //统计类型
      statType:'RATE',
      statTypeName:'按比例',
      showStatType:false,
      statTypeOptions:[],
      //van格式的时间
      vanDate:undefined,
      vanDateFormat:'year-month',
      //时间窗口
      showDate:false,
      //查询运营日的格式
      bussDayFormat:'yyyy-MM',
      chart: null,
      height:(document.documentElement.clientHeight-250)+'px'
    }
  },
  computed: {

  },
  mounted() {
    //统计类型
    this.getDictItemTree('TIMELINE_STAT_TYPE',false).then(response => {
      this.statTypeOptions = response;
    });
    this.initBussDay();
    this.chart = echarts.init(document.getElementById(this.id));
    this.getChartData();
  },
  methods: {
    /** 选择统计类型 */
    onSelectStatType(item){
      this.statTypeName = item.name;
      this.statType = item.id;
      this.showStatType = false;
      this.getChartData();
    },
    /**初始化时间*/
    initBussDay(){
      //默认当月
      this.vanDate = new Date();
      this.bussDay = getFormatDate(this.vanDate,this.bussDayFormat);
    },
    /**改变获取数据类型*/
    changeDataType(name,title){
      this.dataType = name;
      if(this.dataType=='MONTHLY'){
        this.vanDateFormat = 'year-month';
        this.bussDayFormat = 'yyyy-MM';
      }else{
        this.vanDateFormat = 'year-month';
        this.bussDayFormat = 'yyyy';
      }
      this.initBussDay();
      this.getChartData();
    },
    /**时间选择确定*/
    onConfirmDate(){
      this.bussDay = getFormatDate(this.vanDate,this.bussDayFormat);
      this.showDate = false;
      this.getChartData();
    },
    /**获取图表列表*/
    getChartData(){
      // 请求接口数据
      const para = {
        //后台数据接口还是时间格式
        bussDay:getFormatDate(this.vanDate,'yyyy-MM-dd'),
        statType:this.statType,
        period:this.dataType
      }
      Toast.loading({
        forbidClick: true
      })
      getBudgetTimelineStat(para).then(response => {
        this.chart.resize();
        createLineChart(response,this.chart);
      }).catch(() => {
      });
    }
  }
}
</script>

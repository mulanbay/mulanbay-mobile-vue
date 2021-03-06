<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">图表统计</span>
    </top-bar>
    <van-cell title="开始日期" :value="para.startDate" @click="showStartDate = true" />
    <van-cell title="结束日期" :value="para.endDate" @click="showEndDate = true" />
    <van-field
      v-model="chartName"
      label="图表类型"
      placeholder="请选择图表"
      :readonly="true"
      is-link
      @focus="showChart=true"
      :rules="[{ required: true, message: '请选择图表' }]"
    />
    <van-button round block type="primary" class="app-color" @click="refreshChart" >
        刷新
    </van-button>
    </br>
    <!--图表数据-->
    <div :id="id" :class="className" :style="{height:height,width:width,margin:0 }" >
    </div>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
    <!--时间选择器-->
    <van-popup v-model="showStartDate" position="bottom">
      <van-datetime-picker
        v-model="vanStartDate"
        type="date"
        :readonly="dateReadonly"
        title="选择年月日"
        :min-date="calendarMinDate"
        @cancel="showStartDate = false"
        @confirm="onConfirmStartDate"
      />
    </van-popup>
    <!--时间选择器-->
    <van-popup v-model="showEndDate" position="bottom">
      <van-datetime-picker
        v-model="vanEndDate"
        type="date"
        :readonly="dateReadonly"
        title="选择年月日"
        :min-date="calendarMinDate"
        @cancel="showEndDate = false"
        @confirm="onConfirmEndDate"
      />
    </van-popup>
    <!--图表选择器-->
    <van-popup v-model="showChart" position="bottom">
      <van-tree-select
        :items="chartList"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
        @click-item="chooseChart"
      />
    </van-popup>
  </div>
</template>

<script>
  import { getUserChartTree,getChartPara,statChart } from '@/api/report/chart/userChart'
  import { getFormatDate,getYearDateRange } from '@/utils/datetime'
  import {chartProps,createLineChart,createPieChart,createBarChart,createMixLineBarChart} from "@/utils/echarts";
  import { Field,DatetimePicker,Popup,TreeSelect,Notify  } from 'vant';
  import TopBar from "components/TopBar";
  import * as echarts from 'echarts';

export default {
  name:'UserChartStat',
  components: {
    TopBar,
    [Field.name]:Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [TreeSelect.name]: TreeSelect,
    [Notify.Component.name]: Notify.Component
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
      //图表
      //表示右侧高亮选项的 id
      activeId:0,
      //表示左侧高亮选项的索引
      activeIndex:0,
      chartList:[],
      showChart:false,
      //请求参数
      para:{},
      //时间是否只读
      dateReadonly:false,
      //当前选中图表
      chartName:undefined,
      chartId:undefined,
      //van格式的时间
      vanStartDate:undefined,
      //时间窗口
      showStartDate:false,
      //van格式的时间
      vanEndDate:undefined,
      //时间窗口
      showEndDate:false,
      chart: null,
      height:(document.documentElement.clientHeight-300)+'px'
    }
  },
  computed: {

  },
  mounted() {
    this.chart = echarts.init(document.getElementById(this.id));
    this.initDate();
    this.getChartList();
  },
  methods: {
    /**初始化时间*/
    initDate(){
      //默认今年
      let ds = getYearDateRange(0);
      this.vanStartDate = new Date(ds[0]);
      this.vanEndDate = new Date(ds[1]);
      this.para.startDate = ds[0];
      this.para.endDate = ds[1];
    },
    /**时间选择确定*/
    onConfirmStartDate(){
      this.para.startDate = getFormatDate(this.vanStartDate,'yyyy-MM-dd');
      this.showStartDate = false;
    },
    /**时间选择确定*/
    onConfirmEndDate(){
      this.para.endDate = getFormatDate(this.vanEndDate,'yyyy-MM-dd');
      this.showEndDate = false;
    },
    /**刷新图标*/
    refreshChart(){
      this.initChart();
    },
    /**选择图表*/
    chooseChart(item){
      this.chartName = item.text;
      this.showChart = false;
      this.chartId = item.id;
      this.initChart();
    },
    /**初始化图表*/
    initChart() {
      getChartPara(this.chartId).then(
        response => {
          let supportDate = response.supportDate;
          this.detailUrl = response.detailUrl;
          let pp = eval('(' + response.para + ')');
          const url = response.url;
          if(supportDate==true){
            this.dateReadonly=false;
            pp.startDate = this.para.startDate;
            pp.endDate = this.para.endDate;
          }else{
            this.dateReadonly=true;
          }
          this.handleStatChart(url,pp,response.chartType);
        }
      );
    },
    /**获取图表列表*/
    getChartList(){
      getUserChartTree(null,null).then(response => {
        this.chartList = response.treeData;
      }).catch(() => {
      });
    },
    /**获取图表数据*/
    handleStatChart(url,para,chartType){
      statChart(url,para).then(
        response => {
          //组装chart数据
          this.chart.resize();
          switch(chartType){
            case 'PIE':
              createPieChart(response,this.chart);
              break;
            case 'LINE':
              createLineChart(response,this.chart);
              break;
            case 'BAR':
              createBarChart(response,this.chart);
              break;
            case 'MIX_LINE_BAR':
              createMixLineBarChart(response,this.chart);
              break;
            default:
              Notify({ type: 'warning', message: '暂未支持的图表格式:'+chartType });
          }
        }
      );
    }
  }
}
</script>

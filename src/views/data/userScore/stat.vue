<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">评分统计</span>
    </top-bar>
    <van-tabs v-model="period" @change="changePeriod">
      <van-tab title="最近七天"  name="7"></van-tab>
      <van-tab title="最近一个月" name="30"></van-tab>
      <van-tab title="最近一年" name="365"></van-tab>
    </van-tabs>
    </br>
    <!--图表数据-->
    <div :id="id" :class="className" :style="{height:height,width:width,margin:0 }" >
    </div>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
  </div>
</template>

<script>
  import { getUserScoreStat } from '@/api/data/userScore'
  import { getDay,getNowDateString  } from '@/utils/datetime'
  import {chartProps,createLineChart} from "@/utils/echarts";
  import { Tab, Tabs,Toast  } from 'vant';
  import TopBar from "components/TopBar";
  import * as echarts from 'echarts';

export default {
  name:'UserScoreStat',
  components: {
    TopBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
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
      period:7,
      chart: null,
      height:(document.documentElement.clientHeight-150)+'px'
    }
  },
  computed: {

  },
  mounted() {
    this.getChartData();
  },
  methods: {
    /**改变获取周期*/
    changePeriod(name,title){
      this.period = name;
      this.getChartData();
    },
    /**获取图表列表*/
    getChartData(){
      // 请求接口数据
      const para = {
        startDate:getDay(0-this.period),
        endDate:getNowDateString(),
        chartType:'LINE'
      }
      Toast.loading({
        forbidClick: true
      })
      getUserScoreStat(para).then(response => {
        if(this.chart == null){
          this.chart = echarts.init(document.getElementById(this.id));
        }
        this.chart.resize();
        createLineChart(response,this.chart);
      }).catch(() => {
      });
    }
  }
}
</script>

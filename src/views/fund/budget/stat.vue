<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">预算统计</span>
    </top-bar>
    <van-tabs v-model="dataType" @change="changeDataType">
      <van-tab title="月度预算"  name="MONTHLY"></van-tab>
      <van-tab title="年度预算" name="YEARLY"></van-tab>
    </van-tabs>
    <van-row type="flex" justify="center">
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="clock-o" :to="{ name:'BudgetLogStat' }" style="width: 100%;">历史预算</van-button>
      </van-col>
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="apps-o" :to="{ name:'BudgetInfoList' }" style="width: 100%;">预算列表</van-button>
      </van-col>
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="chart-trending-o" :to="{ name:'BudgetTimelineStat' }" style="width: 100%;">进度统计</van-button>
      </van-col>
    </van-row>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <span v-if="dataType=='MONTHLY'">
        <month-data/>
      </span>
      <span v-else>
        <year-data/>
      </span>
      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">消费与收入分析</van-divider>
      <!-- 消费 -->
      <pie-chart :chartData="consumeChartData"/>
      <!-- 收入 -->
      <pie-chart :chartData="incomeChartData"/>
    </van-pull-refresh>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
  </div>
</template>

<script>
  import { statWithTreat } from '@/api/consume/buyRecord'
  import { getIncomeStat } from '@/api/fund/income'
  import { Col,Row,PullRefresh,Dialog,Tab,Tabs,Divider  } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate,getMonthDateRange,getYearDateRange } from '@/utils/datetime'
  import MonthData from "./monthData";
  import YearData from "./yearData";
  import PieChart from "../../chart/pieChart";

export default {
  name:'BudgetStat',
  components: {
    'pie-chart':PieChart,
    TopBar,
    MonthData,
    YearData,
    [Col.name]: Col,
    [Row.name]: Row,
    [PullRefresh.name]: PullRefresh,
    [Dialog.Component.name]: Dialog.Component,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Divider.name]: Divider,

  },
  data() {
    return {
      dataType:'MONTHLY',
      //下拉刷新使用
      pullLoading:false,
      consumeDataList:[],
      consumeTitle:undefined,
      incomeDataList:[],
      incomeTitle:undefined,
      dailyData:{},
      //消费图表数据
      consumeChartData:{},
      //收入图表数据
      incomeChartData:{},
    }
  },
  computed: {

  },
  mounted() {
    this.getDataList();
  },
  methods: {
    /**改变获取数据类型*/
    changeDataType(name,title){
      this.dataType = name;
      this.resetSearch();
    },
    /**重置搜索*/
    resetSearch(){
      this.pullLoading = false;
      this.consumeDataList = [];
      this.consumeTitle = undefined;
      this.incomeDataList = [];
      this.incomeTitle = undefined;
      this.getDataList();
    },
    /**获取时间参数*/
    getDatePara(){
      if(this.dataType=='MONTHLY'){
        const ds = getMonthDateRange(new Date());
        const para = {
          startDate:ds[0],
          endDate:ds[1]
        }
        return para;
      }else{
        const ds = getYearDateRange(0);
        const para = {
          startDate:ds[0],
          endDate:ds[1]
        }
        return para;
      }
    },
    /**获取数据列表*/
    getDataList() {
      this.getConsumeDataList();
      this.getIncomeDataList();
    },
    /**获取消费统计*/
    getConsumeDataList() {
      // 请求接口数据
      const para = this.getDatePara();
      statWithTreat(para).then(response => {
        this.consumeChartData = response;
      }).catch(() => {
      });
    },
    /**获取消费统计*/
    getIncomeDataList() {
      // 请求接口数据
      const para = this.getDatePara();
      getIncomeStat(para).then(response => {
        this.incomeChartData = response;
      }).catch(() => {
      });
    }
  }
}
</script>

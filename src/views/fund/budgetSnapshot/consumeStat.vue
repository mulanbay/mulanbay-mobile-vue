<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">预算快照消费统计</span>
    </top-bar>
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
  import { stat } from '@/api/fund/budgetSnapshot'
  import {chartProps,createPieChart} from "@/utils/echarts";
  import TopBar from "components/TopBar";
  import { Toast  } from 'vant';
  import * as echarts from 'echarts';

export default {
  name:'BudgetSnapshotConsumeStat',
  components: {
    TopBar,
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
      //预算快照日志编号
      budgetLogId:undefined,
      chart: null,
      height:(document.documentElement.clientHeight-150)+'px'
    }
  },
  computed: {

  },
  mounted() {
    this.budgetLogId = this.$route.params.budgetLogId;
    this.getChartData();
  },
  methods: {
    /**获取图表列表*/
    getChartData(){
      // 请求接口数据
      const para = {
        budgetLogId:this.budgetLogId,
        page:0,
        needTotal:false
      }
      Toast.loading({
        forbidClick: true
      })
      stat(para).then(response => {
        this.chart = echarts.init(document.getElementById(this.id));
        this.chart.resize();
        createPieChart(response,this.chart);
      }).catch(() => {
      });
    }
  }
}
</script>

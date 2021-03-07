<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import * as echarts from 'echarts';
  import {createPieChart} from "@/utils/echarts";

export default {
  props: {
    className: {
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
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      height:'430px'
    }
  },
  watch: {
    chartData(newVal,oldVal){
      this.handleReceiveData(newVal);
    }
  },
  mounted() {
    this.$nextTick(() => {
      //this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleReceiveData(data){
      this.chartData =data;
      if(this.chartData.height!=null){
        this.height = this.chartData.height;
      }
      //解决定义高度后，无法resize问题
      let that=this;
      setTimeout(function()  {
        that.initChart()
      }, 100);
      //this.initChart();
    },
    initChart() {
      if(this.chartData==null){
        return;
      }
      if(this.chart==null){
        this.chart = echarts.init(this.$el);
      }
      createPieChart(this.chartData,this.chart);
    }
  }
}
</script>

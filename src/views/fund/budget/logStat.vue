<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">预算历史</span>
    </top-bar>
    <van-tabs v-model="dataType" @change="changeDataType">
      <van-tab title="月度预算"  name="MONTHLY"></van-tab>
      <van-tab title="年度预算" name="YEARLY"></van-tab>
    </van-tabs>
    <van-cell title="选择日期" :value="bussDay" @click="showDate = true" />
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <!-- 预算日志 -->
      <van-cell center value="预算快照" is-link class="van-ellipsis" :to="{ name:'BudgetSnapshot',params: {budgetLogId:budgetData.id} }">
        <template #icon>
          <svg-icon icon-class="budget" className="icon-list" />
        </template>
        <template #title>
          <span>{{bussDay}}预算完成情况</span>
          <van-tag type="danger" v-if="budgetData.cb>0">超支</van-tag>
        </template>
      </van-cell>
      <van-cell-group>
        <van-cell center class="custom-cell" title="预算金额" :value="formatMoney(budgetData.budgetAmount)" />
        <van-cell center class="custom-cell" title="普通消费" :value="formatMoney(budgetData.ncAmount)"/>
        <van-cell center class="custom-cell" title="突发消费" :value="formatMoney(budgetData.bcAmount)"/>
        <van-cell center class="custom-cell" title="看病花费" :value="formatMoney(budgetData.trAmount)"/>
        <van-cell center class="custom-cell" title="收入统计" :value="formatMoney(budgetData.incomeAmount)"/>
        <van-cell center class="custom-cell" title="总共消费" :value="formatMoney(budgetData.totalConsume)"/>
        <van-cell center class="custom-cell" :title="budgetData.cbTitle" :value="formatMoney(Math.abs(budgetData.cb))"/>
        <van-cell center class="custom-cell" :title="budgetData.ciTitle" :value="formatMoney(Math.abs(budgetData.ci))"/>
      </van-cell-group>
      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">消费与收入分析</van-divider>
      <!-- 消费 -->
      <van-cell-group>
        <van-cell center :value="consumeTitle" value-class="desc-class">
          <template #right-icon>
            <svg-icon icon-class="chart" className="icon-list" @click="consumeStat"/>
          </template>
        </van-cell>
        <van-cell v-for="(item, index) in consumeDataList" :key="index" center class="custom-cell">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <img src="@/assets/image/consume.png" width="20px" height="20px">
          </template>
          <template #title>
            <span class="custom-cell-title">{{item.name}}</span>
          </template>
          <template #default>
            <span class="custom-cell-title">{{formatMoney(item.value)}}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 收入 -->
      <van-cell-group>
        <van-cell center :value="incomeTitle" value-class="desc-class"/>
        <van-cell v-for="(item, index) in incomeDataList" :key="index" center class="custom-cell">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <img src="@/assets/image/income.png" width="20px" height="20px">
          </template>
          <template #title>
            <span class="custom-cell-title">{{item.name}}</span>
          </template>
          <template #default>
            <span class="custom-cell-title">{{formatMoney(item.value)}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </van-pull-refresh>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
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
  import { statWithTreat } from '@/api/consume/buyRecord'
  import { getIncomeStat } from '@/api/fund/income'
  import { getBudgetLogPeriodStat } from '@/api/fund/budgetLog'
  import { Col,Row,PullRefresh,Dialog,Tab,Tabs,Divider,DatetimePicker,Popup,Notify,Tag,Icon  } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate,getMonthDateRange } from '@/utils/datetime'

export default {
  name:'BudgetLogStat',
  components: {
    TopBar,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Col.name]: Col,
    [Row.name]: Row,
    [PullRefresh.name]: PullRefresh,
    [Dialog.Component.name]: Dialog.Component,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Divider.name]: Divider,
    [Tag.name]: Tag,
    [Icon.name]: Icon

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
      budgetData:{},
      bussDay:undefined,
      //van格式的时间
      vanDate:undefined,
      vanDateFormat:'year-month',
      //时间窗口
      showDate:false,
      //查询运营日的格式
      bussDayFormat:'yyyy-MM'
    }
  },
  computed: {

  },
  mounted() {
    this.initBussDay();
    this.getDataList();
  },
  methods: {
    /**初始化时间*/
    initBussDay(){
      //默认上一个月
      let now = new Date();
      now.setMonth(now.getMonth()-1);
      this.vanDate = now;
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
      this.resetSearch();
    },
    /**时间选择确定*/
    onConfirmDate(){
      this.bussDay = getFormatDate(this.vanDate,this.bussDayFormat);
      this.showDate = false;
      this.getDataList();
    },
    /**重置搜索*/
    resetSearch(){
      this.pullLoading = false;
      this.consumeDataList = [];
      this.consumeTitle = undefined;
      this.incomeDataList = [];
      this.incomeTitle = undefined;
      this.budgetData = {};
      this.getDataList();
    },
    /**获取时间参数*/
    getDatePara(){
      if(this.dataType=='MONTHLY'){
        const ds = getMonthDateRange(new Date(this.bussDay+'-01'));
        const para = {
          startDate:ds[0],
          endDate:ds[1]
        }
        return para;
      }else{
        const para = {
          startDate:this.bussDay+'-01-01',
          endDate:this.bussDay+'-12-31'
        }
        return para;
      }
    },
    /**消费统计*/
    consumeStat(){
      this.$router.push({name:'BudgetSnapshotConsumeStat',params: {budgetLogId:this.budgetData.id}})
    },
    /**获取数据列表*/
    getDataList() {
      this.getBudgetLogData();
      this.getConsumeDataList();
      this.getIncomeDataList();
    },
    /**获取消费统计*/
    getBudgetLogData() {
      // 请求接口数据
      const para = {
        bussKey:this.bussDay.replace('-','')
      };
      getBudgetLogPeriodStat(para).then(response => {
        if(response==null){
          Notify({ type: 'warning', message: '没有相应的数据' });
          return;
        }
        this.budgetData = response;
        this.budgetData.totalConsume = this.budgetData.ncAmount+this.budgetData.bcAmount+this.budgetData.trAmount;
        this.budgetData.cb = this.budgetData.totalConsume-this.budgetData.budgetAmount;
        if(this.budgetData.cb>0){
            this.budgetData.cbTitle='超出预算';
        }else{
            this.budgetData.cbTitle='低于预算';
        }
        this.budgetData.ci = this.budgetData.totalConsume-this.budgetData.incomeAmount;
        if(this.budgetData.ci>0){
            this.budgetData.ciTitle='存款减少';
        }else{
            this.budgetData.ciTitle='存款增加';
        }
      }).catch(() => {
      });
    },
    /**获取消费统计*/
    getConsumeDataList() {
      // 请求接口数据
      const para = this.getDatePara();
      statWithTreat(para).then(response => {
        this.consumeDataList = response.detailData[0].data;
        this.consumeTitle = response.title+'('+response.subTitle+')';
      }).catch(() => {
      });
    },
    /**获取消费统计*/
    getIncomeDataList() {
      // 请求接口数据
      const para = this.getDatePara();
      getIncomeStat(para).then(response => {
        this.incomeDataList = response.detailData[0].data;
        this.incomeTitle = response.title+'('+response.subTitle+')';
      }).catch(() => {
      });
    }
  }
}
</script>

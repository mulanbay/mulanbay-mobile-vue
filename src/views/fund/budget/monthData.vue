<!-- home -->
<template>
  <div>
    <van-cell center :value="formatMoney(budgetData.monthBudget)">
      <template #icon>
        <svg-icon icon-class="budget" className="icon-list" />
      </template>
      <template #title>
        <span>本月预算</span>
        <van-tag type="danger" v-if="budgetData.monthConsumeAmount>budgetData.monthBudget">超支</van-tag>
      </template>
    </van-cell>
    <van-cell-group>
      <van-cell center class="custom-cell" title="本月已经过去" center style="height: 30px;" :value="budgetData.dayMonthRate+'%('+budgetData.monthPassDays+'天)'"/>
      <van-cell center class="custom-cell" title="本月已经消费" :value="formatMoney(budgetData.monthConsumeAmount)"/>
      <van-cell center class="custom-cell" title="本月消费/预算比例" :value="budgetData.cbRate+'%'"/>
      <van-cell center class="custom-cell" title="本月剩余可消费" :value="formatMoney(budgetData.monthBudget-budgetData.monthConsumeAmount)"/>
      <van-cell center class="custom-cell" title="月度收入" :value="formatMoney(budgetData.totalIncome)"/>
      <van-cell center class="custom-cell" title="看病(自费)" :value="formatMoney(budgetData.totalTreatAmount)"/>
      <van-cell center class="custom-cell" title="新增存款" :value="formatMoney(budgetData.totalIncome- budgetData.totalConsumeAmount)"/>
      <van-cell center class="custom-cell" title="年度总预算" :value="formatMoney(budgetData.yearBudget)"/>
      <van-cell center :value="budgetData.sumInfo" value-class="desc-class"/>
    </van-cell-group>
  </div>
</template>

<script>
  import { generalStat } from '@/api/auth/main'
  import { getMonthDateRange } from '@/utils/datetime'
  import { getPercent } from '@/utils/index'
  import { Tag  } from 'vant';

export default {
  name:'BudgetMonthData',
  components: {
    [Tag.name]: Tag
  },
  data() {
    return {
      budgetData:{}
    }
  },
  computed: {

  },
  mounted() {
    this.getBudgetData();
  },
  methods: {
    getBudgetData(){
      //当月的
      const ds = getMonthDateRange(new Date());
      const para = {
        startDate:ds[0],
        endDate:ds[1]
      }
      generalStat(para).then(response => {
        this.budgetData = response;
        this.budgetData.dayMonthRate=this.budgetData.dayMonthRate.toFixed(0);
        if(this.budgetData.monthBudget>0){
          this.budgetData.cbRate = getPercent(this.budgetData.monthConsumeAmount,this.budgetData.monthBudget);
        }
        let aa = (this.budgetData.monthConsumeAmount)*(this.budgetData.monthDays)/(this.budgetData.monthPassDays);
        if(aa>this.budgetData.monthBudget){
          this.budgetData.sumInfo = '本月预期总消费金额:'+this.formatMoney(aa)+'元,超出预算值'+this.formatMoney(aa-this.budgetData.monthBudget)+'元';
          this.budgetData.flow =-1;
        }else{
          this.budgetData.sumInfo = '本月预期总消费金额:'+this.formatMoney(aa)+'元,低于预算值'+this.formatMoney(this.budgetData.monthBudget-aa)+'元';
          this.budgetData.flow =1;
        }
      }).catch(() => {
      });
    }
  }
}
</script>

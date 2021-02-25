<!-- home -->
<template>
  <div>
    <van-cell center :value="formatMoney(budgetData.yearBudget)">
      <template #icon>
        <svg-icon icon-class="budget" className="icon-list" />
      </template>
      <template #title>
        <span>今年预算</span>
        <van-tag type="danger" v-if="budgetData.totalConsumeAmount+budgetData.totalTreatAmount>budgetData.yearBudget">超支</van-tag>
      </template>
    </van-cell>
    <van-cell-group>
      <van-cell center class="custom-cell" title="已消费" :value="formatMoney(budgetData.totalConsumeAmount+budgetData.totalTreatAmount)"/>
      <van-cell center class="custom-cell" title="今年消费/预算比例" :value="budgetData.cbRate+'%'"/>
      <van-cell center class="custom-cell" title="今年剩余可消费" :value="formatMoney(budgetData.yearBudget -(budgetData.totalConsumeAmount+budgetData.totalTreatAmount))"/>
      <van-cell center class="custom-cell" title="今年收入" :value="formatMoney(budgetData.totalIncome)"/>
      <van-cell center class="custom-cell" title="看病(自费)" :value="formatMoney(budgetData.totalTreatAmount)"/>
      <van-cell center class="custom-cell" title="新增存款" :value="formatMoney(budgetData.totalIncome- budgetData.totalConsumeAmount)"/>
      <van-cell center class="custom-cell" title="本月预算" :value="formatMoney(budgetData.monthBudget)"/>
    </van-cell-group>
  </div>
</template>

<script>
  import { generalStat } from '@/api/auth/main'
  import { getYearDateRange } from '@/utils/datetime'
  import { getPercent } from '@/utils/index'
  import { Tag  } from 'vant';

export default {
  name:'BudgetYearData',
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
      //当年的
      const ds = getYearDateRange(0);
      const para = {
        startDate:ds[0],
        endDate:ds[1]
      }
      generalStat(para).then(response => {
        this.budgetData = response;
        this.budgetData.dayMonthRate=this.budgetData.dayMonthRate.toFixed(0);
        if(this.budgetData.yearBudget>0){
          this.budgetData.cbRate = getPercent((this.budgetData.totalConsumeAmount+this.budgetData.totalTreatAmount),this.budgetData.yearBudget);
        }
      }).catch(() => {
      });
    }
  }
}
</script>

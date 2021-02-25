<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">预算快照</span>
    </top-bar>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <van-list
        v-model="pushLoading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="10"
      >
      <van-cell-group v-for="(item, index) in dataList" :key="index" >
        <van-cell center is-link >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <svg-icon icon-class="budget" className="icon-list" />
          </template>
          <template #title>
            <span class="custom-cell-title">{{item.name}}</span>
          </template>
          <template #default>
            <span class="custom-cell-title">预算金额:{{formatMoney(item.amount)}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="预算类型">
          <template #default>
            <span class="custom-cell-title">{{item.typeName}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="周期类型">
          <template #default>
            <span class="custom-cell-title">{{item.periodName}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="支付时间">
          <template #default>
            <span class="custom-cell-title">{{item.cpPaidTime}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="实际花费金额">
          <template #default>
            <span class="custom-cell-title">{{formatMoney(item.cpPaidAmount)}}</span>
          </template>
        </van-cell>
        <van-cell center :value="item.remark" value-class="desc-class"/>
      </van-cell-group>

      </van-list>
    </van-pull-refresh>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
  </div>
</template>

<script>
  import { fetchList } from '@/api/fund/budgetSnapshot'
  import { Col,Row,List,PullRefresh,Tag } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate } from '@/utils/datetime'

export default {
  name:'BudgetSnapshot',
  components: {
    TopBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Tag.name]: Tag
  },
  data() {
    return {
      //下拉刷新使用
      pullLoading:false,
      //列表上拉的刷新使用
      pushLoading: false,
      finished: false,
      page:0,
      dataList:[],
      //预算快照日志编号
      budgetLogId:undefined
    }
  },
  computed: {

  },
  mounted() {
    this.budgetLogId = this.$route.params.budgetLogId;
    this.getDataList();
  },
  methods: {
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
      const para = {
        budgetLogId:this.budgetLogId,
        page:0,
        needTotal:false
      }
      fetchList(para).then(response => {
        this.pushLoading = false;
        this.dataList = response.rows;
        //没有分页功能
        this.finished = true;
      })
    }
  }
}
</script>

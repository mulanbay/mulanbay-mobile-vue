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
        <van-cell center  :to="{ name:'BudgetSnapshotChildren',params: {snapshotId:item.snapshotId} }">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <svg-icon icon-class="budget" className="icon-list" />
          </template>
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon v-if="item.hasChild==true">
            <van-icon name="arrow" />
          </template>
          <template #title>
            <span class="custom-cell-title">{{item.name}}</span>
            <van-tag type="danger" v-if="item.rate>100">超支</van-tag>
          </template>
          <template #default>
            <span class="custom-cell-title" v-if="item.hasChild==false">{{ parseInt(item.rate.toFixed(0))+'%'}}</span>
            <span v-else>详情</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="预算金额" v-if="item.hasChild==false">
          <template #default>
            <span class="custom-cell-title">{{formatMoney(item.amount)}}</span>
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
        <van-cell center class="custom-cell" title="支付时间" v-if="item.cpPaidTime!=null">
          <template #default>
            <span class="custom-cell-title">{{item.cpPaidTime}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="实际花费金额" v-if="item.cpPaidAmount!=null">
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
  import { getList as getBudgetSnapshotData } from '@/api/fund/budgetSnapshot'
  import { Col,Row,List,PullRefresh,Tag,Icon } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate } from '@/utils/datetime'
  import { getPercent } from '@/utils/index'

export default {
  name:'BudgetSnapshot',
  components: {
    TopBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Tag.name]: Tag,
    [Icon.name]: Icon
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
    /**展示子类*/
    showChildren(snapshotId){
      alert(snapshotId);
    },
    /**获取数据列表*/
    getDataList() {
      this.pushLoading = true;
      // 请求接口数据
      const para = {
        budgetLogId:this.budgetLogId
      }
      getBudgetSnapshotData(para).then(response => {
        this.pushLoading = false;
        this.dataList = new Array();
        let datas = response;
        this.dataList = datas;
        //没有分页功能
        this.finished = true;
      })
    }
  }
}
</script>

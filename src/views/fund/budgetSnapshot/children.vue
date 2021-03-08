<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">预算子列表</span>
    </top-bar>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <van-list
        v-model="pushLoading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="10"
      >
      <!-- 统计数据 -->
      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">{{title}}</van-divider>
      <van-cell title="数据条数" :value="statData.count+'条'" />
      <van-cell title="预算总计" :value="formatMoney(statData.budgetAmount)"  />
      <van-cell title="实际花费" :value="formatMoney(statData.cpPaidAmount)" />
      <van-cell title="花费/预算比例" :value="statData.rate.toFixed(0)+'%'"  />

      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">数据列表</van-divider>
      <!-- 列表数据 -->
      <van-cell-group v-for="(item, index) in dataList" :key="index" >
        <van-cell center>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <svg-icon icon-class="budget" className="icon-list" />
          </template>
          <template #title>
            <span class="custom-cell-title">{{item.bussKey}}</span>
            <van-tag type="danger" v-if="item.rate>100">超支</van-tag>
          </template>
          <template #default>
            <span class="custom-cell-title">{{ parseInt(item.rate.toFixed(0))+'%'}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="预算金额">
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
  import { getChildren } from '@/api/fund/budgetSnapshot'
  import { Col,Row,List,PullRefresh,Tag,Icon,Divider } from 'vant';
  import TopBar from "components/TopBar";
  import { getNowDateString,getFormatDate,getDayByDate } from '@/utils/datetime'
  import { getPercent } from '@/utils/index'

export default {
  name:'BudgetSnapshotChildren',
  components: {
    TopBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [Divider.name]: Divider
  },
  data() {
    return {
      //下拉刷新使用
      pullLoading:false,
      //列表上拉的刷新使用
      pushLoading: false,
      finished: false,
      page:0,
      //统计信息
      statData:{
        budgetAmount:0,
        cpPaidAmount:0,
        bussKey:undefined,
        rate:0,
        name:undefined,
        count:0
      },
      dataList:[],
      title:'',
      //预算快照日志
      snapshotId:undefined
    }
  },
  computed: {

  },
  mounted() {
    this.snapshotId = this.$route.params.snapshotId;
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
        snapshotId:this.snapshotId,
        needChart:false
      }
      getChildren(para).then(response => {
        this.pushLoading = false;
        let count =0;
        if(response.children!=null){
          count =response.children.length;
        }
        this.statData = {
          budgetAmount:response.budgetAmount,
          cpPaidAmount:response.cpPaidAmount,
          bussKey:response.bussKey,
          rate:response.rate,
          name:response.name,
          count:count
        }
        this.title = '['+this.statData.name+']'+this.statData.bussKey+'统计';
        this.dataList = response.children;
        //没有分页功能
        this.finished = true;
      })
    }
  }
}
</script>

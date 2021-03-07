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
        <van-cell center is-link click="showChildren">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #icon>
            <svg-icon icon-class="budget" className="icon-list" />
          </template>
          <template #title>
            <span class="custom-cell-title">{{item.name}}</span>
            <van-tag type="danger" v-if="item.pp>100">超支</van-tag>
          </template>
          <template #default>
            <span class="custom-cell-title">{{item.pp+'%'}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="预算金额">
          <template #default>
            <span class="custom-cell-title">{{formatMoney(item.amount)}}</span>
            <van-tag type="primary" v-if="item.n>1">{{ '×'+item.n }}</van-tag>
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
  import { getList as getBudgetSnapshotData } from '@/api/fund/budgetSnapshot'
  import { Col,Row,List,PullRefresh,Tag } from 'vant';
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
    /**展示子类*/
    showChildren(){
      alert('aaa');
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
        const n = datas.length;
        for(let i=0;i<n;i++){
          let n=1;
          if(datas[i].children!=null){
            n = datas[i].children.length;
          }
          datas[i].n = n;
          if(datas[i].cpPaidAmount==null){
            datas[i].pp = 0;
          }else{
            let aiv = getPercent(datas[i].cpPaidAmount,datas[i].amount*n);
            datas[i].pp = parseInt(aiv.toFixed(0));
          }
        }
        this.dataList = datas;
        //没有分页功能
        this.finished = true;
      })
    }
  }
}
</script>

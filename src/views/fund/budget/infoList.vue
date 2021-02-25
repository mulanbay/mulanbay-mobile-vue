<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">当前预算</span>
    </top-bar>
    <van-tabs v-model="dataType" @change="changeDataType">
      <van-tab title="本月预算"  name="MONTHLY"></van-tab>
      <van-tab title="今年预算" name="YEARLY"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <van-list
        v-model="pushLoading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="10"
        @load="onLoad"
      >
      <van-cell-group v-for="(item, index) in dataList" :key="index" >
        <van-swipe-cell>
          <template #left>
            <van-button square type="primary" text="详情"/>
          </template>
          <van-cell center is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <svg-icon icon-class="budget" className="icon-list" />
            </template>
            <template #title>
              <span class="custom-title">{{item.name}}</span>
            </template>
            <template #default>
              <span class="van-ellipsis">预算金额:{{formatMoney(item.amount)}}</span>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除"/>
          </template>
        </van-swipe-cell>
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
        <van-cell center class="custom-cell" v-if="item.cpPaidTime!=null">
          <template #title>
            实际花费金额
            <van-tag type="danger" v-if="item.cpPaidAmount>item.amount">超支</van-tag>
          </template>
          <template #default>
            <span class="custom-cell-title">{{formatMoney(item.cpPaidAmount)+formatPercent(item)}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="预期支付时间" v-if="item.nextPaytime!=null">
          <template #default>
            <span class="custom-cell-title">{{item.nextPaytime}}</span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="剩余支付天数" v-if="item.leftDays>0">
          <template #default>
            <span class="custom-cell-title">
              <van-count-down :time="item.leftDays*24*3600*1000" format="DD 天 HH 时 mm 分 ss 秒"/>
            </span>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="已经过去天数" v-if="item.leftDays<0">
          <template #default>
            <span class="custom-cell-title">
              <span class="custom-cell-title">{{formatLeftDays(item.leftDays)}}</span>
            </span>
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
  import { getInfoList } from '@/api/fund/budget'
  import { Col,Row,List,PullRefresh,Tab,Tabs,Icon,SwipeCell,CountDown,Tag  } from 'vant';
  import TopBar from "components/TopBar";
  import { formatDateDesc,formatDays } from '@/utils/datetime'

export default {
  name:'BudgetInfoLIst',
  components: {
    TopBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [SwipeCell.name]: SwipeCell,
    [CountDown.name]: CountDown,
    [Tag.name]: Tag
  },
  data() {
    return {
      dataType:'MONTHLY',
      //下拉刷新使用
      pullLoading:false,
      //列表上拉的刷新使用
      pushLoading: false,
      finished: false,
      //当前页，是第一次加载是van-list的onLoad触发，所以为0
      page:0,
      //搜索关键字
      name:undefined,
      dataList:[]
    }
  },
  computed: {

  },
  mounted() {
    this.getDataList();
  },
  methods: {
    formatLeftDays(days){
      if(days<0){
        return formatDays(0-days);
      }
    },
    formatPercent(item){
      if(item.cpPaidAmount==null){
        return '';
      }
      let p = Math.round(item.cpPaidAmount / item.amount * 100);
      return '('+p+'%)';
    },
    /**改变获取数据类型*/
    changeDataType(name,title){
      this.dataType = name;
      this.resetSearch();
    },
    /**重置搜索*/
    resetSearch(){
      this.reset();
      this.getDataList();
    },
    /**重置*/
    reset() {
      this.pullLoading = false;
      this.dataList = [];
      this.page=1;
      this.finished = false;
    },
    /**获取数据列表*/
    getDataList() {
      this.pushLoading = true;
      // 请求接口数据
      const para = {
        period:this.dataType
      }
      getInfoList(para).then(response => {
        this.pushLoading = false;
        this.dataList = response;
        //不分页
        this.finished = true;
      }).catch(() => {
      });
    },
    /**下拉刷新*/
    onLoad(){
      this.page+=1;
      this.getDataList();
    }
  }
}
</script>

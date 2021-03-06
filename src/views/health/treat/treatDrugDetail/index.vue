<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">用药明细管理</span>
    </top-bar>
    <van-search
      v-model="para.name"
      show-action
      @search="handleSearch"
      @clear="resetSearch"
      shape="round"
      background="#fcfdff"
      placeholder="请输入搜索关键词">
      <template #action>
        <slot name="share" >
          <van-icon name="search" size="25px" color="#099" @click="handleSearch" slot="leftIcon"/>
        </slot>
      </template>
    </van-search>
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

          </template>
          <van-cell center is-link :to="{ name:'TreatDrugDetailEdit',params: {id:item.id,r:true} }">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <svg-icon icon-class="drug" className="icon-list" />
            </template>
            <template #title>
              <span class="custom-title">{{beautifyDateTime(item.occurTime)}}</span>
            </template>
            <template #default>
              <span class="van-ellipsis">{{formatHour(item.occurTime)}}</span>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除"  @click="handleDelete(item.id)" />
          </template>
        </van-swipe-cell>

        <van-cell :value="item.remark" value-class="desc-class" />
      </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <van-button round block type="primary" class="btn-block" :to="{ name:'TreatDrugDetailAdd',params: {treatTrugId:para.treatDrugId,r:true} }" >
        新增
    </van-button>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
  </div>
</template>

<script>
  import { fetchList,deleteTreatDrugDetail } from '@/api/health/treat/treatDrugDetail'
  import { Col,Row,List,PullRefresh,Tag,Dialog,SwipeCell,Search,Icon,Notify  } from 'vant';
  import TopBar from "components/TopBar";
  import { formatDateDesc,formatSeconds,getHourDesc } from '@/utils/datetime'

export default {
  name:'TreatDrugDetail',
  components: {
    TopBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Dialog.Component.name]: Dialog.Component,
    [Notify.Component.name]: Notify.Component,
    [SwipeCell.name]: SwipeCell
  },
  data() {
    return {
      //下拉刷新使用
      pullLoading:false,
      //列表上拉的刷新使用
      pushLoading: false,
      finished: false,
      //当前页，是第一次加载是van-list的onLoad触发，所以为0
      para:{
        page:0,
        name:undefined,
        pageSize:10,
        needTotal:false
      },
      //搜索关键字
      name:undefined,
      dataList:[]
    }
  },
  computed: {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const r = to.params.r;
      if(true==r){
        //console.log('来自编辑成功页面，刷新，name:'+from.name);
        /**
         * 在beforeRouteEnter时，页面还没有渲染，新进入组件还没有被创建，无法获取this实例
         * 通过“vm”访问组件实例`,可以通过vm.name去访问data里面的name属性，跟this.name一样效果
         * */
        vm.resetSearch();
      }
    })
  },
  activated() {
  },
  mounted() {
    this.para.treatDrugId = this.$route.params.treatDrugId;
    //this.getMessageList();
  },
  methods: {
    /**格式时间*/
    formatHour(date){
      return getHourDesc(date);
    },
    /**搜索*/
    handleSearch(){
      this.reset();
      this.getDataList();
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
      this.para.page=1;
      this.finished = false;
    },
    /**获取数据列表*/
    getDataList() {
      this.pushLoading = true;
      fetchList(this.para).then(response => {
        this.pushLoading = false;
        this.dataList = this.dataList.concat(response.rows);
        if(response.rows.length==0){
          this.finished = true;
        }
      }).catch(() => {
      });
    },
    /**删除消息*/
    handleDelete(id) {
      Dialog.confirm({
        title: '确认删除?',
        message: '您是否要删除该条记录?',
      }).then(() => {
        //确认
        deleteTreatDrugDetail(id).then(response => {
          Notify({ type: 'success', message: '删除成功' });
          this.resetSearch();
        })
      }).catch(() => {
        //取消
      });
    },
    /**下拉刷新*/
    onLoad(){
      this.para.page+=1;
      this.getDataList();
    }
  }
}
</script>

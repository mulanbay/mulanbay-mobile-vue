<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">睡眠管理</span>
    </top-bar>
    <van-row type="flex" justify="center">
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="clock-o" @click="handleSleep" style="width: 100%;">睡觉</van-button>
      </van-col>
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="smile-o" @click="handleGetUp" style="width: 100%;">起床</van-button>
      </van-col>
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="add-o" :to="{ name:'SleepAdd' }" style="width: 100%;">新增</van-button>
      </van-col>
    </van-row>
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
          <van-cell center is-link :to="{ name:'SleepEdit',params: {id:item.id} }">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <svg-icon icon-class="sleep" className="icon-list" />
            </template>
            <template #title>
              <span class="custom-title">{{beautifyDate(item.sleepDate)}}</span>
              <van-tag type="danger" v-if="item.quality<6">差</van-tag>
            </template>
            <template #default>
              <span class="van-ellipsis">睡眠质量:{{item.quality}}</span>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除"  @click="handleDelete(item.id)" />
          </template>
        </van-swipe-cell>
        <van-cell center class="custom-cell" title="睡觉时间" :value="beautifyDateTime(item.sleepTime)" />
        <van-cell center class="custom-cell" title="起床时间" :value="beautifyDateTime(item.getUpTime)" />
        <van-cell center class="custom-cell" title="睡眠时长" :value="formatSleepTimes(item.totalMinutes)" />
        <van-cell :value="item.remark" value-class="desc-class" />
      </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <!--
    <van-button round block type="primary" class="btn-block" :to="{ name:'SleepAdd',params: {} }" >
        新增
    </van-button>
    -->
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
  </div>
</template>

<script>
  import { fetchList,deleteSleep,sleep,getUp } from '@/api/health/body/sleep'
  import { Col,Row,List,PullRefresh,Tag,Dialog,SwipeCell,Search,Icon,Notify  } from 'vant';
  import TopBar from "components/TopBar";
  import { formatDateDesc,formatSeconds,getNowDateTimeString } from '@/utils/datetime'

export default {
  name:'Sleep',
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
        //搜索关键字
        name:undefined,
        pageSize:10,
        needTotal:false
      },
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
    //this.getMessageList();
  },
  methods: {
    /**格式时间*/
    formatSleepDate(date){
      return date.substr(0,16);
    },
    formatSleepTimes(minutes){
      return formatSeconds(minutes*60);
    },
    /**快速睡觉*/
    handleSleep(){
      const formData ={
        sleepTime:getNowDateTimeString()
      }
      sleep(formData).then(response => {
        Notify({ type: 'success', message: '晚安,早起早睡.' });
        this.handleSearch();
      }).catch(() => {
      });
    },
    /**快速起床*/
    handleGetUp(){
      const formData ={
        getUpTime:getNowDateTimeString()
      }
      getUp(formData).then(response => {
        Notify({ type: 'success', message: '早安,开始美好新的一天!' });
        this.handleSearch();
      }).catch(() => {
      });
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
        deleteSleep(id).then(response => {
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

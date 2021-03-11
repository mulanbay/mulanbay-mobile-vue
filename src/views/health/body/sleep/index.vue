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
        <van-steps direction="vertical" :active="item.getUpTime==null ? 0:2"  active-icon="clock-o" >
          <van-step>
            <span style="color: #550000;">
              {{formatTime(item.sleepTime)}}
            </span>
          </van-step>
          <van-step>
            <van-card>
              <template #title>
                <svg-icon icon-class="title"/>
                <span class="card-title">
                  {{beautifyDate(item.sleepDate)}}
                </span>
              </template>
              <template #tag>
                <van-tag type="danger" v-if="item.quality<3">差</van-tag>
              </template>
              <template #desc>
                </br>
                <svg-icon icon-class="content"/>
                  睡眠时长:{{formatSleepTimes(item.totalMinutes)}}
                </br>
                <svg-icon icon-class="item"/>
                睡眠质量:<van-rate v-model="item.quality" :count="5" readonly color="#ffd21e"/>
                </br>
                <svg-icon icon-class="content"/>
                {{item.remark}}
              </template>
              <template #thumb>
                <svg-icon icon-class="sleep" className="icon-card" />
              </template>
            </van-card>
            <van-row type="flex" justify="center">
              <van-col span="12" style="text-align: center;">
                <van-button plain class="app-menu-color" size="small" icon="edit"  :to="{ name:'SleepEdit',params: {id:item.id} }" style="width: 100%;" >修改</van-button>
              </van-col>
              <van-col span="12" style="text-align: center;">
                <van-button plain class="app-menu-color" size="small" icon="delete-o"  @click="handleDelete(item.id)" style="width: 100%;">删除</van-button>
              </van-col>
            </van-row>
          </van-step>
          <van-step>
            <span style="color: #550000;">
              {{formatTime(item.getUpTime)}}
            </span>
          </van-step>
        </van-steps>
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
  import { Col,Row,List,PullRefresh,Tag,Dialog,Search,Icon,Notify,Rate,Step, Steps,Card  } from 'vant';
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
    [Rate.name]: Rate,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Card.name]: Card
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
        //console.log('来自新增成功页面，刷新，name:'+from.name);
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
    /**格式睡眠时间*/
    formatTime(time){
      if(time==null){
        return '';
      }else{
        return time.substr(11,5);
      }
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

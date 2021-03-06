<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">用药管理</span>
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
        <slot name="share" >
          <van-icon name="calendar-o" size="25px" color="#099" @click="handleCalendar" slot="leftIcon"/>
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
          <van-cell center>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <svg-icon icon-class="drug" className="icon-list" />
            </template>
            <template #title>
              {{item.name}}
              <span style="color: #ed0000;" v-if="isTaking(item)==true">(用药中)</span>
            </template>
            <template #default>
              {{item.perDay}}天{{item.perTimes}}次
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除"  @click="handleDelete(item.id)" />
          </template>
        </van-swipe-cell>
        <van-cell center class="custom-cell" title="用药量" :value="'每次'+item.ec+item.eu" />
        <van-cell center class="custom-cell" title="使用方式" :value="item.useWay" />
        <van-cell center class="custom-cell" title="针对疾病" :value="item.disease" />
        <van-cell center class="custom-cell" title="用药日期" :value="item.beginDate+'~'+item.endDate" />
        <van-cell center class="custom-cell" title="医院" :value="item.treatRecord.hospital" />
        <van-cell center class="custom-cell" title="看病日期" :value="item.treatDate" />
        <van-cell center class="custom-cell" title="器官" :value="item.treatRecord.organ" />
        <van-cell center class="custom-cell" title="疾病症状" :value="item.disease" />
        <van-cell center class="custom-cell" title="数量" :value="item.amount+item.unit" />
        <van-row type="flex" justify="center">
          <van-col span="8" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="add-o" :to="{ name:'TreatDrugDetailAdd',params: {treatDrugId:item.id,r:false} }" style="width: 100%;">新增用药</van-button>
          </van-col>
          <van-col span="8" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="apps-o" :to="{ name:'TreatDrugDetail',params: {treatDrugId:item.id} }" style="width: 100%;">用药记录</van-button>
          </van-col>
          <van-col span="8" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="delete-o" @click="handleDelete(item.id)" style="width: 100%;">删除</van-button>
          </van-col>
        </van-row>
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
  import { fetchList,deleteTreatDrug } from '@/api/health/treat/treatDrug'
  import { Col,Row,List,PullRefresh,Dialog,SwipeCell,Search,Notify,Tab,Tabs,Icon  } from 'vant';
  import TopBar from "components/TopBar";
  import { formatDateDesc } from '@/utils/datetime'

export default {
  name:'TreatDrug',
  components: {
    TopBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Search.name]: Search,
    [Dialog.Component.name]: Dialog.Component,
    [Notify.Component.name]: Notify.Component,
    [SwipeCell.name]: SwipeCell,
    [Icon.name]: Icon
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
        pageSize:10,
        name:undefined,
        needTotal:false
      },
      //搜索关键字
      name:undefined,
      //数据列表
      dataList:[]
    }
  },
  computed: {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const r = to.params.r;
      if(true==r){
        vm.resetSearch();
      }
    })
  },
  mounted() {
    //this.getMessageList();
  },
  methods: {
    /**是否在用药*/
    isTaking(item){
      let now = new Date();
      let beginDate = new Date(item.beginDate);
      let endDate = new Date(item.endDate);
      if(now-beginDate>0 &&now-endDate<0){
        return true;
      }else{
        return false;
      }
    },
    /**用药日历*/
    handleCalendar(){
      this.$router.push({ name: 'TreatDrugCalendar', params: { }});
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
        deleteTreatDrug(id).then(response => {
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

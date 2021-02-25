<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">阅读管理</span>
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
          <van-cell center is-link :to="{ name:'ReadingRecordEdit',params: {id:item.id} }">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <svg-icon icon-class="sick" className="icon-list" />
            </template>
            <template #title>
              <span class="custom-title">{{item.bookCategory.name}}</span>
            </template>
            <template #default>
              <span style="color: #6c0000;" v-if="item.status=='READING'">{{item.statusName}}</span>
              <span style="color: red;" v-else-if="item.status=='UNREAD'">{{item.statusName}}</span>
              <span style="color: #78b47a;" v-else-if="item.status=='READED'">{{item.statusName}}</span>
              <span style="color: #707070;" v-else>{{item.statusName}}</span>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除"  @click="handleDelete(item.id)" />
          </template>
        </van-swipe-cell>
        <van-cell center class="custom-cell" title="作者" :value="item.author" />
        <van-cell center class="custom-cell" title="国家" :value="item.nation" />
        <van-cell center class="custom-cell" title="借入/购买日期" :value="item.storeDate" />
        <van-cell :value="item.bookName" value-class="desc-class"/>
        <van-row type="flex" justify="center">
          <van-col span="8" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="add-o" :to="{ name:'ReadingRecordDetailAdd',params: {readingRecordId:item.id} }" style="width: 100%;">新增阅读</van-button>
          </van-col>
          <van-col span="8" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="apps-o" :to="{ name:'ReadingRecordDetail',params: {readingRecordId:item.id,fromPath:'ReadingRecord'} }" style="width: 100%;">阅读记录</van-button>
          </van-col>
          <van-col span="8" style="text-align: center;">
            <van-button plain class="app-menu-color" size="small" icon="delete-o" @click="handleDelete(item.id)" style="width: 100%;">删除</van-button>
          </van-col>
        </van-row>
      </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <van-button round block type="primary" class="btn-block" :to="{ name:'ReadingRecordAdd',params: {} }" >
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
  import { fetchList,deleteReadingRecord } from '@/api/read/readingRecord'
  import { Col,Row,List,PullRefresh,Dialog,SwipeCell,Search,Notify,Tab,Tabs,Icon  } from 'vant';
  import TopBar from "components/TopBar";
  import { formatDateDesc } from '@/utils/datetime'

export default {
  name:'ReadingRecord',
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
        deleteReadingRecord(id).then(response => {
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

<!-- home -->
<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">消息中心</span>
    </top-bar>
    <van-search
      v-model="name"
      show-action
      @search="handleSearch"
      @clear="resetSearch"
      shape="round"
      background="#fcfdff"
      placeholder="请输入搜索关键词">
      <template #action>
        <slot name="share" >
          <!--
          <img src="@/assets/image/face.png" width="28" height="28" @click="handleFaceMatch" />
          -->
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
            <van-button square type="primary" text="详情"  @click="showMessageContent(item)"/>
          </template>
          <van-cell center is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <svg-icon icon-class="message" className="icon-list" />
            </template>
            <template #title>
              <span class="custom-title">{{beautifyDateTime(item.expectSendTime)}}</span>
            </template>
            <template #default>
              <span class="van-ellipsis" @click="showMessageContent(item)">{{item.title}}</span>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除"  @click="handleDelete(item.id)" />
            <van-button square type="primary" text="重发"   @click="handleResend(item.id)"/>
          </template>
        </van-swipe-cell>
        <van-cell center class="custom-cell" title="状态" >
          <template #default>
            <van-tag type="danger" v-if="item.sendStatus=='UN_SEND'">{{item.sendStatusName}}</van-tag>
            <van-tag type="success" v-else>{{item.sendStatusName}}</van-tag>
          </template>
        </van-cell>
        <van-cell center class="custom-cell" title="代码" :value="item.code" />
        <van-cell center class="custom-cell" title="类型" :value="item.bussTypeName" />
        <van-cell :value="item.content" value-class="desc-class"/>
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
  import { getMyList,deleteUserMessage,resendUserMessage } from '@/api/message/userMessage'
  import { Col,Row,List,PullRefresh,Tag,Dialog,SwipeCell,Search,Icon,Notify  } from 'vant';
  import TopBar from "components/TopBar";

export default {
  name:'UserMessage',
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
      page:0,
      //搜索关键字
      name:undefined,
      dataList:[]
    }
  },
  computed: {

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
      this.page=1;
      this.finished = false;
    },
    /**获取数据列表*/
    getDataList() {
      this.pushLoading = true;
      // 请求接口数据
      const para = {
        page:this.page,
        pageSize:10,
        name:this.name,
        needTotal:false
      }
      getMyList(para).then(response => {
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
        message: '您是否要删除该条消息?',
      }).then(() => {
        //确认
        deleteUserMessage(id).then(response => {
          Notify({ type: 'success', message: '删除成功' });
          this.resetSearch();
        })
      }).catch(() => {
        //取消
      });
    },
    /**重发消息*/
    handleResend(id) {
      Dialog.confirm({
        title: '确认重发?',
        message: '您是否要重发该条消息?',
      }).then(() => {
        //确认
        resendUserMessage(id).then(response => {
          Notify({ type: 'success', message: '重发成功' });
        })
      }).catch(() => {
        //取消
      });
    },
    /**展示消息内容*/
    showMessageContent(item){
      Dialog.alert({
        title: item.title,
        message: item.content,
      }).then(() => {
        // on close
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

<template>
  <div>
    <top-bar>
      <span slot="topText" class="top-text">智能客服</span>
    </top-bar>
    <div ref="main" >
      <div class="lite-chatbox" id="res" :style="{height:height,margin:0 }">
        <div v-for="(item,i) in dataList">
          <div v-if="item.type=='umg'" class="cright cmsg">
            <img class="headIcon radius" ondragstart="return false;"  oncontextmenu="return false;"  src="@/assets/image/user.png"/>
            <span class="name">{{item.name}}</span>
            <span class="content">{{item.content}}</span>
          </div>
          <div v-else-if="item.type=='csmg'" class="cleft cmsg">
            <img class="headIcon radius" ondragstart="return false;"  oncontextmenu="return false;"  src="@/assets/image/logo.png"/>
            <span class="name">{{item.name}}</span>
            <span class="content">{{item.content}}</span>
          </div>
          <div v-else class="tips">
            <span class="tips-danger">{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
    <van-field
      v-model="reqText"
      name="地点"
      style="position: fixed;"
      @keyup.enter.native="sendReq"
      placeholder="请输入">
      <template #button>
       <van-button round class="app-color" text="发送"  size="small" @click="sendReq()"/>
       <van-button round type="warning" text="清空" size="small"  @click="clearCs()"/>
      </template>
    </van-field>
  </div>
</template>

<script>
  import {textReq} from "@/api/system/qaConfig";
  import TopBar from "components/TopBar";
  import {Field} from 'vant';

export default {
  name: "CustomService",
  components: {
    TopBar,
    [Field.name]:Field
  },
  data() {
    return {
      //列表数据
      dataList:[],
      reqText:'',
      cacheKey:'cs_cache',
      height:(document.documentElement.clientHeight-110)+'px'
    };
  },
  created() {
    //加载缓存
    let his = localStorage.getItem(this.cacheKey);
    if(this.isObjectEmpty(his)){
      this.dataList=[];
    }else{
      this.dataList = JSON.parse(his);
    }
  },
  //监听父层带过来的账户信息值
  watch:{
  },
  methods: {
    // 判断是否为空
    isObjectEmpty(o) {
      if (o === undefined || o === null || o === '') {
        return true;
      }
      return false;
    },
    //处理用户的请求
    sendReq(){
      let userMessage = this.generateUserMessage(this.reqText);
      this.dataList.push(userMessage);
      this.appendCache(userMessage);
      //this.showResBottom();
      let para = {content : this.reqText,source:'PC'};
      textReq(para).then(
        response => {
          let csMessage;
          if(this.isObjectEmpty(response.res)){
            csMessage = this.generateTipsMessage('无法处理您的请求!');
          }else{
            //在样式中添加white-space:pre识别换行符
            csMessage = this.generateCsMessage(response.res);
          }
          this.dataList.push(csMessage);
          this.showResBottom();
          this.appendCache(csMessage);
          this.reqText=null;
        }
      );
    },
    generateUserMessage(content) {
      let ms = {
        type : 'umg',
        name:'您',
        content:content
      };
      return ms;
    },
    generateCsMessage(content) {
      let ms = {
        type : 'csmg',
        name:'木兰湾客服',
        content:content
      };
      return ms;
    },
    generateTipsMessage(content) {
      let ms = {
        type : 'tips',
        name:'木兰湾客服',
        content:content
      };
      return ms;
    },
    showResBottom() {
      //滚动条加载到底部
      let div = document.getElementById('res');
      div.scrollTop = div.scrollHeight+120;
    },
    //清除缓存
    clearCs() {
      this.dataList=[];
      localStorage.setItem(this.cacheKey, []);
    },
    //放入到缓存
    appendCache(data) {
      let his = localStorage.getItem(this.cacheKey);
      if(this.isObjectEmpty(his)){
        his=[];
      }else{
        his = JSON.parse(his);
      }
      his.push(data);
      localStorage.setItem(this.cacheKey, JSON.stringify(his));
    },
  }
};
</script>
<style  lang="scss" scoped>
  /* 主 */
   .lite-chatbox{
    font-family: Helvetica, "PingFang SC", "Microsoft YaHei", sans-serif;
    padding: 0px;
    font-size:18px;
    width: 100%;
    position:relative;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /* 聊天区域 */
  .lite-chatbox .cmsg{
    position: relative;
    margin: 4px 7px;
    min-height: 50px;
    border: 0;
  }
  .lite-chatbox .cright{
    text-align: right;
    margin-left: 64px;
  }
  .lite-chatbox .cleft{
    text-align: left;
    margin-right: 64px;
  }
  /* 聊天组件：全局*/
  /* 头像 */
  .lite-chatbox img.headIcon{
    width: 34px;
    height: 34px;
    top: 9px;
    position: absolute;
    border: 1px solid #c5d4c4;
  }
  /* 昵称 */
  .lite-chatbox .name{
    color: #8b8b8b;
    font-size: 12px;
    display: block;
    line-height: 18px;
  }
  .lite-chatbox .name .htitle{
    display: inline-block;
    padding: 0 3px 0 3px;
    background-color: #cccccc;
    color: #ffffff;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    margin-right: 4px;
    font-size: 11px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    max-width: 50px;
  }
  /* 消息内容 */
  .lite-chatbox .content{
    word-break: break-all;
    word-wrap: break-word;
    text-align: left;
    position: relative;
    display: inline-block;
    font-size: 15px;
    padding: 10px 15px;
    line-height: 20px;
    white-space:pre;
    /* -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px; */
    /*空白消息*/
    min-width: 9px;
    min-height: 18px;
  }
  /*消息内容图片处理*/
  .lite-chatbox .content img{
    width: 100%;
    height: auto;
  }
  /*消息内容超链接处理*/
  .lite-chatbox .content a{
    color: #0072C1;
    margin: 0 5px;
    cursor: hand;
  }
  /*聊天提示条*/
  .lite-chatbox .tips{
    margin: 12px;
    text-align: center;
    font-size: 12px;
  }
  /*聊天提示条文本*/
  .lite-chatbox .tips span{
    display: inline-block;
    padding: 4px;
    background-color: #cccccc;
    color: #ffffff;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
  }
  /* 聊天组件：微调 */
  /* 圆头像 */
  .lite-chatbox img.radius{
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    border-radius: 100%;
  }
  /* 左右头像 */
  .lite-chatbox .cright img.headIcon{
    right: 0;
  }
  .lite-chatbox .cleft img.headIcon{
    left: 0;
  }
  /* 左右昵称 */
  .lite-chatbox .cright .name{
    margin: 0 48px 2px 0;
  }
  .lite-chatbox .cleft .name{
    margin: 0 0 2px 48px;
  }
  /* 左右聊天气泡 */
  .lite-chatbox .cright .content{
    margin: 0 48px 0 0;
    -webkit-border-radius: 20px 0 20px 20px;
    border-radius: 20px 0 20px 20px;
    color: white;
    /* border: 1px solid #78cdf8; */
    background: -webkit-linear-gradient(70deg, #3FD1E1 0%, #44D7CD 100%);
    background: linear-gradient(20deg, #3f8fe1cc 0%, #44d7c9 100%);
    -webkit-box-shadow: 5px 5px 15px 0 rgba(102,102,102,0.15);
    box-shadow: 5px 5px 15px 0 rgba(102,102,102,0.15);
  }
  .lite-chatbox .cleft .content{
    margin: 0 0 0 48px;
    -webkit-border-radius: 0 20px 20px 20px;
    border-radius: 0 20px 20px 20px;
    color: #666;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: #FFFFFF;
    -webkit-box-shadow: 5px 5px 15px 0 rgba(102,102,102,0.1);
    box-shadow: 5px 5px 15px 0 rgba(102,102,102,0.1);
  }
  .lite-chatbox .cright .content:after{
    right: -12px;
    top: 8px;
  }
  .lite-chatbox .cleft .content:after{
    left: -12px;
    top: 8px;
  }
  /* 聊天提示条附加样式 */
  .lite-chatbox .tips .tips-primary{
    background-color: #3986c8;
  }
  .lite-chatbox .tips .tips-success{
    background-color: #49b649;
  }
  .lite-chatbox .tips .tips-info{
    background-color: #5bb6d1;
  }
  .lite-chatbox .tips .tips-warning{
    background-color: #eea948;
  }
  .lite-chatbox .tips .tips-danger{
    background-color: #e24d48;
  }
  .lite-chatbox .name .admin{
    background-color: #72D6A0;
  }
  .lite-chatbox .name .owner{
    background-color: #F2BF25;
  }

</style>

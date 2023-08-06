<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">消息详情</span>
    </top-bar>
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">我的消息</van-divider>
    <van-cell title="标题" :value="userMessage.title" icon="info-o"/>
    <van-cell center  value-class="desc-class" >
      <p v-html="handleContent(userMessage.content)"></p>
    </van-cell>
    <van-cell title="时间" :value="userMessage.createdTime" icon="clock-o"/>
    <van-cell title="类型" :value="userMessage.bussTypeName" icon="apps-o"/>
    <span v-if="userMessage.url!=null">
      <van-cell center class="custom-cell" icon="shrink" title="链接">
        <van-button round type="primary" text="跳转" :url="userMessage.url" size="small" />
      </van-cell>
      </span>
  </div>
</template>

<script>
  import { getUserMessageByUser } from '@/api/message/userMessage'
  import { Image as VanImage,Lazyload,Notify,Divider,Col,Row } from 'vant';
  import TopBar from "components/TopBar";

export default {
  name:'Wechat',
  components: {
    TopBar,
    [VanImage.name]: VanImage,
    [Lazyload]: Lazyload,
    [Notify.Component.name]: Notify.Component,
    [Divider.name]: Divider,
    [Col.name]: Col,
    [Row.name]: Row
  },
  data() {
    return {
      userMessage:{}
    }
  },
  computed: {

  },
  mounted() {
    //获取ID
    const id = this.$route.params.id;
    //console.log('id:'+id)
    if(id==null){

    }else{
      this.getUserMessage(id);
    }
  },
  methods: {
    /**内容的换行符替换*/
    handleContent(content){
      if(content==null||content==undefined){
        return '';
      }
      return content.replaceAll(/\n/g,'<br/>');
    },
    /**获取消息详情*/
    getUserMessage(id) {
      // 请求接口数据
      getUserMessageByUser(id).then(response => {
        if(response==null){
          Notify({ message: '找不到相关消息数据' });
        }else{
          this.userMessage = response;
        }
      }).catch(() => {
      });
    }
  }
}
</script>

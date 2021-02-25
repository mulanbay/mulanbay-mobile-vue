<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">微信绑定</span>
    </top-bar>
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">微信公众号</van-divider>
    <van-image
      width="100%"
      height="100%"
      :src="wechatInfo.qrUrl"
    />
    <van-divider :style="{ color: '#009999', borderColor: '#009999' }">我的信息</van-divider>
    <van-cell title="我的编号" :value="formatOpenId(userWechatInfo.openId)" icon="info-o"/>
    <van-cell title="关注状态" value="已经关注" v-if="true==userWechatInfo.subscribe" icon="like"/>
    <van-cell title="关注状态" value="还未关注" v-else icon="like-o"/>
    <van-cell title="公众号连接" is-link @click="toOa" icon="share-o"/>

  </div>
</template>

<script>
  import { getWxAppInfo,getUserWxpayInfo } from '@/api/auth/wechat'
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
      userWechatInfo:{},
      wechatInfo:{},
      //公众号图片
      qrUrl:undefined
    }
  },
  computed: {

  },
  mounted() {
    this.getUserData();
    this.getWechatData();
  },
  methods: {
    /**跳转公众号地址*/
    toOa(){
      window.location.href = this.wechatInfo.oaUrl;
    },
    /**OpenId*/
    formatOpenId(openId){
      if(openId==null){
        return null;
      }else{
        return openId.substr(0,5)+'****';
      }
    },
    /**获取用户微信详情*/
    getUserData() {
      // 请求接口数据
      getUserWxpayInfo().then(response => {
        this.userWechatInfo = response;
      }).catch(() => {
      });
    },
    /**获取微信详情*/
    getWechatData() {
      // 请求接口数据
      getWxAppInfo().then(response => {
        this.wechatInfo = response;
      }).catch(() => {
      });
    }
  }
}
</script>

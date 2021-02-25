<template>
  <div>
    <van-tabbar v-model="active">
      <!--
      <van-tabbar-item icon="wap-home" to="/home">首页</van-tabbar-item>
      -->
      <van-tabbar-item icon="chart-trending-o" :to="{ name:'NotifyStat' }">统计</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{ name:'User' }">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from "vant";
    export default {
        name: "MainTarBar",
        components: {
         [Tabbar.name]: Tabbar,
         [TabbarItem.name]: TabbarItem,
        },
      data() {
        return {
          active: this.pageActive,
        };
      },
      props:{
        pageActive:{
            default(){
              return 3
            }
          }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>

<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" :fixed="true" :placeholder="true" class="top-bar">
      <template #title>
        <slot name="topText"><span class="top-text">木兰湾</span></slot>
      </template>
      <template #left>
        <slot name="topLeft">
          <span class="top-left">
            <van-icon name="arrow-left" size="18px" color="#ffffff" class="left-icon"/>
            <span>返回</span>
          </span>
        </slot>
      </template>
      <template #right>
        <van-icon name="wap-home" size="24px" color="#ffffff" @click="onClickMain()"/>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
    import {NavBar,Icon} from 'vant';
    export default {
        name: "TopBar",
        components: {
          [NavBar.name]: NavBar,
          [Icon.name]:Icon
        },
        methods: {
          onClickLeft() {
            this.$router.back()
            //this.$router.back(-1)
          },
          onClickMain() {
            this.$router.push({name:'User',query: {}})
          }
        }
    }
</script>

<style scoped>

  /deep/.van-nav-bar {
    background-color: #009999;
  }
  .left-icon{
      top: 3.5px;
  }

  .top-bar{
      background: #009999;
  }
  .top-left{
      color: #ffffff
  }
</style>

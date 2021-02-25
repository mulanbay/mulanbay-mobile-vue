<template>
  <div class="server">
    <van-cell title="功能模块" >
      <template #icon>
        <svg-icon icon-class="function" className="icon-grid-y" />
      </template>
    </van-cell>
    <van-grid style="height: 60px">
      <van-grid-item text="睡眠管理" :to="{ name:'Sleep' }">
        <div slot="icon">
          <svg-icon icon-class="sleep" className="icon-grid-o" />
        </div>
      </van-grid-item>
      <van-grid-item text="饮食管理" :to="{ name:'Diet' }">
        <div slot="icon">
          <svg-icon icon-class="diet" className="icon-grid-o" />
        </div>
      </van-grid-item>
      <van-grid-item text="消费管理" :to="{ name:'BuyRecord' }">
        <div slot="icon">
          <svg-icon icon-class="consume" className="icon-grid-o" />
        </div>
      </van-grid-item>
      <van-grid-item text="通用记录" :to="{ name:'CommonRecord' }">
        <div slot="icon">
          <svg-icon icon-class="common" className="icon-grid-o" />
        </div>
      </van-grid-item>
      <van-grid-item text="身体不适" :to="{ name:'BodyAbnormalRecord' }">
        <div slot="icon">
          <svg-icon icon-class="sick" className="icon-grid-o" />
        </div>
      </van-grid-item>
      <van-grid-item text="阅读管理" :to="{ name:'ReadingRecord' }">
        <div slot="icon">
          <svg-icon icon-class="read" className="icon-grid-o" />
        </div>
      </van-grid-item>
      <van-grid-item text="用药管理" :to="{ name:'TreatDrug' }">
        <div slot="icon">
          <svg-icon icon-class="drug" className="icon-grid-o" />
        </div>
      </van-grid-item>
      <van-grid-item text="运动锻炼" :to="{ name:'SportExercise' }">
        <div slot="icon">
          <svg-icon icon-class="sport" className="icon-grid-o" />
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import {Cell, CellGroup, Grid, GridItem, Icon, Tag} from 'vant';
  import { Col, Row } from 'vant';
  export default {
    name: "profileServer",
    components:{
      [Cell.name]: Cell,
      [Col.name]: Col,
      [Row.name]: Row,
      [Tag.name]: Tag,
      [Icon.name]: Icon,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem
    }
  }
</script>

<style scoped>
  .server{
    width: 90%;
    margin-left: 4%;
    height: 220px;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
    top: 70px;
    padding: 10px;
  }

  @media screen and (max-width: 980px) {
    .server{
        margin-left: 4%;
    }
  }

  @media screen and (max-width: 650px) {
    .server{
        margin-left: 2.5%;
    }
  }
</style>

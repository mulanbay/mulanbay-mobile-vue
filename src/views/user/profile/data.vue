<template>
  <div class="order">
    <van-cell title="数据中心">
      <template #icon>
        <svg-icon icon-class="data" className="icon-grid-y" />
      </template>
    </van-cell>
    <van-grid style="height: 60px" column-num="5">
      <van-grid-item text="流水记录" :to="{name:'Timeline'}">
        <div slot="icon">
          <svg-icon icon-class="timeline" className="icon-grid-y" />
        </div>
      </van-grid-item>
      <van-grid-item text="预算统计" :to="{name:'BudgetStat'}">
        <div slot="icon">
          <svg-icon icon-class="budget" className="icon-grid-y" />
        </div>
      </van-grid-item>
      <van-grid-item icon="logistics" text="微信绑定" :to="{name:'Wechat'}">
        <div slot="icon">
          <svg-icon icon-class="wechat" className="icon-grid-y" />
        </div>
      </van-grid-item>
      <van-grid-item icon="certificate" text="图表分析" :to="{name:'UserChartStat'}">
        <div slot="icon">
          <svg-icon icon-class="chart" className="icon-grid-y" />
        </div>
      </van-grid-item>
      <van-grid-item icon="certificate" text="智能客服" :to="{name:'CustomService'}">
        <div slot="icon">
          <svg-icon icon-class="cs" className="icon-grid-y" />
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import {Cell, CellGroup, Grid, GridItem, Icon, Tag} from 'vant';
  import { Col, Row } from 'vant';
  export default {
    name: "ProfileData",
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
  .order{
    width: 90%;
    margin-left: 4%;
    height: 120px;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
    top: 60px;
    padding: 10px;
  }

  @media screen and (max-width: 980px) {
    .order{
        margin-left: 4%;
    }
  }

  @media screen and (max-width: 650px) {
    .order{
        margin-left: 2.5%;
    }
  }
</style>

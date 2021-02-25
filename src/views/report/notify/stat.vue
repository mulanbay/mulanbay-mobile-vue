<template>
  <div>
    <van-search
      v-model="name"
      :show-action="false"
      @search="handleSearch"
      @clear="clearSearch"
      shape="round"
      background="#009999"
      placeholder="请输入搜索关键词">
    </van-search>
    <van-pull-refresh v-model="pullLoading" @refresh="resetSearch">
      <van-skeleton title :row="8" :loading="loading">
      <van-swipe class="my-swipe" style="height: 230px;" @change="onChange">
        <van-swipe-item v-for="(item, index) in dataList" :key="index">
          <span>
            {{item.userNotify.title}}
            </br>
          </span>
          <span v-if="item.overAlertValue>0" style="color:red ;font-size: 18px;">
           {{ item.content }}
          </span>
          <span v-else-if="item.overWarningValue>0" style="color:BlueViolet ;font-size: 18px;">
           {{ item.content }}
          </span>
          <span v-else style="color:#d3d3d3 ;font-size: 18px;">
            {{ item.content }}
            <i class="el-icon-success" />
          </span>
          <span style="font-size: 15px;">
            </br>
            警告值:{{ item.userNotify.warningValue+item.userNotify.unit }}
            </br>
          </span>
          <span style="font-size: 15px;">
            报警值:{{ item.userNotify.alertValue+item.userNotify.unit }}
            </br>
          </span>
        </van-swipe-item>
      </van-swipe>
      </van-skeleton>
      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">比例图</van-divider>
      <van-cell center :value="currentData.userNotify.title+':'+currentData.content" value-class="desc-class" v-if="currentData!=null" icon="info" />
      </br>
      <van-row type="flex" justify="center">
        <van-col span="12" style="text-align: center;">
          <van-circle v-model="warningRate" rate="warningRate" :speed="100" :text="warningRate+'%'" color="#009999" :size="rateWidth" />
        </van-col>
        <van-col span="12" style="text-align: center;">
          <van-circle v-model="alertRate" rate="alertRate" :speed="100" :text="alertRate+'%'" color="#009999" :size="rateWidth"/>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="12" style="text-align: center;">
          警告比例
        </van-col>
        <van-col span="12" style="text-align: center;">
          报警比例
        </van-col>
      </van-row>
    </van-pull-refresh>
    <main-tar-bar :pageActive="1"></main-tar-bar>
  </div>
</template>

<script>
  import { fetchList } from '@/api/report/notify/notifyStat'
  import { Col,Row,Swipe, SwipeItem,PullRefresh,Divider,Circle,Search,Icon,Skeleton  } from 'vant';
  import MainTarBar from "components/MainTarBar";
  import { getPercent } from '@/utils/index'

  export default {
    name: "NotifyStat",
    components: {
      MainTarBar,
      [Col.name]: Col,
      [Row.name]: Row,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [PullRefresh.name]: PullRefresh,
      [Divider.name]: Divider,
      [Circle.name]: Circle,
      [Icon.name]: Icon,
      [Search.name]: Search,
      [Skeleton.name]: Skeleton

    },
    data() {
      return {
        //骨架图显示
        loading:true,
        //下拉刷新使用
        pullLoading:false,
        dataList:[],
        //搜索关键字
        name:undefined,
        //被选中的数据
        currentData:undefined,
        warningRate: 0,
        alertRate:0,
        rateWidth:(document.body.clientWidth/2-30)+'px'
      };
    },
    computed: {

    },
    created() {
      this.getDataList();
    },
    methods: {
      /**搜索*/
      handleSearch(){
        this.reset();
        this.getDataList();
      },
      /**取消搜索*/
      clearSearch(){
        this.name = undefined;
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
        this.currentData = null;
        this.warningRate = 0;
        this.alertRate = 0;
      },
      /**滑动监听*/
      onChange(index){
        this.currentData = this.dataList[index];
        this.calRate();
      },
      /**计算比例*/
      calRate(){
        const wr = getPercent(this.currentData.compareValue,this.currentData.userNotify.warningValue);
        this.warningRate = parseInt(wr.toFixed(0));
        const ar = getPercent(this.currentData.compareValue,this.currentData.userNotify.alertValue);
        this.alertRate = parseInt(ar.toFixed(0));
      },
      /**获取数据列表*/
      getDataList() {
        this.pushLoading = true;
        // 请求接口数据
        const para = {
          showInIndex:true,
          status:'ENABLE',
          page:0,
          name:this.name
        }
        fetchList(para).then(response => {
          const n = response.rows.length;
          let list = new Array();
          for(let i=0;i<n;i++){
            let dd = response.rows[i];
            dd.content=dd.compareValue+dd.userNotify.unit;
            if(dd.userNotify.notifyConfig.resultType=='NAME_DATE'||dd.userNotify.notifyConfig.resultType=='NAME_NUMBER'){
              dd.content=dd.name+dd.compareValue+dd.userNotify.unit;
            }
            list.push(dd);
          }
          this.dataList = list;
          if(n>0){
            this.currentData = this.dataList[0];
            this.calRate();
          }
          this.loading = false;
        }).catch(() => {
        });
      }
    }
  }
</script>
<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 45px;
    text-align: center;
    background-color: #009999;
  }
</style>

<!-- home -->
<template>
  <div>
    <top-bar>
        <span slot="topText" class="top-text">流水记录</span>
    </top-bar>
    <van-tabs v-model="dataType" @change="changeDataType">
      <van-tab title="行为数据"  name="BEHAVIOR_DATA"></van-tab>
      <van-tab title="操作数据" name="OPERATE_DATA"></van-tab>
    </van-tabs>
    <!--日期选择-->
    <van-cell title="选择日期" :value="date" @click="showCalendar = true" />
    <van-calendar v-model="showCalendar" :show-confirm="true" @confirm="onConfirmDate" :min-date="calendarMinDate"/>
    <van-row type="flex" justify="center">
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="circle" @click="getCalendarDay(0)" style="width: 100%;">今天</van-button>
      </van-col>
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="arrow-left" @click="getCalendarDay(-1)" style="width: 100%;">前一天</van-button>
      </van-col>
      <van-col span="8" style="text-align: center;">
        <van-button plain class="app-menu-color" size="small" icon="arrow" @click="getCalendarDay(1)" style="width: 100%;">后一天</van-button>
      </van-col>
    </van-row>
    </br>
    <van-steps direction="vertical" :active="0" inactive-icon="underway">
      <van-step v-for="(item, index) in dataList" :key="index">
        <van-cell :value="item.date"/>
        <van-card
          :tag="item.behaviorTypeName"
          :title="item.title"
          :desc="item.desc">
          <template #thumb>
            <svg-icon :icon-class="item.iconClass" className="icon-card" />
          </template>
        </van-card>
      </van-step>
    </van-steps>
    <!--回到顶部-->
    <back-to-top bottom="60px" right="10px">
      <van-button round block type="primary" size="small" class="app-color" icon="back-top">
      </van-button>
    </back-to-top>
  </div>
</template>

<script>
  import { getUserBehaviorStat } from '@/api/behavior/userBehavior'
  import { getUserOperationConfigStat } from '@/api/behavior/userOperationConfig'
  import { getDay,getNowDateString,getFormatDate,getDayByDate  } from '@/utils/datetime'
  import { getBussIconClass,sortData  } from '@/utils/index'
  import { Tab, Tabs,Step, Steps,Col,Row,Calendar,Toast,Card } from 'vant';
  import TopBar from "components/TopBar";

export default {
  name:'Timeline',
  components: {
    TopBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Calendar.name]: Calendar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Toast.name]: Toast,
    [Card.name]: Card
  },
  data() {
    return {
      dataType:'BEHAVIOR_DATA',
      dataList:[],
      date:getNowDateString(),
      //时间选择
      showCalendar:false
    }
  },
  computed: {

  },
  mounted() {
    this.getDataList();
  },
  methods: {
    /**时间选择确定*/
    onConfirmDate(date){
      this.date = getFormatDate(date,'yyyy-MM-dd');
      this.showCalendar = false;
      this.getDataList();
    },
    /**时间快速选择*/
    getCalendarDay(n){
      if(n==0){
        this.date = getNowDateString();
      }else{
        this.date = getDayByDate(n,this.date);
      }
      this.getDataList();
    },
    /**改变获取数据类型*/
    changeDataType(name,title){
      this.dataType = name;
      this.getDataList();
    },
    /**获取数据列表*/
    getDataList() {
      Toast.loading({
        forbidClick: true
      })
      if(this.dataType=='BEHAVIOR_DATA'){
        this.getBehaviorDataList();
      }else{
        this.getOperDataList();
      }
    },
    /**获取行为数据列表*/
    getBehaviorDataList() {
      this.pushLoading = true;
      // 请求接口数据
      const para = {
        date:this.date,
        dateGroupType:'TIMELINE',
        dataSource:'BEHAVIOR_DATA'
      }
      getUserBehaviorStat(para).then(response => {
        this.pushLoading = false;
        this.dataList=new Array();
        let ds = response.rows;
        const n=ds.length;
        //倒序
        for (var i = 0; i <n; i++){
          let row = {
            title:ds[i].name,
            date:ds[i].date.substr(11,5),
            iconClass:getBussIconClass(ds[i].behaviorType),
            behaviorTypeName:ds[i].behaviorTypeName
          };
          this.dataList.push(row);
        }
        sortData(this.dataList,'asc');
      })
    },
    /**获取操作数据列表*/
    getOperDataList() {
      this.pushLoading = true;
      // 请求接口数据
      const para = {
        startTime:this.date,
        endTime:this.date+' 23:59:59',
        page:0
      }
      getUserOperationConfigStat(para).then(response => {
        this.pushLoading = false;
        this.dataList=new Array();
        let ds = response;
        const n=ds.length;
        for (var i = 0; i < n; i++){
          const ops = ds[i].operations;
          for (var j = 0; j < ops.length; j++){
            const t = '['+ds[i].title+']'+ops[j].content;
            let row = {
              title:t,
              date:ops[j].occurTime.substr(11,5),
              desc:ops[j].content,
              iconClass:getBussIconClass(ops[j].behaviorType),
              behaviorTypeName:ops[j].behaviorTypeName
            };
            this.dataList.push(row);
          }
        }
        sortData(this.dataList,'asc');
      })
    }
  }
}
</script>

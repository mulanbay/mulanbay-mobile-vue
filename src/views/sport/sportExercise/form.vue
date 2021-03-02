<template>
  <div class="login">
    <top-bar>
        <span slot="topText" class="top-text">{{title}}</span>
    </top-bar>
    <van-form @submit="onSubmit" validate-trigger="onSubmit" :show-error="false" :submit-on-enter="false">
      <van-field
        v-model="sportTypeName"
        required
        label="运动类型"
        placeholder="请选择运动类型"
        :readonly="true"
        is-link
        @focus="showSportTypeName=true"
        :rules="[{ required: true, message: '请选择运动类型' }]"
      />
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.exerciseDate"
        label="锻炼时间"
        placeholder="请选择锻炼时间"
        @click="showExerciseDate = true"
        :rules="[{ required: true, message: '请填写锻炼时间' }]"
      />
      <van-field
        v-model="form.minutes"
        required
        type="digit"
        label="锻炼时长"
        :rules="[{ required: true, message: '请填写锻炼时长' }]">
        <template #button>
          分钟
        </template>
      </van-field>
      <van-field
        v-model="form.kilometres"
        required
        type="number"
        label="锻炼数值"
        :rules="[{ required: true, message: '请填写锻炼数值' }]">
        <template #button>
          {{unit}}
        </template>
      </van-field>
      <van-divider :style="{ color: '#009999', borderColor: '#009999' }">更多选项</van-divider>
      <van-field
        v-model="form.pace"
        type="number"
        label="平均配速" >
        <template #button>
          分钟/公里
        </template>
      </van-field>
      <van-field
        v-model="form.maxPace"
        type="number"
        label="最佳配速" >
        <template #button>
          分钟/公里
        </template>
      </van-field>
      <van-field
        v-model="form.speed"
        type="number"
        label="平均速度" >
        <template #button>
          公里/分钟
        </template>
      </van-field>
      <van-field
        v-model="form.maxSpeed"
        type="number"
        label="最佳速度" >
        <template #button>
          公里/分钟
        </template>
      </van-field>
      <van-field
        v-model="form.averageHeartRate"
        type="digit"
        label="平均心率">
        <template #button>
          次/分钟
        </template>
      </van-field>
      <van-field
        v-model="form.maxHeartRate"
        type="digit"
        label="最大心率">
        <template #button>
          次/分钟
        </template>
      </van-field>
      <van-field
        v-model="form.remark"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="100"
        placeholder="请输入备注"
        show-word-limit
      />
      <div>
        <van-button round block type="info" class="btn-block" native-type="submit">
            保存
        </van-button>
      </div>
    </van-form>
    <van-action-sheet v-model="showSportTypeName" :actions="sportTypeOptions" @select="onSelectSportType" />
    <!--锻炼时间选择器-->
    <van-popup v-model="showExerciseDate" position="bottom">
      <van-datetime-picker
        v-model="vanExerciseDate"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showExerciseDate = false"
        @confirm="onConfirmExerciseDate"
      />
    </van-popup>

  </div>
</template>

<script>
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,Rate,ActionSheet,Divider} from 'vant';
  import { createSportExercise,updateSportExercise,getSportExercise } from '@/api/sport/sportExercise'
  import { getSportTypeTree,getSportType } from '@/api/sport/sportType'
  import { getNowDateTimeString,getFormatDate } from '@/utils/datetime';

  import TopBar from "components/TopBar";

  export default {
    name: "SportExerciseForm",
    components: {
      TopBar,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup,
      [Form.name]: Form,
      [Field.name]:Field,
      [Switch.name]: Switch,
      [Notify.Component.name]: Notify.Component,
      [ActionSheet.name]:ActionSheet,
      [Divider.name]: Divider,

    },
    data() {
      return {
        title:'新增',
        form:{},
        //van格式的时间
        vanExerciseDate:undefined,
        //时间窗口
        showExerciseDate:false,
        //类型
        showSportTypeName:false,
        sportTypeName:undefined,
        sportTypeOptions:[],
        unit:undefined
      };
    },
    created() {
      this.initSelectOptions();
      const id = this.$route.params.id;
      if(id==null){
        this.reset();
      }else{
        this.title="修改";
        this.loadSportExercise(id);
      }
    },
    methods: {
      //初始化下拉列表
      initSelectOptions(){
        getSportTypeTree(null).then(response => {
          this.sportTypeOptions = response;
        });
      },
      /**类型选择确定*/
      onSelectSportType(item){
        this.sportTypeName = item.name;
        this.form.sportTypeId = item.id;
        this.showSportTypeName = false;
        getSportType(item.id).then(response => {
          this.unit = response.unit;
        });
      },
      /**时间选择确定*/
      onConfirmExerciseDate(){
        this.form.exerciseDate = getFormatDate(this.vanExerciseDate,this.dateTimeFormat);
        this.showExerciseDate = false;
      },
      /** 重置 */
      reset(){
        this.vanExerciseDate = new Date();
        this.form={
          exerciseDate:undefined,
          speed: 0,
          maxSpeed:0,
          pace:0,
          maxPace:0,
          maxHeartRate:0,
          averageHeartRate : 0
        };
      },
      /**获取用户信息*/
      loadSportExercise(id) {
        // 请求接口数据
        getSportExercise(id).then(response => {
          this.form=response;
          this.vanExerciseDate = new Date(this.form.exerciseDate);
          this.form.sportTypeId = this.form.sportType.id;
          this.sportTypeName = this.form.sportType.name;
        });
      },
      onSubmit() {
        //删除比必要的信息
        this.form.sportType = null;
        Toast.loading({
          forbidClick: true
        })
        if (this.form.id != undefined) {
          updateSportExercise(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            //通过传递一个r参数，告诉列表页面这是编辑过的需要刷新
            this.$router.push({ name: 'SportExercise', params: { r: true }})
          });
        } else {
          createSportExercise(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            this.$router.push({ name: 'SportExercise', params: { r: true }})
          });
        }
      },
    }
  }
</script>

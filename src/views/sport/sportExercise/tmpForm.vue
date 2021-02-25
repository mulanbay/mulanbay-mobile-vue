<template>
  <div class="login">
    <top-bar>
        <span slot="topText" class="top-text">{{title}}</span>
    </top-bar>
    <van-form @submit="onSubmit" validate-trigger="onSubmit" :show-error="false" :submit-on-enter="false">
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.templateDate"
        label="模板日期"
        placeholder="请选择模板日期"
        @click="showTemplateDate = true"
        :rules="[{ required: true, message: '请填写模板日期' }]"
      />
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.beginTime"
        label="锻炼开始时间"
        placeholder="请选择锻炼开始时间"
        @click="showBeginTime = true"
        :rules="[{ required: true, message: '请填写锻炼开始时间' }]"
      />
      <div>
        <van-button round block type="info" class="btn-block" native-type="submit">
            保存
        </van-button>
      </div>
    </van-form>
    <!--模板日期选择器-->
    <van-popup v-model="showTemplateDate" position="bottom">
      <van-datetime-picker
        v-model="vanTemplateDate"
        type="date"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showTemplateDate = false"
        @confirm="onConfirmTemplateDate"
      />
    </van-popup>
    <!--锻炼开始时间选择器-->
    <van-popup v-model="showBeginTime" position="bottom">
      <van-datetime-picker
        v-model="vanBeginTime"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showBeginTime = false"
        @confirm="onConfirmBeginTime"
      />
    </van-popup>

  </div>
</template>

<script>
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,Rate,ActionSheet,Divider} from 'vant';
  import { createSportExerciseByTemplate } from '@/api/sport/sportExercise'
  import { getNowDateTimeString,getFormatDate } from '@/utils/datetime';

  import TopBar from "components/TopBar";

  export default {
    name: "SportExerciseTmpForm",
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
        vanTemplateDate:undefined,
        //时间窗口
        showTemplateDate:false,
        //van格式的时间
        vanBeginTime:undefined,
        //时间窗口
        showBeginTime:false
      };
    },
    created() {
      this.form.templateDate = this.$route.params.templateDate;
      this.vanBeginTime = new Date();
    },
    methods: {
      /**模板日期选择确定*/
      onConfirmTemplateDate(){
        this.form.templateDate = getFormatDate(this.vanTemplateDate,this.dateFormat);
        this.showTemplateDate = false;
      },
      /**锻炼开始时间选择确定*/
      onConfirmBeginTime(){
        this.form.beginTime = getFormatDate(this.vanBeginTime,this.dateTimeFormat);
        this.showBeginTime = false;
      },
      onSubmit() {
        Toast.loading({
          forbidClick: true
        })
        createSportExerciseByTemplate(this.form).then(response => {
          Notify({ type: 'success', message: '新增成功' });
          //通过传递一个r参数，告诉列表页面这是编辑过的需要刷新
          this.$router.push({ name: 'SportExercise', params: { r: true }})
        });
      },
    }
  }
</script>

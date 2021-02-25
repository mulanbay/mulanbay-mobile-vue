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
        :value="form.sleepTime"
        label="睡觉时间"
        is-link
        placeholder="请选择睡觉时间"
        @click="showSleepTime = true"
        :rules="[{ required: true, message: '请填写睡觉时间' }]"
      />
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.getUpTime"
        label="起床时间"
        is-link
        placeholder="请选择起床时间"
        @click="showGetUpTime = true"
        :rules="[{ required: true, message: '请填写起床时间' }]"
      />
      <van-field
        name="rate"
        label="睡眠质量"
        :rules="[{ required: true, message: '请填写睡眠质量' }]"
        >
        <template #input>
          <van-rate v-model="form.quality" :count="10"/>
        </template>
      </van-field>
      <van-field
        v-model="form.lightSleep"
        name="浅睡时长"
        label="浅睡时长"
        type="digit"
        placeholder="请输入浅睡时长">
        <template #button>
          分钟
        </template>
      </van-field>
      <van-field
        v-model="form.deepSleep"
        name="深睡时长"
        label="深睡时长"
        type="digit"
        placeholder="请输入深睡时长">
        <template #button>
          分钟
        </template>
      </van-field>
      <van-field
        v-model="form.remark"
        rows="2"
        autosize
        label="备注信息"
        type="textarea"
        maxlength="100"
        placeholder="请输入备注"
        show-word-limit
      />
      <div style="margin: 16px;">
        <van-button round block type="info" class="app-color" native-type="submit">
            保存
        </van-button>
      </div>
    </van-form>
    <!--睡觉时间选择器-->
    <van-popup v-model="showSleepTime" position="bottom">
      <van-datetime-picker
        v-model="vanSleepTime"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showSleepTime = false"
        @confirm="onConfirmSleepTime"
      />
    </van-popup>
    <!--起床时间选择器-->
    <van-popup v-model="showGetUpTime" position="bottom">
      <van-datetime-picker
        v-model="vanGetUpTime"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showGetUpTime = false"
        @confirm="onConfirmGetUpTime"
      />
    </van-popup>
  </div>
</template>

<script>
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,Rate} from 'vant';
  import { createSleep,updateSleep,getSleep } from '@/api/health/body/sleep'
  import TopBar from "components/TopBar";
  import { getFormatDate } from '@/utils/datetime'

  export default {
    name: "SleepForm",
    components: {
      TopBar,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup,
      [Form.name]: Form,
      [Field.name]:Field,
      [Switch.name]: Switch,
      [Notify.Component.name]: Notify.Component,
      [Rate.name]: Rate

    },
    data() {
      return {
        title:'新增',
        form:{},
        //van格式的时间
        vanSleepTime:undefined,
        //时间窗口
        showSleepTime:false,
        //van格式的时间
        vanGetUpTime:undefined,
        //时间窗口
        showGetUpTime:false
      };
    },
    created() {
      const id = this.$route.params.id;
      if(id==null){
        this.reset();
      }else{
        this.title="修改";
        this.loadSleep(id);
      }
    },
    methods: {
      /**睡觉时间选择确定*/
      onConfirmSleepTime(){
        this.form.sleepTime = getFormatDate(this.vanSleepTime,this.dateTimeFormat);
        this.showSleepTime = false;
      },
      /**起床时间选择确定*/
      onConfirmGetUpTime(){
        this.form.getUpTime = getFormatDate(this.vanGetUpTime,this.dateTimeFormat);
        this.showGetUpTime = false;
      },
      /** 重置 */
      reset(item){
        this.vanSleepTime = new Date();
        this.vanGetUpTime = new Date();
        this.form={
          quality:6,
          lightSleep:0,
          deepSleep:0
        };
      },
      /**获取用户信息*/
      loadSleep(id) {
        // 请求接口数据
        getSleep(id).then(response => {
          this.form=response;
          this.vanSleepTime = new Date(this.form.sleepTime);
          this.vanGetUpTime = new Date(this.form.getUpTime);
        });
      },
      onSubmit() {
        Toast.loading({
          forbidClick: true
        })
        if (this.form.id != undefined) {
          updateSleep(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            //通过传递一个r参数，告诉列表页面这是编辑过的需要刷新
            this.$router.push({ name: 'Sleep', params: { r: true }})
          });
        } else {
          createSleep(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            this.$router.push({ name: 'Sleep', params: { r: true }})
          });
        }
      },
    }
  }
</script>

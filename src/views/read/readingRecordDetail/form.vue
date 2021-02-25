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
        :value="form.readTime"
        label="阅读时间"
        is-link
        placeholder="请选择阅读时间"
        @click="showReadTime = true"
        :rules="[{ required: true, message: '请填写阅读时间' }]"
      />
      <van-field
        v-model="form.minutes"
        required
        name="花费时长"
        label="花费时长"
        type="digit"
        placeholder="请输入花费时长">
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
    <van-popup v-model="showReadTime" position="bottom">
      <van-datetime-picker
        v-model="vanReadTime"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showReadTime = false"
        @confirm="onConfirmReadTime"
      />
    </van-popup>
  </div>
</template>

<script>
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,Rate} from 'vant';
  import { createReadingRecordDetail,updateReadingRecordDetail,getReadingRecordDetail } from '@/api/read/readingRecordDetail'
  import TopBar from "components/TopBar";
  import { getFormatDate } from '@/utils/datetime'

  export default {
    name: "ReadingRecordDetailForm",
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
        readingRecordId:undefined,
        //van格式的时间
        vanReadTime:undefined,
        //时间窗口
        showReadTime:false,
        //从哪个页面跳转过来的
        fromPath:'ReadingRecordDetail'
      };
    },
    created() {
      const id = this.$route.params.id;
      if(id==null){
        this.reset();
        this.form.readingRecordId = this.$route.params.readingRecordId;
        this.fromPath = this.$route.params.fromPath;
      }else{
        this.title="修改";
        this.loadReadingRecordDetail(id);
      }
    },
    methods: {
      /**时间选择确定*/
      onConfirmReadTime(){
        this.form.readTime = getFormatDate(this.vanReadTime,this.dateTimeFormat);
        this.showReadTime = false;
      },
      /** 重置 */
      reset(){
        this.vanReadTime = new Date();
        this.form={
          readTime:getFormatDate(this.vanReadTime,this.dateTimeFormat),
          minutes:undefined
        };
      },
      /**获取表单信息*/
      loadReadingRecordDetail(id) {
        // 请求接口数据
        getReadingRecordDetail(id).then(response => {
          this.form=response;
          this.form.readingRecordId = this.form.readingRecord.id;
          this.vanReadTime = new Date(this.form.readTime);
        });
      },
      onSubmit() {
        Toast.loading({
          forbidClick: true
        })
        this.form.readingRecord = null;
        if (this.form.id != undefined) {
          updateReadingRecordDetail(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            this.$router.push({ name: 'ReadingRecordDetail', params: { }})
          });
        } else {
          createReadingRecordDetail(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            if(this.fromPath=='ReadingRecordDetail'){
              //需要刷新
              this.$router.push({ name: 'ReadingRecordDetail', params: { r: true }})
            }else{
              //不需要刷新
              this.$router.back();
            }

          });
        }
      },
    }
  }
</script>

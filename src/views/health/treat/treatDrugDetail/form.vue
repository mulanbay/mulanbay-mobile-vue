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
        :value="form.occurTime"
        label="用药时间"
        is-link
        placeholder="请选择用药时间"
        @click="showOccurTime = true"
        :rules="[{ required: true, message: '请填写用药时间' }]"
      />
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
    <!--用药时间选择器-->
    <van-popup v-model="showOccurTime" position="bottom">
      <van-datetime-picker
        v-model="vanOccurTime"
        type="datetime"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showOccurTime = false"
        @confirm="onConfirmOccurTime"
      />
    </van-popup>
  </div>
</template>

<script>
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,Rate} from 'vant';
  import { createTreatDrugDetail,updateTreatDrugDetail,getTreatDrugDetail } from '@/api/health/treat/treatDrugDetail'
  import TopBar from "components/TopBar";
  import { getFormatDate } from '@/utils/datetime'

  export default {
    name: "TreatDrugDetailForm",
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
        treatDrugId:undefined,
        //van格式的时间
        vanOccurTime:undefined,
        //时间窗口
        showOccurTime:false,
        //从哪个页面跳转过来的
        fromPath:'TreadTrug',
        //回调是否要刷新
        r:undefined
      };
    },
    created() {
      const id = this.$route.params.id;
      this.r = this.$route.params.r;
      if(id==null){
        this.reset();
        this.form.treatDrugId = this.$route.params.treatDrugId;
      }else{
        this.title="修改";
        this.loadTreatDrugDetail(id);
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fromPath = from.name;
      })
    },
    methods: {
      /**时间选择确定*/
      onConfirmOccurTime(){
        this.form.occurTime = getFormatDate(this.vanOccurTime,this.dateTimeFormat);
        this.showOccurTime = false;
      },
      /** 重置 */
      reset(){
        this.vanOccurTime = new Date();
        this.form={
          occurTime:getFormatDate(this.vanOccurTime,this.dateTimeFormat)
        };
      },
      /**获取表单信息*/
      loadTreatDrugDetail(id) {
        // 请求接口数据
        getTreatDrugDetail(id).then(response => {
          this.form=response;
          this.form.treatDrugId = this.form.treatDrug.id;
          this.vanOccurTime = new Date(this.form.occurTime);
        });
      },
      onSubmit() {
        Toast.loading({
          forbidClick: true
        })
        this.form.treatDrug = null;
        if (this.form.id != undefined) {
          updateTreatDrugDetail(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            this.$router.push({ name: this.fromPath, params: { r: this.r }});
          });
        } else {
          createTreatDrugDetail(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            this.$router.push({ name: this.fromPath, params: { r: this.r }});
          });
        }
      },
    }
  }
</script>

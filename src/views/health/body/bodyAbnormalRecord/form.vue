<template>
  <div class="login">
    <top-bar>
        <span slot="topText" class="top-text">{{title}}</span>
    </top-bar>
    <van-form @submit="onSubmit" validate-trigger="onSubmit" :show-error="false" :submit-on-enter="false">
      <van-field
        v-model="form.disease"
        required
        label="疾病"
        placeholder="请选择疾病"
        :readonly="false"
        :rules="[{ required: true, message: '请选择疾病' }]">
        <template #right-icon>
          <van-icon name="cart-o" @click="showDiseaseTree"/>
        </template>
      </van-field>
      <van-field
        v-model="form.organ"
        required
        label="器官"
        placeholder="请选择器官"
        :readonly="false"
        :rules="[{ required: true, message: '请选择器官' }]">
        <template #right-icon>
          <van-icon name="cart-o" @click="showOrganTree"/>
        </template>
      </van-field>
      <van-field
        name="rate"
        required
        label="疼痛等级"
        :rules="[{ required: true, message: '请填写疼痛等级' }]"
        >
        <template #input>
          <van-rate v-model="form.painLevel" :count="5"/>
        </template>
      </van-field>
      <van-field
        name="rate"
        required
        label="重要程度"
        :rules="[{ required: true, message: '请填写重要程度' }]"
        >
        <template #input>
          <van-rate v-model="form.importantLevel" :count="5"/>
        </template>
      </van-field>
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.occurDate"
        label="开始日期"
        placeholder="请选择开始日期"
        @click="showOccurDate = true"
        :rules="[{ required: true, message: '请填写开始日期' }]"
      />
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.finishDate"
        label="结束日期"
        placeholder="请选择结束日期"
        @click="showFinishDate = true"
        :rules="[{ required: true, message: '请填写结束日期' }]"
      />
      <van-field
        v-model="form.lastDays"
        name="持续天数"
        label="持续天数"
        type="digit"
        placeholder="请输入持续天数">
        <template #button>
          天
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
      <div style="margin: 16px;">
        <van-button round block type="info" class="app-color" native-type="submit">
            保存
        </van-button>
      </div>
    </van-form>
    <van-action-sheet v-model="showDisease" :actions="diseaseOptions" @select="onSelectDisease" />
    <van-action-sheet v-model="showOrgan" :actions="organOptions" @select="onSelectOrgan" />
    <!--开始时间选择器-->
    <van-popup v-model="showOccurDate" position="bottom">
      <van-datetime-picker
        v-model="vanOccurDate"
        type="date"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showOccurDate = false"
        @confirm="onConfirmOccurDate"
      />
    </van-popup>
    <!--结束时间选择器-->
    <van-popup v-model="showFinishDate" position="bottom">
      <van-datetime-picker
        v-model="vanFinishDate"
        type="date"
        title="选择时间"
        :min-date="calendarMinDate"
        @cancel="showFinishDate = false"
        @confirm="onConfirmFinishDate"
      />
    </van-popup>
  </div>
</template>

<script>
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,ActionSheet,Icon,Rate} from 'vant';
  import { createBodyAbnormalRecord,updateBodyAbnormalRecord,getBodyAbnormalRecord,getAbnormalCategoryTree } from '@/api/health/body/bodyAbnormalRecord';
  import { getFormatDate,dateDiff } from '@/utils/datetime';
  import {getUserResidentCity } from "@/api/auth/user";

  import TopBar from "components/TopBar";

  export default {
    name: "BodyAbnormalRecordForm",
    components: {
      TopBar,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup,
      [Form.name]: Form,
      [Field.name]:Field,
      [Switch.name]: Switch,
      [Notify.Component.name]: Notify.Component,
      [ActionSheet.name]:ActionSheet,
      [Icon.name]: Icon,
      [Rate.name]: Rate,

    },
    data() {
      return {
        title:'新增',
        form:{},
        //van格式的时间
        vanOccurDate:undefined,
        //时间窗口
        showOccurDate:false,
        //van格式的时间
        vanFinishDate:undefined,
        //时间窗口
        showFinishDate:false,
        //疾病类型
        showDisease:false,
        diseaseOptions:[],
        //器官类型
        showOrgan:false,
        organOptions:[]
      };
    },
    created() {
      const id = this.$route.params.id;
      if(id==null){
        this.reset();
      }else{
        this.title="修改";
        this.loadBodyAbnormalRecord(id);
      }
    },
    methods: {
      //疾病列表
      showDiseaseTree(){
        getAbnormalCategoryTree('disease',false).then(response => {
          this.diseaseOptions = response;
          this.showDisease = true;
        });
      },
      //器官列表
      showOrganTree(){
        getAbnormalCategoryTree('organ',false).then(response => {
          this.organOptions = response;
          this.showOrgan = true;
        });
      },
      /**疾病选择确定*/
      onSelectDisease(item){
        this.form.disease = item.id;
        this.showDisease = false;
      },
      /**器官选择确定*/
      onSelectOrgan(item){
        this.form.organ = item.id;
        this.showOrgan = false;
      },
      /**时间选择确定*/
      onConfirmOccurDate(){
        this.form.occurDate = getFormatDate(this.vanOccurDate,this.dateFormat);
        this.showOccurDate = false;
      },
      /**时间选择确定*/
      onConfirmFinishDate(){
        this.form.finishDate = getFormatDate(this.vanFinishDate,this.dateFormat);
        this.showFinishDate = false;
        this.form.lastDays = dateDiff(this.form.occurDate,this.form.finishDate);
      },
      /** 重置 */
      reset(){
        this.vanOccurDate = new Date();
        this.vanFinishDate = new Date();
        this.form={
          importantLevel:3,
          painLevel:3,
          occurDate:undefined,
          finishDate:undefined
        };
      },
      /**获取表单信息*/
      loadBodyAbnormalRecord(id) {
        // 请求接口数据
        getBodyAbnormalRecord(id).then(response => {
          this.form=response;
          this.vanOccurDate = new Date(this.form.occurDate);
          this.vanFinishDate = new Date(this.form.finishDate);
        });
      },
      onSubmit() {
        Toast.loading({
          forbidClick: true
        })
        if (this.form.id != undefined) {
          updateBodyAbnormalRecord(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            //通过传递一个r参数，告诉列表页面这是编辑过的需要刷新
            this.$router.push({ name: 'BodyAbnormalRecord', params: { r: true }})
          });
        } else {
          createBodyAbnormalRecord(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            this.$router.push({ name: 'BodyAbnormalRecord', params: { r: true }})
          });
        }
      },
    }
  }
</script>

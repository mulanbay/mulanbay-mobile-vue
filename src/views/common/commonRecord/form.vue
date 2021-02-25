<template>
  <div class="login">
    <top-bar>
        <span slot="topText" class="top-text">{{title}}</span>
    </top-bar>
    <van-form @submit="onSubmit" validate-trigger="onSubmit" :show-error="false" :submit-on-enter="false">
      <van-field
        v-model="typeName"
        required
        label="类型"
        placeholder="请选择类型"
        :readonly="true"
        is-link
        @focus="showTypeName=true"
        :rules="[{ required: true, message: '请选择类型' }]"
      />
      <van-field
        v-model="form.name"
        required
        name="名称"
        label="名称"
        placeholder="请输入名称"
        :rules="[{ required: true, message: '请填写名称' }]"
      />
      <van-field
        v-model="form.value"
        required
        type="digit"
        label="数值" 
        :rules="[{ required: true, message: '请填写数值' }]">
        <template #button>
          {{unit}}
        </template>
      </van-field>
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.occurTime"
        label="时间"
        placeholder="请选择时间"
        @click="showOccurTime = true"
        :rules="[{ required: true, message: '请填写时间' }]"
      />

      <van-field
        v-model="form.location"
        required
        name="地点"
        label="地点"
        placeholder="请输入地点"
        :rules="[{ required: false, message: '请填写地点' }]"
      />
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
    <van-action-sheet v-model="showTypeName" :actions="typeOptions" @select="onSelectType" />
    <!--睡觉时间选择器-->
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
  import {Form, Field,Toast,Switch,Notify,DatetimePicker,Popup,Rate,ActionSheet} from 'vant';
  import { createCommonRecord,updateCommonRecord,getCommonRecord } from '@/api/common/commonRecord'
  import { getCommonRecordTypeTree,getCommonRecordType } from '@/api/common/commonRecordType'
  import { getNowDateTimeString,getFormatDate } from '@/utils/datetime';
  import {getUserResidentCity } from "@/api/auth/user";

  import TopBar from "components/TopBar";

  export default {
    name: "CommonRecordForm",
    components: {
      TopBar,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup,
      [Form.name]: Form,
      [Field.name]:Field,
      [Switch.name]: Switch,
      [Notify.Component.name]: Notify.Component,
      [ActionSheet.name]:ActionSheet

    },
    data() {
      return {
        title:'新增',
        form:{},
        //van格式的时间
        vanOccurTime:undefined,
        //时间窗口
        showOccurTime:false,
        //类型
        showTypeName:false,
        typeName:undefined,
        typeOptions:[],
        unit:undefined
      };
    },
    created() {
      this.initSelectOptions();
      const id = this.$route.params.id;
      if(id==null){
        this.reset();
        getUserResidentCity().then(response => {
          this.form.location=response;
        });
      }else{
        this.title="修改";
        this.loadCommonRecord(id);
      }
    },
    methods: {
      //初始化下拉列表
      initSelectOptions(){
        getCommonRecordTypeTree(null).then(response => {
          this.typeOptions = response;
        });
      },
      /**类型选择确定*/
      onSelectType(item){
        this.typeName = item.name;
        this.form.commonRecordTypeId = item.id;
        this.showTypeName = false;
        getCommonRecordType(item.id).then(response => {
          this.unit = response.unit;
          this.form.name = item.name;
        });
      },
      /**时间选择确定*/
      onConfirmOccurTime(){
        this.form.occurTime = getFormatDate(this.vanOccurTime,this.dateTimeFormat);
        this.showOccurTime = false;
      },
      /** 重置 */
      reset(){
        this.vanOccurTime = new Date();
        this.form={
          location:undefined,
          occurTime:undefined,
          value:undefined,
          name:undefined
        };
      },
      /**获取用户信息*/
      loadCommonRecord(id) {
        // 请求接口数据
        getCommonRecord(id).then(response => {
          this.form=response;
          this.vanOccurTime = new Date(this.form.occurTime);
          this.form.commonRecordTypeId = this.form.commonRecordType.id;
          this.typeName = this.form.commonRecordType.name;
        });
      },
      onSubmit() {
        //删除比必要的信息
        this.form.commonRecordType = null;
        Toast.loading({
          forbidClick: true
        })
        if (this.form.id != undefined) {
          updateCommonRecord(this.form).then(response => {
            Notify({ type: 'success', message: '修改成功' });
            //通过传递一个r参数，告诉列表页面这是编辑过的需要刷新
            this.$router.push({ name: 'CommonRecord', params: { r: true }})
          });
        } else {
          createCommonRecord(this.form).then(response => {
            Notify({ type: 'success', message: '新增成功' });
            this.$router.push({ name: 'CommonRecord', params: { r: true }})
          });
        }
      },
    }
  }
</script>

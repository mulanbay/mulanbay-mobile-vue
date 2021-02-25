<template>
  <div class="login">
    <top-bar>
        <span slot="topText" class="top-text">个人设置</span>
    </top-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        required
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
      />
      <van-field
        v-model="form.password"
        required
        type="password"
        name="原密码"
        label="原密码"
        placeholder="请输入原密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.newPassword"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: false, message: '请填写新密码' }]"
      />
      <van-field
        v-model="form.secAuthTypeName"
        required
        label="二次认证"
        placeholder="请选择二次认证类型"
        :readonly="true"
        is-link
        @focus="showSecAuthType=true"
        :rules="[{ required: true, message: '请选择二次认证类型' }]"
      />
      <van-field
        v-model="form.phone"
        name="手机"
        label="手机"
        placeholder="请输入手机"
      />
      <van-field
        v-model="form.email"
        name="邮箱"
        label="邮箱"
        placeholder="请输入邮箱"
      />
      <van-field
        required
        readonly
        clickable
        name="calendar"
        :value="form.birthday"
        label="生日"
        placeholder="点击选择日期"
        @click="showDate = true"
      />
      <van-field name="switch" label="发送邮件">
        <template #input>
          <van-switch v-model="form.sendEmail" size="20" />
        </template>
      </van-field>
      <van-field name="switch" label="发送微信">
        <template #input>
          <van-switch v-model="form.sendWxMessage" size="20" />
        </template>
      </van-field>
      <van-action-sheet v-model="showSecAuthType" :actions="secAuthTypeOptions" @select="onSelectSecAuthType" />
      <div style="margin: 16px;">
        <van-button round block type="info" class="app-color" native-type="submit">
            保存
        </van-button>
      </div>
    </van-form>
    <!--时间选择器-->
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="vanDate"
        type="date"
        title="选择年月日"
        :min-date="calendarMinDate"
        @cancel="showDate = false"
        @confirm="onConfirmDate"
      />
    </van-popup>
  </div>
</template>

<script>
  import {Form, Field, Toast,ActionSheet,Switch,Notify,DatetimePicker,Popup} from 'vant';
  import { getProfile,editProfile } from '@/api/auth/user'
  import TopBar from "components/TopBar";
  import { getFormatDate } from '@/utils/datetime'

  export default {
    name: "UserSetting",
    components: {
      TopBar,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup,
      [Form.name]: Form,
      [Field.name]:Field,
      [ActionSheet.name]:ActionSheet,
      [Switch.name]: Switch,
      [Notify.Component.name]: Notify.Component,
    },
    data() {
      return {
        //二次认证类型
        showSecAuthType:false,
        secAuthTypeOptions:[],
        form:{},
        //van格式的时间
        vanDate:undefined,
        //时间窗口
        showDate:false
      };
    },
    created() {
      //二次认证类型
      this.getEnumTree('AuthType','FIELD',false).then(response => {
        this.secAuthTypeOptions = response;
      });
      this.loadProfile();
    },
    methods: {
      /**时间选择确定*/
      onConfirmDate(){
        this.form.birthday = getFormatDate(this.vanDate,'yyyy-MM-dd');
        this.showDate = false;
      },
      /** 选择二次认证类型 */
      onSelectSecAuthType(item){
        this.form.secAuthTypeName = item.name;
        this.form.secAuthType = item.id;
        this.showSecAuthType = false;
      },
      /**获取用户信息*/
      loadProfile() {
        // 请求接口数据
        getProfile().then(response => {
          this.form=response;
          this.vanDate = new Date(this.form.birthday);
        });
      },
      onSubmit() {
        // 请求接口数据
        editProfile(this.form).then(response => {
          Notify({ type: 'success', message: '修改成功' });
          this.$router.push({name:'User',query: {}})
        }).catch(() => {

        });
      },
    }
  }
</script>

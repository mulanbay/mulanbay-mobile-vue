<template>
  <div class="login">
    <div class="login-tip">

    </div>
    <van-form @submit="onSubmit"  validate-trigger="onSubmit" :show-error="false" :submit-on-enter="false" label-width="4.0em" class="login-form">
      <div class="form-tip">
        <span>木兰湾管理系统</span>
      </div>
      <van-field
        v-model="form.username"
        left-icon="user-o"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名/手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.password"
        left-icon="eye-o"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.code"
        left-icon="photo-o"
        name="验证码"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <img :src="codeUrl" @click="getCode" style="width: 115px;height: 35px;"/>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" class="app-color" :loading="loading" loading-text="登录中..." native-type="submit">
            登陆
        </van-button>
        <span class="account-tip" @click="$router.push({name:'Register'})">没有账户？立即注册</span>
        <span class="pass-tip">忘记密码？点此找回</span>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {Form, Field, Toast} from 'vant';
  import { loginAuth,getCodeImg } from '@/api/auth/login'

  export default {
    name: "login",
    components: {
        [Form.name]: Form,
        [Field.name]:Field
    },
    data() {
      return {
        form:{username:undefined,password:undefined},
        codeUrl:undefined,
        redirectPath:undefined,
        loading:false
      };
    },
    created() {
      this.getCode();
      this.redirectPath = this.$route.query.redirectPath;
    },
    methods: {
      /**获取验证码*/
      getCode() {
        getCodeImg().then(res => {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.form.uuid = res.uuid;
        });
      },
      onSubmit() {
        this.loading = true;
        // 请求接口数据
        loginAuth(this.form).then(response => {
          //设置token
          this.$store.dispatch('setToken', response.token);
          if(this.redirectPath!=null){
            window.location.href = this.redirectPath;
          }else{
            this.$router.push({name:'User',query: {}})
          }
        }).catch(() => {
          this.loading = false;
          this.getCode();
        });
      },
    }
  }
</script>

<style scoped>

  .login {
    position: absolute;
    background: #f3f2f2;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/image/login-background.jpg");
    background-size: cover;
  }

  .top-text {
    color: #ffffff;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    padding: 45px 15px 35px 25px;
  }

  .login-form van-field{
    height: 50px;
  }

  .form-tip{
    height: 20px;
    line-height: 0px;
    font-size: 20px;
    text-align: center;
  }

  .login-tip{
    height: 150px;
    line-height: 250px;
    font-size: 20px;
    text-align: center;
  }
  .pass-tip{
    margin-top: 13px;
    line-height: 20px;
    position: absolute;
    right: 5%;
    color: #099;
  }
  .account-tip{
    margin-top: 13px;
    line-height: 20px;
    position: absolute;
    left: 5%;
    color: #099;
  }
</style>

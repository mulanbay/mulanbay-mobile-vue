<template>
    <div class="login">
        <div class="login-tip">
            <span>注册新用户</span>
        </div>
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
            name="密码"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="form.code"
            required
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
              <van-button round block class="app-color" type="info" native-type="submit">
                  注册
              </van-button>
              <span class="account-tip" @click="$router.push({name:'Login'})">已有账户？立即登录</span>
              <span class="pass-tip">忘记密码？点此找回</span>
          </div>
        </van-form>
    </div>
</template>

<script>
  import {Form, Field, Toast} from 'vant';
  import { userRegister,getCodeImg } from '@/api/auth/login'

  export default {
      name: "Register",
      components: {
          [Form.name]: Form,
          [Field.name]:Field
      },
      data() {
          return {
            form:{},
            codeUrl:undefined,
          };
      },
      created() {
        this.getCode();
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
          // 请求接口数据
          userRegister(this.form).then(response => {
            //设置token
            this.$store.dispatch('setToken', response.token);
            this.$router.push({name:'Home',query: {}})
          }).catch(() => {
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
    }

    .top-text {
        color: #ffffff;
    }

    .login-form van-field{
        height: 50px;
    }
    .login-tip{
        height: 100px;
        background: #ffffff;
        line-height: 100px;
        font-size: 18px;
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

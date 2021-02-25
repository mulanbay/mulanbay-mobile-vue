<template>
  <div class="profile-box">
      <div class="setting-icon">
        <van-icon name="setting-o" color="#fff" size="1rem" @click="handleSetting"/>
      </div>
      <div class="user-image">
        <van-image round width="80px" height="80px" :src="userData.avatar" class="photo">
          <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
        <div class="user-name">
          <span style="font-size: 18px">{{userData.nickname}}</span>

          <span style="cofont-size: 18px;color: #AA0000;" @click="handleLogout" >退出系统</span>

          <span class="is-vip">
            <img src="@/assets/image/level.png" width="15px" height="15px">{{userData.level}}-&nbsp;&nbsp;{{userData.levelName}}
          </span>
        </div>
      </div>

      <div class="user-content">
        <van-grid :column-num="4" icon-size="20px" style="height: 70px">
          <van-grid-item style="height: 70px" :to="{ name:'UserScore' }">
            <div class="balance-text" slot="icon">
              <svg-icon icon-class="score" className="icon-grid-o" />
            </div>
            <div class="balance-text" slot="text">
                <div class="balance-name">当前评分</div>
                <div class="balance-value">{{score}}</div>
            </div>
          </van-grid-item>
          <van-grid-item style="height: 70px" :to="{ name:'UserRewardPoints' }">
            <div class="balance-text" slot="icon">
              <svg-icon icon-class="point" className="icon-grid-o" />
            </div>
            <div class="balance-text" slot="text">
                <div class="balance-name">我的积分</div>
                <div class="balance-value">{{userData.points}}</div>
            </div>
          </van-grid-item>
          <van-grid-item style="height: 70px" :to="{ name:'UserCalendar' }">
            <div class="balance-text" slot="icon">
              <svg-icon icon-class="calendar" className="icon-grid-o" />
            </div>
						<div class="balance-text" slot="text">
                <div class="balance-name">今日任务</div>
                <div class="balance-value">{{todayCalendars}}</div>
            </div>
          </van-grid-item>
          <van-grid-item style="height: 70px" :to="{ name:'UserMessage' }">
            <div class="balance-text" slot="icon">
              <svg-icon icon-class="message" className="icon-grid-o" />
            </div>
            <div class="balance-text" slot="text">
                <div class="balance-name">我的消息</div>
                <div class="balance-value">{{messages}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
</template>

<script>
  import {Icon, Grid, GridItem, Loading, Toast,Dialog } from 'vant';
  import {Image as VanImage} from 'vant';
  import { logout } from '@/api/auth/login'
  import { getProfile } from '@/api/auth/user'
  import {fetchList as fetchUserScoreList} from "@/api/data/userScore";
  import { dailyCount } from '@/api/data/userCalendar'

  export default {
    name: "ProfileUser",
    components: {
      [Icon.name]: Icon,
      [Dialog.Component.name]: Dialog.Component,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [VanImage.name]: VanImage,
      [Loading.name]: Loading,
    },
    data(){
      return{
        //评分
        score:0,
        //用户数据
        userData:{},
        //今日任务
        todayCalendars:0,
        //消息
        messages:0
      }
    },
    methods: {
      /**跳转设置*/
      handleSetting(){
        this.$router.push({name:'UserSetting',params: {}})
      },
      /**获取今日日历数*/
      getUserCalendarCount(){
        dailyCount().then(res => {
          this.todayCalendars = res;
        });
      },
      /**获取用户信息*/
      getUserData(){
        getProfile().then(res => {
          this.userData = res;
        });
      },
      //用户评分
      getUserScore(){
        const para ={
          page:1,
          pageSize:1,
          needTotal:false
        };
        fetchUserScoreList(para).then(
          response => {
            if(response.rows.length>0){
              this.score = response.rows[0].score;
            }
          }
        );
      },
      /**退出系统*/
      handleLogout(){
        Dialog.confirm({
          title: '提示',
          message: '是否确定要退出系统?',
        }).then(() => {
          //确认
          logout().then(res => {
            this.$router.push({name:'Login',query: {}})
          });
        }).catch(() => {
          //取消
        });
      }
    },
    created() {
      this.getUserData();
      this.getUserScore();
      this.getUserCalendarCount();
    }
  }
</script>

<style scoped>
    .is-vip{
        font-size: 12px;
        margin-top: 10px;
    }
    .profile-box {
        float: left;
        width: 100%;
        height: 100%;
    }

    .user-image {
        width: 250px;
        height: 80px;
        margin-left: 40px;
        margin-top: 40px;
    }

    .user-image .photo {
        float: left;
        border-radius: 50%;
        width: 80px;
        height: 80px;
    }

    .setting-icon {
        float: right;
        margin-right: 20px;
        margin-top: 20px;
    }

    .user-name span {
        display: block;
        color: #ffffff;
    }

    .user-name {
        margin-left: 20px;
        float: left;
        margin-top: 10px;
    }

    .user-content {
        width: 90%;
        height: 70px;
        background: #ffffff;
        border-radius: 8px;
        margin-left: 4%;
        margin-top: 20px;
        padding: 10px;
    }

    @media screen and (max-width: 980px) {
        .user-content {
            margin-left: 4%;
        }
    }

    @media screen and (max-width: 650px) {
        .user-content {
            margin-left: 2.5%;
        }
    }


    .balance-name {
        font-size: 12px;
    }

    .balance-value {
        font-size: 10px;
        text-align: center;
        font-weight: bold;
        color: brown;
    }
</style>

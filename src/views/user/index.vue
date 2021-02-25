<template>
    <div>
      <div class="user-info">
        <profile-user/>
      </div>
      <div class="user-serve">
        <profile-data/>
        <profile-server/>
      </div>
      <main-tar-bar :pageActive="2"></main-tar-bar>
    </div>
</template>

<script>
    import ProfileUser from "./profile/user";
    import ProfileServer from "./profile/server";
    import ProfileData from "./profile/data";
    import MainTarBar from "components/MainTarBar";
    export default {
      name: "Profile",
      components: {
        ProfileUser,
        ProfileServer,
        ProfileData,
        MainTarBar,
      }
    }
</script>

<style scoped>
    .user-serve{
      height: 600px;
      background:#f3f2f2 ;
    }
    .user-info {
      height: 180px;
      width: 100%;
      background: #099;
    }
</style>

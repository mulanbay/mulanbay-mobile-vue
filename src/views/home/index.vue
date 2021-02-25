<!-- home -->
<template>
  <div>
    <main-tar-bar :pageActive="0"></main-tar-bar>
  </div>
</template>

<script>
  import MainTarBar from "components/MainTarBar";

export default {
  name: "index",
  components: {
      MainTarBar,
  },
  data() {
    return {

    }
  },
  computed: {},
  mounted() { },
  methods: {}
}
</script>

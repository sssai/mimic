<template>
<div id="app" class='fullScreen'>
  <router-view></router-view>
</div>
</template>

<script>
import Vue from 'vue'
import global_ from '@/utils/Global'

// 定义全局点击和输入的监听函数
Vue.prototype.globalOperation = function(callback) {
  document.getElementById('app').onclick = function() {
    callback();
  };
  document.getElementById('app').oninput = function() {
    callback();
  };
};

let lockctrl

export default {
  name: 'mimic',
  data() {
    return {
      nowTime: '',
      lockstate: false,
    }
  },
  watch: {
    '$route': function(route) {
      // console.log("router"+router.fullPath)
      console.log("route.fullPath ："+route.fullPath );
      if (route.fullPath != global_.SUMMARY) {
        this.$store.commit('UPDATE_USER_IN_SUMMARY', false)
      } else {
        this.$store.commit('UPDATE_USER_IN_SUMMARY', true)
      }
      if (route.fullPath == global_.LOGIN_PAGE || this.$route.fullPath == global_.LOCK_PAGE) {
        clearInterval(lockctrl)
        lockctrl = undefined
      } else if(lockctrl == undefined && this.$store.getters.getLockstatus){
        this.nowTimes();
      }
    },
    getIsLock: function() {
      console.log("getIsLock change");
      if (!this.getIsLock) {
        clearInterval(lockctrl)
        lockctrl = undefined
      } else {
        this.nowTimes();
      }
    }
  },
  mounted: function() {
    this.globalOperation(this.operaConsole);
    this.nowTimes();
    this.lockstate = this.getlocktime
  },
  methods: {
    // 当出现点击和输入操作时的处理函数
    operaConsole() {
      let sec = this.$store.getters.getLocktime * 60
      this.$store.dispatch('updateRemainTime', sec)
    },
    // 倒计时减秒数
    watchTime() {
      let sec = this.$store.getters.getRemainTime
      console.log("get sec:"+sec);
      if (sec > 0) {
        if (this.$route.fullPath != global_.LOGIN_PAGE || this.$route.fullPath != global_.LOCK_PAGE) {
          sec = sec - 1
        }
        this.$store.dispatch('updateRemainTime', sec)
      } else {
        this.$router.push({
          path: global_.LOCK_PAGE
        })
      }
    },
    // 定时器函数
    nowTimes() {
      console.log("asdfasdf:"+(this.$route.fullPath != global_.LOGIN_PAGE
        && lockctrl == undefined
        && this.getIsLock == true));
      if (this.$route.fullPath != global_.LOGIN_PAGE
        && lockctrl == undefined
        && this.getIsLock == true) {
        lockctrl = setInterval(this.watchTime, 1 * 1000);
        console.log("lockctrl:"+lockctrl);
        console.log("lockctrl:"+lockctrl);
      }
    },
  },
  computed: {
    getIsLock() {
      return this.$store.getters.getLockstatus
    }
  },
}
</script>

<style>
/* CSS */
html,
body {
  height: 100%;
  padding: 0px;
  margin: 0px;
}

* {
  font-family: "Microsoft YaHei";
}

.fullScreen {
  height: 100%
}
</style>

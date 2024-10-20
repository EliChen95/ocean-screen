<template>
  <div
    class="relative flex justify-center h-[60px] mb-[4px] bg-cover bg-center text-[#d3d6dd] bg-[url('@/assets/images/top.png')]"
  >
    <!-- 左侧矩形装饰 -->
    <div
      class="absolute left-[11%] -top-[2px] w-[140px] h-[6px] bg-[url('@/assets/images/top-rect.png')]"
    ></div>

    <!-- 右侧矩形装饰 -->
    <div
      class="absolute right-[11%] -top-[2px] w-[140px] h-[6px] rotate-180 bg-[url('@/assets/images/top-rect.png')]"
    ></div>

    <!-- 底部光效装饰 -->
    <div
      class="absolute bottom-[-26px] w-full h-[56px] bg-[url('@/assets/images/light.png')] bg-[80px_center]"
    ></div>

    <!-- 标题文字 -->
    <div
      class="relative flex justify-center h-[60px] text-center leading-[46px]"
    >
      <span
        class="w-full text-[38px] font-black tracking-[6px] [-webkit-text-fill-color:transparent]"
        style="background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.85%, #01aaff 100%); background-clip: text;"
      >
        观海智驾屏
      </span>
    </div>

    <!-- 左侧 Logo -->
    <img
      src="@/assets/images/logo.png"
      class="absolute w-[200px] left-[9%] -top-[15px]"
      alt="Logo"
    />

    <!-- 右侧时间显示 -->
    <div class="absolute right-0 top-[30px] flex items-center gap-[24px] text-[18px]">
      <span class="flex items-center gap-[4px]"><img class="w-[30px]" src="@/assets/svg/cloud.svg" />风力: 4级</span>
      <span class="flex items-center gap-[4px]"><img class="w-[30px]" src="@/assets/svg/sun.svg" />温度: 20&#176;C</span>
      <span class="w-[180px] text-nowrap">{{ currentYear }} {{ currentTime }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "VHeader",
  components: {

  },

  data() {
    return {
      timer: null,
      currentTime: null,
      currentYear: null,
      currentWeekday: null,
      weekDays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    };
  },
  created() {
    this.getTime();
  },

  mounted() {
    this.startTimer();
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    getTime() {
      const now = new Date();
      this.currentTime = moment(now).format("HH:mm:ss");
      this.currentYear = moment(now).format("YYYY-MM-DD");
      this.currentWeekday = this.weekDays[now.getDay()];
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.getTime();
      }, 1000);
    },
  },
};
</script>
<template>
  <ul class="flex" v-if="isPageLoaded">
    <li class="flex-1 text-[#00fdfa]">
      <div class="statistic-box total-device relative w-[100px] h-[100px] text-center leading-[100px] text-[22px] mx-auto my-[50px]">
        <dv-digital-flop :config="totalDeviceConfig" class="w-full h-full" />
      </div>
      <p class="statistic-label">总设备数</p>
    </li>

    <li class="flex-1 text-[#07f7a8]">
      <div class="statistic-box online-device relative w-[100px] h-[100px] text-center leading-[100px] text-[22px] mx-auto my-[50px]">
        <dv-digital-flop :config="onlineDeviceConfig" class="w-full h-full" />
      </div>
      <p class="statistic-label">在线数</p>
    </li>

    <li class="flex-1 text-[#e3b337]">
      <div class="statistic-box offline-device relative w-[100px] h-[100px] text-center leading-[100px] text-[22px] mx-auto my-[50px]">
        <dv-digital-flop :config="offlineDeviceConfig" class="w-full h-full" />
      </div>
      <p class="statistic-label">离线数</p>
    </li>

    <li class="flex-1 text-[#f5023d]">
      <div class="statistic-box alarm-count relative w-[100px] h-[100px] text-center leading-[100px] text-[22px] mx-auto my-[50px]">
        <dv-digital-flop :config="alarmCountConfig" class="w-full h-full" />
      </div>
      <p class="statistic-label">告警次数</p>
    </li>
  </ul>
</template>

<script>
const fontStyle = {
  fontSize: 24,
};
import { ApiGet } from '@/api/modules'
export default {
  name:'DeviceOverview',
  data() {
    return {
      isPageLoaded: true,
      totalDeviceConfig: {
        number: [100],
        content: "{nt}",
        style: {
          ...fontStyle,
          fill: "#00fdfa",
        },
      },
      onlineDeviceConfig: {
        number: [0],
        content: "{nt}",
        style: {
          ...fontStyle,
          fill: "#07f7a8",
        },
      },
      offlineDeviceConfig: {
        number: [0],
        content: "{nt}",
        style: {
          ...fontStyle,
          fill: "#e3b337",
        },
      },
      alarmCountConfig: {
        number: [0],
        content: "{nt}",
        style: {
          ...fontStyle,
          fill: "#f5023d",
        },
      },
      refreshInterval: null,
    };
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    this.clearRefreshInterval();
  },
  methods: {
    clearRefreshInterval() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
      }
    },
    fetchData() {
      this.isPageLoaded = true;
      ApiGet("getDeviceOverview").then((res) => {
        if (res.success) {
          const { totalNum, onlineNum, offlineNum, alarmNum } = res.data;
          this.totalDeviceConfig = {
            ...this.totalDeviceConfig,
            number:  [totalNum]
          };
          this.onlineDeviceConfig = {
            ...this.onlineDeviceConfig,
            number:  [onlineNum]
          };
          this.offlineDeviceConfig = {
            ...this.offlineDeviceConfig,
            number:  [offlineNum]
          };
          this.alarmCountConfig = {
            ...this.alarmCountConfig,
            number:  [alarmNum]
          };
          this.setupAutoRefresh();
        } else {
          this.isPageLoaded = false;
        }
      });
    },
    // 设置定时轮询
    setupAutoRefresh() {
      if (this.refreshInterval) return;
      this.refreshInterval = setInterval(this.fetchData, 5000);
    },
  },
};
</script>

<style scoped>
.statistic-label {
  text-align: center;
  height: 16px;
  font-size: 16px;
}

.statistic-box::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center center;
}

.total-device::before {
  background-image: url("@/assets/images/left_top_blue.png");
}

.online-device::before {
  background-image: url("@/assets/images/left_top_green.png");
}

.offline-device::before {
  background-image: url("@/assets/images/left_top_yellow.png");
}

.alarm-count::before {
  background-image: url("@/assets/images/left_top_red.png");
}

.bgdonghua::before {
  animation: rotating 14s linear infinite;
}
</style>
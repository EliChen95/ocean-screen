<template>
  <div class="w-[560px] h-[400px]">
    <div class="sn-content">
      <div class="sn-body">
        <div class="absolute top-[35px] w-full h-[80%]">
          <div class="relative w-full h-full">
            <div class="relative top-[16px] left-[30px] w-[234px] h-[234px]">
              <div class="absolute w-full h-full inset-0 bg-no-repeat bg-center animated infinite rotateF bg-[url('@/assets/images/dynamic/info-1-0.png')]"></div>
              <div class="absolute w-full h-full inset-0 bg-no-repeat bg-center animated infinite rotateF bg-[url('@/assets/images/dynamic/info-1-1.png')]"></div>
              <div class="absolute w-full h-full inset-0 bg-no-repeat bg-center animated infinite rotate bg-[url('@/assets/images/dynamic/info-1-2.png')]"></div>
              <div class="absolute w-full h-full inset-0 bg-no-repeat bg-center animated infinite rotate bg-[url('@/assets/images/dynamic/info-1-3.png')]"></div>
              <div class="absolute w-full h-full inset-0 bg-no-repeat bg-center animated infinite flashPD bg-[url('@/assets/images/dynamic/info-1-4.png')]"></div>
            </div>

            <div class="absolute left-0 top-[15px] pl-[290px] h-[60px] bg-no-repeat bg-[180px_center] animated fadeInLeft bg-[url('@/assets/images/dynamic/info-line-01.png')]">
              <div class="absolute w-[54px] h-[54px] top-[5px] bg-no-repeat bg-center animated infinite rotate bg-[url('@/assets/images/dynamic/info-bg-01.png')]"></div>
              <div class="absolute w-[54px] h-[54px] top-[5px] bg-no-repeat bg-center bg-[url('@/assets/images/dynamic/info-icon-1.png')]"></div>
              <div class="flex flex-col text-[#0072bc] text-lg pl-[60px] pt-[5px]">
                <span>区块链</span>
                <span id="number1" class="odometer odometer-theme-digital">
                  <countTo :startVal="startVal" :endVal="6681" :duration="6000"></countTo>
                </span>
              </div>
            </div>

            <div class="absolute left-0 top-[70px] pl-[350px] h-[60px] bg-no-repeat bg-[180px_center] animated fadeInLeft bg-[url('@/assets/images/dynamic/info-line-02.png')]">
              <div class="absolute w-[54px] h-[54px] top-[5px] bg-no-repeat bg-center animated infinite rotateF bg-[url('@/assets/images/dynamic/info-bg-02.png')]"></div>
              <div class="absolute w-[54px] h-[54px] top-[5px] bg-no-repeat bg-center bg-[url('@/assets/images/dynamic/info-icon-2.png')]"></div>
              <div class="flex flex-col text-[#0072bc] text-lg pl-[60px] pt-[5px]">
                <span>大数据</span>
                <span id="number2" class="odometer odometer-theme-digital">
                  <countTo :startVal="startVal" :endVal="4679" :duration="6000"></countTo>
                </span>
              </div>
            </div>

            <div class="absolute left-0 top-[135px] pl-[350px] h-[60px] bg-no-repeat bg-[180px_center] animated fadeInLeft bg-[url('@/assets/images/dynamic/info-line-02.png')]">
              <div class="absolute w-[54px] h-[54px] top-[5px] bg-no-repeat bg-center animated infinite rotateF bg-[url('@/assets/images/dynamic/info-bg-03.png')]"></div>
              <div class="absolute w-[54px] h-[54px] top-[5px] bg-no-repeat bg-center bg-[url('@/assets/images/dynamic/info-icon-3.png')]"></div>
              <div class="flex flex-col text-[#0072bc] text-lg pl-[60px] pt-[5px]">
                <span>云计算</span>
                <span id="number3" class="odometer odometer-theme-digital">
                  <countTo :startVal="startVal" :endVal="5594" :duration="6000"></countTo>
                </span>
              </div>
            </div>

            <div class="absolute left-0 top-[190px] pl-[290px] h-[60px] bg-no-repeat bg-[180px_center] animated fadeInLeft bg-[url('@/assets/images/dynamic/info-line-01.png')]">
              <div class="absolute w-[54px] h-[54px] top-[5px] bg-no-repeat bg-center animated infinite rotate bg-[url('@/assets/images/dynamic/info-bg-04.png')]"></div>
              <div class="absolute w-[54px] h-[54px] top-[5px] bg-no-repeat bg-center bg-[url('@/assets/images/dynamic/info-icon-4.png')]"></div>
              <div class="flex flex-col text-[#0072bc] text-lg pl-[60px] pt-[5px]">
                <span>人工智能</span>
                <span id="number4" class="odometer odometer-theme-digital">
                  <countTo :startVal="startVal" :endVal="1208" :duration="6000"></countTo>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
  name: "DynamicList",
  components: {
    countTo,
  },
  data() {
    return {
      startVal: 0,
    };
  },
};
</script>

<style scoped>
.animated {
  animation-duration: 20s;
  animation-fill-mode: both;
}

.animated.infinite {
  animation-iteration-count: infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotateF {
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes flashPD {
  0%,
  90% {
    opacity: 1;
  }
  92%,
  98% {
    opacity: 0;
  }
  96%,
  100% {
    opacity: 1;
  }
}

.rotate {
  animation-name: rotate;
  animation-timing-function: linear;
}

.rotateF {
  animation-name: rotateF;
  animation-timing-function: linear;
}

.flashPD {
  animation-name: flashPD;
}
</style>
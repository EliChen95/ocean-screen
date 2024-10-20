<template>
  <ScaleScreen class="overflow-hidden">
    <div
      class="bg-[url('@/assets/images/background.png')] w-full h-full bg-cover bg-center p-[16px] pb-[10px]"
    >
      <VHeader />
      <main class="w-full h-[calc(100%-60px)] flex justify-between gap-[24px]">
        <!-- left part -->
        <section
          class="w-[540px] box-border flex flex-col h-full justify-around relative"
        >
          <ItemWrap class="w-full !h-[310px]" title="设备总览">
            <DeviceOverview />
          </ItemWrap>
          <ItemWrap class="w-full !h-[310px]" title="智能应用">
            <Application />
          </ItemWrap>
          <ItemWrap class="w-full !h-[310px]" title="算力统计">
            <ComputingPower />
          </ItemWrap>
        </section>
        <section class="flex-1 flex flex-col justify-between pb-[10px] relative">
          <MapArea />
          <ItemWrap v-show="isShow" class="!w-full flex-1" title="港口应用统计"> 
            <PortCount />
          </ItemWrap>
          <div class="w-[40px] h-[40px] absolute top-[20px] right-[10px] text-[#fff]" @click="openChatModal">
            海鸥数字人gif
          </div>
        </section>

        <section
          class="w-[540px] box-border flex flex-col h-full justify-around relative"
        >
          <ItemWrap class="w-full !h-[310px]" title="海洋知识库">
            <OceanDatabase />
          </ItemWrap>
          <ItemWrap class="w-full !h-[310px]" title="旅游人次">
            <TravelPeople />
          </ItemWrap>
          <ItemWrap class="w-full !h-[310px]" title="海洋文旅">
            <NewsArea />
          </ItemWrap>
        </section>
      </main>

      <!-- 聊天框 -->
      <ChatModal :isVisible="isChatModalVisible" @close="closeChatModal" />
      
    </div>
  </ScaleScreen>
</template>

<script>
import ScaleScreen from "@/components/scale-screen";
import DeviceOverview from "./sections/device-overview";
import VHeader from "./sections/header";
import Application from "./sections/application";
import ComputingPower from "./sections/computing-power";
import MapArea from "./sections/map-area";
import OceanDatabase from "./sections/ocean-database";
import NewsArea from "./sections/news-area";
import TravelPeople from "./sections/travel-people";
import PortCount from './sections/port-count';
import ChatModal from './sections/chat-modal';

export default {
  name: "OceanScreen",
  components: {
    MapArea,
    ScaleScreen,
    DeviceOverview,
    VHeader,
    Application,
    ComputingPower,
    OceanDatabase,
    NewsArea,
    TravelPeople,
    PortCount,
    ChatModal,
  },
  data() {
    return {
      isShow: false,
      isChatModalVisible: false,  // 控制聊天框显示
    };
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 300);
  },
  methods: {
    openChatModal() {
      this.isChatModalVisible = true;
    },
    closeChatModal() {
      this.isChatModalVisible = false;
    }
  }
};
</script>

<style scoped>
/* 其他样式 */
</style>
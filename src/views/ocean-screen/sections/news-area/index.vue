<template>
  <div class="relative w-full h-full">
    <div class="rounded-lg shadow-lg">
      <div class="overflow-hidden">
        <div class="w-full">
          <!-- 表头 -->
          <div class="table-header text-white text-center font-semibold mb-2">
            <table class="w-full table-fixed">
              <thead>
                <tr>
                  <th class="w-[40%] px-[10px] text-sm">标 题</th>
                  <th class="w-[20%] px-[10px] text-sm">类别</th>
                  <th class="w-[25%] px-[10px] text-sm">日 期</th>
                  <th class="w-[15%] px-[10px] text-sm">热 度</th>
                </tr>
              </thead>
            </table>
          </div>

          <!-- 滚动新闻 -->
          <vue-seamless-scroll :data="listData" class="seamless-scroll" :class-option="optionSetting">
            <table class="w-full table-fixed">
              <tbody>
                <tr v-for="(item, index) in listData" :key="index" class="text-gray-300 text-center">
                  <td class="w-[40%] truncate py-[5px] px-[10px] text-[15px] font-medium hover:text-blue-600">{{ item.title }}</td>
                  <td class="w-[20%] py-[5px] px-[10px] text-[14px] font-semibold">{{ item.category }}</td>
                  <td class="w-[25%] py-[5px] px-[10px] text-[14px] font-light">{{ item.date }}</td>
                  <td class="w-[15%] py-[5px] px-[10px] text-[14px]">
                    <span :class="{
                      'text-red-500 font-bold': item.hot > 4999,
                      'text-orange-400 font-medium': item.hot < 10,
                      'font-medium': item.hot >= 10 && item.hot <= 4999
                    }">{{ item.hot }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll';

export default {
  name: "NewsArea",
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      // 列表数据，围绕青岛和海洋两个主题
      listData: [
        { title: '青岛市发布海洋产业发展政策', date: '2024-10-01', hot: 3200, category: '政策动态' },
        { title: '青岛全面推进海洋经济特区建设', date: '2024-09-25', hot: 4500, category: '政策动态' },
        { title: '青岛市出台海洋环保新规，强化海域保护', date: '2024-09-20', hot: 3700, category: '政策动态' },
        { title: '青岛海洋科技园迎来新一轮投资热潮', date: '2024-09-15', hot: 6200, category: '行业动态' },
        { title: '海洋设备制造业在青岛崛起，带动千亿市场', date: '2024-09-10', hot: 5400, category: '行业动态' },
        { title: '青岛水产养殖产业链升级，出口增长20%', date: '2024-09-05', hot: 4800, category: '行业动态' },
        { title: '青岛海底世界推出全新科普项目', date: '2024-09-28', hot: 900, category: '景区新闻' },
        { title: '青岛崂山风景区推出海上观光项目', date: '2024-09-22', hot: 5200, category: '景区新闻' },
        { title: '青岛西海岸新区：海洋旅游带动经济复苏', date: '2024-09-12', hot: 6100, category: '景区新闻' },
        { title: '青岛港迎来首批海洋科技创新船队', date: '2024-10-02', hot: 7000, category: '行业动态' },
        { title: '青岛市政府加大海洋环保投入，改善海域生态', date: '2024-09-01', hot: 3000, category: '政策动态' },
        { title: '青岛海洋博物馆举办国际海洋文化展览', date: '2024-08-29', hot: 580, category: '景区新闻' },
      ],
    };
  },
  computed: {
    optionSetting() {
      return {
        step: 0.5, 
        limitMoveNum: 2, 
        hoverStop: true, 
        direction: 1,
        openWatch: true, 
        singleHeight: 0, 
        waitTime: 1000, 
      };
    },
  },
};
</script>

<style scoped>
.seamless-scroll {
  height: 200px;
  overflow: hidden;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<template>
  <div class="w-full h-full" id="chart_bp"></div> 
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "TourismChart",
  data() {
    return {
      option: null,
    };
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    // 生成当日旅游人次数据
    generateTourismData() {
      return {
        '6:00': [200, 120, 80],   // 旅游人次、在海人数、返回人数
        '12:00': [600, 400, 200],
        '18:00': [1200, 900, 300],
        '24:00': [900, 550, 350],
      };
    },

    // 生成 ECharts 图表
    getEchart() {
      let myChart = echarts.init(document.getElementById('chart_bp'));

      // 获取当日的数据
      const tourismData = this.generateTourismData();

      // 设置与海洋相关的颜色
      const itemStyleTourism = { color: '#1E90FF' };  // 深蓝色
      const itemStyleAtSea = { color: '#3CB371' };    // 海洋绿色
      const itemStyleReturn = { color: '#87CEFA' };   // 浅蓝色

      // 准备时间点数据
      const timePoints = ['6:00', '12:00', '18:00', '24:00'];

      // 准备柱状图和饼图的数据
      const barSeriesData = timePoints.map(time => ({
        name: time,
        value: tourismData[time][0],  // 旅游人次
        itemStyle: itemStyleTourism,
      }));

      const pieSeriesData = [
        { name: '旅游人次', value: tourismData['18:00'][0], itemStyle: itemStyleTourism },
        { name: '在海人数', value: tourismData['18:00'][1], itemStyle: itemStyleAtSea },
        { name: '返回人数', value: tourismData['18:00'][2], itemStyle: itemStyleReturn },
      ];

      // 配置图表
      this.option = {
        baseOption: {
          timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 2000,
            data: timePoints,
            lineStyle: { color: '#179bf1' },
            left: 30,
            right: 30,
            bottom: 8,
            label: {
              color: '#2867a8',
            },
            checkpointStyle: {
              color: '#01d8ff',
              symbolSize: 10,
              borderColor: 'rgba(1, 216, 255, 0.5)',
              borderWidth: 5,
            },
            controlStyle: {
              showPlayBtn: false,
              borderColor: '#01bde6',
              itemGap: 20,
            },
            itemStyle: {
              borderColor: '#004b85',
              borderWidth: 1,
              shadowColor: 'rgba(1, 216, 225, 0.5)',
              shadowBlur: 5,
            },
            emphasis: {
              label: {
                color: '#01d8ff',
                show: false,
              },
              checkpointStyle: {
                color: '#01d8ff',
                borderColor: 'rgba(1, 216, 255, 0.5)',
                borderWidth: 5,
              },
              controlStyle: {
                borderColor: 'rgba(1, 216, 255, 0.5)',
              },
              itemStyle: {
                color: '#01d8ff',
                borderColor: 'rgba(1, 216, 225, 0.5)',
                borderWidth: 5,
              },
            },
          },
          grid: {
            bottom: '30%',
            right: "42%",
          },
          xAxis: [{
            type: 'category',
            data: ['旅游人次', '在海人数', '返回人数'], // 分类
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: { color: '#2867a8' },
            },
          }],
          yAxis: [{
            type: 'value',
            name: '人数（人）',
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: {
              show: true,
              lineStyle: { color: '#2867a8' },
            },
          }],
          series: [{
            name: '人数统计',
            type: 'bar',
            barMaxWidth: 15,
            data: barSeriesData.map(item => item.value),
            center: ['20%', '65%'],
            seriesLayoutBy: 'row',
            markPoint: {
              symbol: 'pin',
              itemStyle: {
                normal: {
                  color: '#eb9b44',
                },
              },
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
          }, {
            name: '应用占比',
            type: 'pie',
            center: ['76%', '20%'],
            radius: '28%',
            z: 100,
            label: {
              show: true,
              color: '#fff',  // 文本颜色
              formatter: '{b}: {c} ({d}%)',  // 格式化显示内容
              fontSize: 12,
            },
            labelLine: {
              show: true,
              lineStyle: {
                color: '#fff',  // 连接线颜色
              },
            },
            data: pieSeriesData,
          }],
        },
        options: timePoints.map(time => ({
          series: [
            {
              data: [
                { name: '旅游人次', value: tourismData[time][0], itemStyle: itemStyleTourism },
                { name: '在海人数', value: tourismData[time][1], itemStyle: itemStyleAtSea },
                { name: '返回人数', value: tourismData[time][2], itemStyle: itemStyleReturn },
              ],
            },
            {
              data: [
                { name: '旅游人次', value: tourismData[time][0], itemStyle: itemStyleTourism },
                { name: '在海人数', value: tourismData[time][1], itemStyle: itemStyleAtSea },
                { name: '返回人数', value: tourismData[time][2], itemStyle: itemStyleReturn },
              ],
            },
          ],
        })),
      };

      myChart.setOption(this.option, true);

      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style scoped>
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
</style>
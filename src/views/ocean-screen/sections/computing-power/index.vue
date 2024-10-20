<template>
  <EchartsWrap
    id="rightTop"
    :options="option"
    class="-top-[8px]"
    v-if="isChartVisible"
    ref="chartRef"
  />
</template>

<script>
import { graphic } from "echarts";

export default {
  name: 'ComputingPower',
  components: {

  },
  data() {
    return {
      option: {},
      isChartVisible: false,
      intervalId: null,
    };
  },

  mounted() {
    this.fetchChartData();
  },

  beforeDestroy() {
    this.clearInterval();
  },

  methods: {
    clearInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    fetchChartData() {
      this.isChartVisible = true;

      // 模拟获取 CPU、GPU、内存、磁盘使用率的数据
      const dateList = this.generateDateList();
      const cpuUsage = this.generateRandomUsageData(15, 50); // CPU 使用率在 15% 至 50% 之间
      const gpuUsage = this.generateRandomUsageData(10, 60); // GPU 使用率在 10% 至 60% 之间
      const ramUsage = this.generateRandomUsageData(30, 70); // 内存使用率在 30% 至 70% 之间
      const diskUsage = this.generateRandomUsageData(5, 40); // 磁盘使用率在 5% 至 40% 之间

      this.$nextTick(() => {
        this.initializeChart(dateList, cpuUsage, gpuUsage, ramUsage, diskUsage);
        this.setupAutoRefresh();
      });
    },

    setupAutoRefresh() {
      if (this.intervalId) {
        return;
      }

      const refreshInterval = 5000;

      this.intervalId = setInterval(() => {
        this.fetchChartData();
      }, refreshInterval);

      const chartInstance = this.$refs.chartRef.chart;

      chartInstance.on("mouseover", () => this.clearInterval());
      chartInstance.on("mouseout", () => {
        this.intervalId = setInterval(() => {
          this.fetchChartData();
        }, refreshInterval);
      });
    },

    initializeChart(dateList, cpuUsage, gpuUsage, ramUsage, diskUsage) {
      this.option = {
        xAxis: {
          type: "category",
          data: dateList,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
          max: 100, // 使用率的最大值是100%
          axisPointer: {
            snap: true,
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
          formatter: (params) => {
            let result = `${params[0].name}<br/>`;
            params.forEach((item) => {
              result += `${item.marker} ${item.seriesName}: ${item.value} %<br/>`;
            });
            return result;
          }
        },
        grid: {
          left: "10px",
          right: "30px",
          bottom: "10px",
          top: "50px", // 拉大顶部高度，避免 legend 重叠
          containLabel: true,
          borderColor: "#1F63A3",
        },
        legend: {
          top: "10px", // legend 放在顶部
          left: "center", // 居中显示
          icon: "circle", // 使用圆形图标
          textStyle: {
            color: "#7EB7FD",
          },
        },
        series: [
          this.createLineSeries("CPU 使用率", cpuUsage, "rgba(93,173,226,.7)", "#5DADE2"),
          this.createLineSeries("GPU 使用率", gpuUsage, "rgba(231,76,60,.7)", "#E74C3C"),
          this.createLineSeries("内存 使用率", ramUsage, "rgba(88,214,141,.7)", "#58D68D"),
          this.createLineSeries("磁盘 使用率", diskUsage, "rgba(241,196,15,.7)", "#F1C40F"),
        ],
      };
    },

    createLineSeries(name, data, color) {
      return {
        data,
        type: "line",
        smooth: true,
        symbol: "none",
        name,
        color,
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color },
            { offset: 1, color: `${color.slice(0, -2)}0)` },
          ]),
        },
      };
    },

    // 生成模拟的时间轴数据
    generateDateList() {
      const now = new Date();
      const hours = Array.from({ length: 24 }, (_, i) => {
        const date = new Date(now.getTime() - i * 60 * 60 * 1000);
        return `${date.getHours()}:00`;
      }).reverse();
      return hours;
    },

    // 生成模拟的使用率数据，参数为最小值和最大值
    generateRandomUsageData(min, max) {
      return Array.from({ length: 24 }, () => {
        const randomValue = Math.random() * (max - min) + min;
        return randomValue.toFixed(2); // 保留两位小数
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
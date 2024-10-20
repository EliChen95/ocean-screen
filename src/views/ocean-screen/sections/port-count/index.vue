<template>
  <div class="w-full h-full" id="chart_port"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "PortStatistics",
  data() {
    return {
      option: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById("chart_port"));
      const portNames = ["青岛港", "黄岛港", "董家口港", "红石崖港", "胶州湾港"];
      const cargoThroughput = [4000, 4500, 4200, 3900, 3700];
      const foreignCargo = [3000, 3200, 3100, 2800, 2600];
      const shipsArrived = [100, 120, 110, 95, 90];
      const shipsDeparted = [-120, -130, -115, -100, -95]; // 离港数量用负值表示反方向

      // 创建渐变色
      const createGradient = (startColor, endColor) => ({
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: startColor }, // 起始颜色
          { offset: 1, color: endColor },   // 终止颜色
        ],
      });

      this.option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
          formatter: (params) => {
            let result = `${params[0].name}<br/>`;
            params.forEach((item) => {
              // 如果是离港数量，将数值显示为正值
              let value = item.seriesName === "离港数量" ? Math.abs(item.value) : item.value;
              result += `${item.marker} ${item.seriesName}: ${value}<br/>`;
            });
            return result;
          },
        },
        legend: {
          data: ["货物吞吐量", "外贸货物量", "到港数量", "离港数量"],
          textStyle: {
            color: "#1e90ff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "8%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: portNames,
          axisLine: {
            lineStyle: {
              color: "#2867a8",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#2867a8",
            },
          },
          axisLabel: {
            formatter: (value) => {
              return Math.abs(value);
            },
          },
          splitLine: {
            show: false, // 移除水平分割线
          },
          min: -150, // 调整最小值，给小数值更多展示空间
          max: 5000, // 控制最大值
        },
        series: [
          {
            name: "货物吞吐量",
            type: "bar",
            barWidth: "15%",
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
            itemStyle: {
              color: createGradient('#1E90FF', '#87CEFA'), // 渐变色
            },
            data: cargoThroughput,
          },
          {
            name: "外贸货物量",
            type: "bar",
            barWidth: "15%",
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
            itemStyle: {
              color: createGradient('#00BFFF', '#00CED1'), // 渐变色
            },
            data: foreignCargo,
          },
          {
            name: "到港数量",
            type: "bar",
            barWidth: "15%",
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
            itemStyle: {
              color: createGradient('#3CB371', '#2E8B57'), // 渐变色
            },
            data: shipsArrived,
          },
          {
            name: "离港数量",
            type: "bar",
            barWidth: "15%",
            label: {
              show: true,
              formatter: (v) => Math.abs(v.data),
              position: "bottom",
              color: "#fff",
            },
            itemStyle: {
              color: createGradient('#87CEFA', '#4682B4'), // 渐变色
            },
            data: shipsDeparted,
          },
        ],
      };

      myChart.setOption(this.option);

      setTimeout(() => {
        myChart.resize();
      }, 600);

      window.addEventListener("resize", () => {
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
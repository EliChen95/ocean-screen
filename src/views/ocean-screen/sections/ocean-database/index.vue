<template>
  <div class="relative w-full h-full"> 
    <div class="relative w-full h-full"> 
      <div class="absolute inset-0"> 
        <div class="w-full h-full absolute top-0 left-0 bg-no-repeat bg-[center_center] origin-center_center bg-[url('@/assets/images/whcircle.png')] animate-spin-slow"></div> 
        <div class="w-full h-full absolute top-0 left-0 bg-no-repeat bg-[center_center] origin-center_center bg-[url('@/assets/images/circle2.png')] animate-reverse-spin-slow"></div> 
        <div class="w-full h-full absolute top-0 left-0 bg-no-repeat bg-[center_center] origin-center_center bg-[url('@/assets/images/inner.png')]"></div> 
        <div class="absolute top-1/2 left-[215px] w-[76px] h-[1px] bg-gradient-to-r from-[#1f2667] via-[#5afaFD] to-[#1f2667]"></div>
      </div> 
      <div class="absolute inset-0" id="chart_rotate"></div> 
    </div> 
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "RotateColorful",
  data() {
    return {
      option: null,
    };
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    getEchart() {
      let myChart = echarts.init(document.getElementById('chart_rotate'));
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}TB ({d}%)',
        },
        legend: [
          {
            show: true,
            orient: 'vertical',
            left: '0%',
            top: 'center',
            data: [
              '海洋环境数据',
              '海洋气象数据',
              '海洋生态数据',
              '海洋资源数据',
            ],
            textStyle: {
              color: '#4ce5ff',
              fontSize: 14,
            },
            itemGap: 25,
            itemWidth: 10,
            itemHeight: 10,
          },
          {
            show: true,
            orient: 'vertical',
            right: '0%',
            top: 'center',
            data: [
              '海洋港口数据',
              '海洋应急数据',
              '海洋文旅数据',
              '其他数据',
            ],
            textStyle: {
              color: '#4ce5ff',
              fontSize: 14,
            },
            itemGap: 25,
            itemWidth: 10,
            itemHeight: 10,
          },
        ],
        series: [
          {
            name: '海洋数据',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            roseType: 'area',
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            data: [
              {
                value: 2,
                name: '海洋环境数据',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#387ed3' },
                      { offset: 1, color: '#bc8b68' },
                    ]),
                  },
                },
              },
              {
                value: 3,
                name: '海洋气象数据',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#188bfd' },
                      { offset: 1, color: '#51eeff' },
                    ]),
                  },
                },
              },
              {
                value: 1,
                name: '海洋生态数据',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#f56c6c' },
                      { offset: 1, color: '#ff9f43' },
                    ]),
                  },
                },
              },
              {
                value: 0.9,
                name: '海洋资源数据',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#9c27b0' },
                      { offset: 1, color: '#e91e63' },
                    ]),
                  },
                },
              },
              {
                value: 1.2,
                name: '海洋港口数据',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#673ab7' },
                      { offset: 1, color: '#3f51b5' },
                    ]),
                  },
                },
              },
              {
                value: 0.8,
                name: '海洋应急数据',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#4caf50' },
                      { offset: 1, color: '#8bc34a' },
                    ]),
                  },
                },
              },
              {
                value: 0.8,
                name: '海洋文旅数据',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#ff9800' },
                      { offset: 1, color: '#ff5722' },
                    ]),
                  },
                },
              },
              {
                value: 2.4,
                name: '其他数据',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#009688' },
                      { offset: 1, color: '#4caf50' },
                    ]),
                  },
                },
              },
            ],
          },
        ],
      };

      myChart.setOption(this.option, true);

      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes spin-slow {
  0% {
    transform-origin: center;
    transform: rotate(0deg);
  }
  100% {
    transform-origin: center;
    transform: rotate(360deg);
  }
}

@keyframes reverse-spin-slow {
  0% {
    transform-origin: center;
    transform: rotate(0deg);
  }
  100% {
    transform-origin: center;
    transform: rotate(-360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-reverse-spin-slow {
  animation: reverse-spin-slow 20s linear infinite;
}
</style>
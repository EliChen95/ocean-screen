<template>
  <div class="w-full h-full" id="chart_water_level"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "WaterLevel",
  data() {
    return {
      option: null,
      dataMap: {}
    };
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    // 数据格式化函数
    dataFormatter(obj) {
      let pList = Array.from({ length: 25 }, (_, i) => i); // 时间点 [0-24]
      let temp;
      for (let x = 1; x <= 5; x++) {
        let max = 0;
        let sum = 0;
        temp = obj[x];
        for (let i = 0, l = temp.length; i < l; i++) {
          max = Math.max(max, temp[i]);
          sum += temp[i];
          obj[x][i] = {
            name: pList[i],
            value: temp[i]
          };
        }
        obj[x + 'max'] = Math.floor(max / 100) * 100;
        obj[x + 'sum'] = sum;
      }
      return obj;
    },
    
    // 初始化图表
    getEchart() {
      let myChart = echarts.init(document.getElementById('chart_water_level'));

      let itemStyle = {
        barBorderRadius: [15, 0],
        color: '#0084ff'
      };

      // 模拟水位数据（单位：米），水位大部分时间固定
      this.dataMap.dataType = this.dataFormatter({
        5: [3.5, 3.5, 3.5, 3.5, 3.6, 3.7, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.6, 3.5, 3.4, 3.4, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5],
        4: [3.2, 3.2, 3.2, 3.2, 3.3, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.1, 3.1, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2],
        3: [2.8, 2.8, 2.8, 2.9, 2.9, 2.9, 2.9, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.9, 2.9, 2.8, 2.8, 2.8, 2.8, 2.9, 2.9, 2.9, 2.8, 2.8],
        2: [2.5, 2.5, 2.5, 2.4, 2.4, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.4, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
        1: [1.8, 1.8, 1.8, 1.8, 1.8, 1.9, 1.9, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.9, 1.9, 1.8, 1.8, 1.8, 1.8, 1.9, 1.9, 1.8, 1.8, 1.8]
      });

      // 配置项
      this.option = {
        baseOption: {
          timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 1000,
            data: ['5.1', '5.2', '5.3', '5.4', '5.5'],
            left: 30,
            right: 0,
            top: 0,
            lineStyle: {
              color: '#122e96'
            },
            label: {
              color: '#fff'
            },
            checkpointStyle: {
              color: '#ef8c2f',
              symbolSize: 5,
              borderColor: 'rgba(239, 140, 47, 0.5)',
              borderWidth: 5
            },
            controlStyle: {
              showPlayBtn: false,
              borderColor: '#122e96',
              itemGap: 20
            },
            itemStyle: {
              borderColor: '#122e96',
              borderWidth: 5
            },
            emphasis: {
              label: {
                color: '#ef8c2f',
                show: false
              },
              checkpointStyle: {
                color: '#ef8c2f',
                borderColor: 'rgba(239, 140, 47, 0.5)',
                borderWidth: 5
              },
              controlStyle: {
                borderColor: '#122e96'
              },
              itemStyle: {
                color: '#ef8c2f',
                borderColor: 'rgba(239, 140, 47, 0.5)',
                borderWidth: 5
              }
            }
          },
          calculable: true,
          grid: {
            top: '30%',
            bottom: '25%',
            left: '15%',  // 确保 x轴 标签展示出来
            right: '3%'
          },
          xAxis: [{
            type: 'category',
            axisLabel: {
              interval: 5,
              color: '#fff' // 提高可见性
            },
            data: Array.from({ length: 25 }, (_, i) => i), // 时间点 [0-24]
            splitLine: { show: false },
            offset: 10,
            axisTick: {
              show: false,
              alignWithLabel: true,
              interval: 5,
              length: 10,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#2867a8'
              }
            }
          }],
          yAxis: [{
            type: 'value',
            min: 0, 
            max: 10, 
            axisLabel: {
              formatter: '{value} m', // 使用“米”作为单位
              color: '#fff'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }],
          series: [{
            name: '水位线',
            type: 'line',
            markPoint: {
              symbol: 'pin',
              symbolSize: 40,
              itemStyle: {
                normal: {
                  color: '#ef8c2f',
                  shadowColor: '#ef8c2f',
                  shadowBlur: 15
                }
              },
              data: [{ type: 'max', name: '最大值' }]
            },
            itemStyle: {
              borderColor: '#1374e7',
              borderWidth: 10,
              shadowBlur: 10,
              shadowColor: '#1374e7',
              opacity: 0
            },
            label: {
              show: false
            },
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#17418d'
              }, {
                offset: 1,
                color: '#a56d42'
              }])
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#1e4b4b'
                }, {
                  offset: 1,
                  color: 'rgba(0, 0, 0, 0)'
                }])
              }
            },
            smooth: true
          }]
        },
        options: [{
          series: [{
            data: this.dataMap.dataType['1'],
            itemStyle: itemStyle
          }]
        }, {
          series: [{
            data: this.dataMap.dataType['2'],
            itemStyle: itemStyle
          }]
        }, {
          series: [{
            data: this.dataMap.dataType['3'],
            itemStyle: itemStyle
          }]
        }, {
          series: [{
            data: this.dataMap.dataType['4'],
            itemStyle: itemStyle
          }]
        }, {
          series: [{
            data: this.dataMap.dataType['5'],
            itemStyle: itemStyle
          }]
        }]
      };

      myChart.setOption(this.option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  }
};
</script>
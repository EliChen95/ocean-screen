<template>
  <div class="mb-[30px] h-[645px]">
    <div class="h-[60px] flex justify-center pt-[10px] box-border">
      <div class="bg-left-deco w-[29px] h-[20px] mt-[8px]"></div>
      <span
        class="mx-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#0072ff] via-[#00eaff] to-[#01aaff] text-[28px] font-black tracking-[6px]"
      >
        {{ oceanMapTitle }}
      </span>
      <div class="bg-right-deco w-[29px] h-[20px] mt-[8px]"></div>
    </div>
    <div class="relative w-full h-[585px] box-border">
      <div
        class="absolute right-[20px] top-[-46px] w-[80px] h-[28px] border border-[#00eded] rounded-[10px] text-[#00f7f6] text-center leading-[26px] tracking-[6px] cursor-pointer shadow-[0_2px_4px_rgba(0,237,237,0.5),0_0_6px_rgba(0,237,237,0.4)]"
        @click="fetchOceanMapData('370200')"
        v-if="currentOceanRegionCode !== '370200'"
      >返回</div>
      <EchartsWrap id="CenterMap" :options="oceanMapOptions" ref="CenterMap" />
      <ItemWrap class="!absolute right-0 bottom-0 !w-[290px] !h-[210px]" title="水位线">
        <WaterLevel  />
      </ItemWrap>
    </div>
  </div>
</template>

<script>
import regionCodeMapping from "./utils/regionCodeMap";
import { ApiGet } from "@/api/modules";
import * as echarts from "echarts";
import { GETNOBASE } from "@/api";
import WaterLevel from '../water-level'

export default {
  name: "OceanMapArea",
  components: {
    WaterLevel
  },
  data() {
    return {
      oceanMapTitle: "青岛",
      oceanMapOptions: {},
      currentOceanRegionCode: "370200",
      isEchartClickBound: false,
    };
  },
  mounted() {
    this.fetchOceanMapData("370200")
  },
  methods: {
    fetchOceanMapData(regionCode) {
      ApiGet("getMapData", { regionCode }).then((res) => {
        if (res.success) {
          this.loadOceanGeoJson(res.data.regionCode, res.data.dataList);
          this.bindOceanMapClickEvent();
        }
      });
    },

    async loadOceanGeoJson(regionName, regionData) {
      this.currentOceanRegionCode = regionName;
      let geoJsonFileName = regionName;

      let geoJson = await GETNOBASE(`./map-geojson/${geoJsonFileName}.json`).then(
        (res) => res
      );
      echarts.registerMap(regionName, geoJson);

      let regionCenterPoints = {};
      geoJson.features.forEach((feature) => {
        regionCenterPoints[feature.properties.name] =
          feature.properties.centroid || feature.properties.center;
      });

      const formattedOceanData = regionData.map((item) => {
        if (regionCenterPoints[item.name]) {
          return {
            name: item.name,
            value: regionCenterPoints[item.name].concat(item.value),
          };
        }
      });

      this.initOceanMap(regionName, regionData, formattedOceanData);
    },

    initOceanMap(regionName, rawData, formattedData) {
      const topOffset = 55;
      const zoomLevel = 1.25; 
      const option = {
        backgroundColor: "rgba(0,0,0,0)",
        // tooltip: {
        //   trigger: "item",
        //   backgroundColor: "rgba(50, 50, 50, 0.8)", 
        //   borderColor: "#333",
        //   borderWidth: 1,
        //   padding: [10, 15],
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 12,
        //     fontWeight: "bold",
        //   },
        //   formatter: (params) => {
        //     const { name, value } = params;
        //     return `
        //       <div style="text-align: left;">
        //         <strong style="font-size: 14px;">${name}</strong><br/>
        //         开发量: <strong>${value} 万吨</strong> 
        //       </div>
        //     `;
        //   },
        // },
        // visualMap: {
        //   left: 20,
        //   bottom: 20,
        //   pieces: [
        //     { gte: 1000, label: "1000万吨以上", color: "#0050b3" },  
        //     { gte: 600, lte: 999, label: "600-999万吨", color: "#0072ff" }, 
        //     { gte: 200, lte: 599, label: "200-599万吨", color: "#00a6ff" }, 
        //     { gte: 50, lte: 199, label: "50-199万吨", color: "#00d4ff" },  
        //     { gte: 10, lte: 49, label: "10-49万吨", color: "#00ffff" }, 
        //     { lte: 9, label: "1-9万吨", color: "#66ffff" },  
        //   ],
        //   textStyle: {
        //     color: "#fff",
        //   },
        // },
        geo: {
          map: regionName,
          roam: false,
          selectedMode: false,
          zoom: zoomLevel,
          top: topOffset,
          show: false,
        },
        series: [
          {
            name: "MAP",
            type: "map",
            map: regionName,
            data: rawData,
            zoom: zoomLevel,
            geoIndex: 1,
            top: topOffset,
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: "#389BB7",
                borderWidth: 1,
              },
            },
            itemStyle: {
              borderColor: "rgba(147, 235, 248, .8)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  { offset: 0, color: "rgba(147, 235, 248, 0)" },
                  { offset: 1, color: "rgba(147, 235, 248, .2)" },
                ],
              },
              shadowColor: "rgba(128, 217, 248, .3)",
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
          },
          {
            data: formattedData,
            type: "effectScatter",
            coordinateSystem: "geo",
            symbolSize: 4,
            rippleEffect: {
              scale: 6,
              color: "rgba(255,255,255, 1)",
              brushType: "fill",
            },
            label: {
              formatter: (param) => param.name.slice(0, 2),
              fontSize: 12,
              offset: [0, 2],
              position: "bottom",
              textBorderColor: "#fff",
              textShadowColor: "#000",
              textShadowBlur: 10,
              color: "#FFF",
              show: true,
            },
            itemStyle: {
              color: "rgba(255,255,255,1)",
              borderColor: "rgba(255,255,255,2)",
              borderWidth: 4,
              shadowColor: "#000",
              shadowBlur: 10,
            },
          },
        ],
      };
      this.oceanMapOptions = option;
    },

    bindOceanMapClickEvent() {
      if (this.isEchartClickBound || !this.$refs.CenterMap) return;
      this.$refs.CenterMap.chart.on("click", (params) => {
        const regionInfo = regionCodeMapping[params.name];
        if (regionInfo) {
          this.fetchOceanMapData(regionInfo.adcode);
        }
      });
      this.isEchartClickBound = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-left-deco {
  background: url("@/assets/images/center-title.png") no-repeat;
  background-size: 100% 100%;
}

.bg-right-deco {
  background: url("@/assets/images/center-title.png") no-repeat;
  background-size: 100% 100%;
}
</style>
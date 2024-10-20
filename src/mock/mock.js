import Mock from "mockjs";

Mock.setup({
  timeout: "200-600",
});

function getUserOverview() {
  const result = Mock.mock({
    success: true,
    data: {
      offlineNum: "@integer(1, 100)",
      lockNum: "@integer(1, 10)",
      totalNum: 218,
    },
  });
  result.data.onlineNum =
    result.data.totalNum - result.data.offlineNum - result.data.lockNum;
  return result;
}

Mock.mock(new RegExp("getUserOverview"), "get", getUserOverview);

function getDeviceOverview() {
  const result = Mock.mock({
    success: true,
    data: {
      alarmNum: "@integer(8, 10)",
      offlineNum: "@integer(5, 25)",
      totalNum: 1208,
    },
  });
  result.data.onlineNum = result.data.totalNum - result.data.offlineNum;
  return result;
}

Mock.mock(new RegExp("getDeviceOverview"), "get", getDeviceOverview);

function getDeviceList() {
  const result = Mock.mock({
    success: true,
    data: {
      "list|20": [
        {
          provinceName: "@province()",
          cityName: "@city()",
          countyName: "@county()",
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          deviceId: "6c512d754bbcd6d7cd86abce0e0cac58",
          "gatewayNo|+1": 10000,
          "onlineState|1": [0, 1],
        },
      ],
    },
  });
  return result;
}

Mock.mock(new RegExp("getDeviceList"), "get", getDeviceList);

function getMapData(options) {
    const params = getUrlParams(options.url);
    console.log(params);
  
    const qingdaoDistricts = [
      "市南区",
      "市北区",
      "黄岛区",
      "崂山区",
      "李沧区",
      "城阳区",
      "即墨区",
      "胶州市",
      "平度市",
      "莱西市",
    ];
  
    if (params.regionCode) {
      return Mock.mock({
        success: true,
        data: {
          "dataList": qingdaoDistricts.map((district) => ({
            name: district,
            value: Mock.Random.integer(1, 1000),
          })),
          regionCode: params.regionCode,
        },
      });
    }
  }

Mock.mock(new RegExp("getMapData"), "get", getMapData);

function getAlarmData() {
  return Mock.mock({
    success: true,
    data: {
      dateList: [
        "2021-11",
        "2021-12",
        "2022-01",
        "2022-02",
        "2022-03",
        "2022-04",
      ],
      "numList|6": ["@integer(0, 1000)"],
      "numList2|6": ["@integer(0, 1000)"],
    },
  });
}

Mock.mock(new RegExp("getAlarmData"), "get", getAlarmData);

function getRealTimeWarnings() {
  return Mock.mock({
    success: true,
    data: {
      "list|40": [
        {
          alertDetail: "@csentence(5,10)",
          "alertName|1": ["水浸告警", "各种报警"],
          alertValue: "@float(60, 200)",
          createTime: "2022-04-19 08:38:33",
          deviceId: null,
          "gatewayNo|+1": 10000,
          phase: "A1",
          deviceInfo: "@csentence(10,18)",
          "terminalNo|+1": 100,
          provinceName: "@province()",
          cityName: "@city()",
          countyName: "@county()",
        },
      ],
    },
  });
}

Mock.mock(new RegExp("getRealTimeWarnings"), "get", getRealTimeWarnings);

function getInstallationPlan() {
  const num = getRandomIntInRange(26, 32);
  const result = Mock.mock({
    [`category|${num}`]: ["@city()"],
    [`barData|${num}`]: ["@integer(10, 100)"],
  });

  const lineData = [];
  const rateData = [];

  for (let i = 0; i < num; i++) {
    const lineNum = Mock.mock("@integer(0, 100)") + result.barData[i];
    lineData.push(lineNum);
    const rate = result.barData[i] / lineNum;
    rateData.push((rate * 100).toFixed(0));
  }

  result.lineData = lineData;
  result.rateData = rateData;

  return {
    success: true,
    data: result,
  };
}

Mock.mock(new RegExp("getInstallationPlan"), "get", getInstallationPlan);

function getAlarmRanking() {
  const data = Mock.mock({
    "list|48": [{ value: "@integer(50,1000)", name: "@city()" }],
  }).list;

  const uniqueCities = [];
  const cityMap = {};

  data.forEach((item) => {
    if (!cityMap[item.name] && uniqueCities.length < 8) {
      cityMap[item.name] = true;
      uniqueCities.push(item);
    }
  });

  uniqueCities.sort((a, b) => b.value - a.value);

  return {
    success: true,
    data: uniqueCities,
  };
}

Mock.mock(new RegExp("getAlarmRanking"), "get", getAlarmRanking);

function getRandomIntInRange(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getUrlParams(url) {
  const params = {};
  if (/\?/.test(url)) {
    const queryString = url.split("?")[1];
    const queryArray = queryString.split("&");
    queryArray.forEach((item) => {
      const [key, value] = item.split("=");
      params[key] = value;
    });
  }
  return params;
}

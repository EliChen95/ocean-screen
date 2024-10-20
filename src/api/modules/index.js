import * as API from "../api";

export const apiEndpoints = {
  getUserOverview: "/getUserOverview",
  getDeviceOverview: "/getDeviceOverview",
  getDeviceList: "/getDeviceList",
  getMapData: "/getMapData",
  getAlarmData: "/getAlarmData",
  getRealTimeWarnings: "/getRealTimeWarnings",
  getInstallationPlan: "/getInstallationPlan",
  getAlarmRanking: "/getAlarmRanking",
};

export const ApiGet = (key, params) => {
  return API.GET(apiEndpoints[key], params);
};

export const apiMethods = {
  ApiGet,
};

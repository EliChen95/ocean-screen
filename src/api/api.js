import axios from 'axios';
import UtilVar from "@/config/UtilVar";

const baseUrl = UtilVar.baseUrl;
const CancelToken = axios.CancelToken;

export { baseUrl };

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers['Content-Type'] = "application/json;charset=utf-8";
    config.headers['token'] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response);
    }

    if (response.data.code === UtilVar.code) {
      // Handle token expiration or invalid token logic here (e.g., redirect to login)
    }

    return response.data;
  },
  () => {
    const err = { success: false, msg: "error" };
    return Promise.reject(err);
  }
);

const defaultEncryptionHeaders = {
  headers: { 'enc': UtilVar.ENC },
};


export const GET = async (url, params) => {
  try {
    const response = await axios.get(`${baseUrl}${url}`, {
      params,
      headers: defaultEncryptionHeaders.headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const GETNOBASE = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response;
  } catch (error) {
    return error;
  }
};

export const POST = async (url, params) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, params, defaultEncryptionHeaders);
    return response;
  } catch (error) {
    return error;
  }
};

export const PUT = async (url, params) => {
  try {
    const response = await axios.put(`${baseUrl}${url}`, params, defaultEncryptionHeaders);
    return response;
  } catch (error) {
    return error;
  }
};

export const DELETE = async (url, params) => {
  try {
    const response = await axios.delete(`${baseUrl}${url}`, {
      data: params,
      headers: defaultEncryptionHeaders.headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

const fileUploadConfig = {
  headers: { 'Content-Type': 'multipart/form-data' },
};

export const FILESubmit = async (url, params, config) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, params, {
      ...fileUploadConfig,
      cancelToken: new CancelToken((cancel) => config.setCancel && config.setCancel(cancel)),
      onUploadProgress: (event) => {
        if (event.total > 0) {
          event.percent = (event.loaded / event.total) * 100;
        }
        config.onProgress && config.onProgress(event);
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const FILE = async (config = {}, body, params) => {
  try {
    const response = await axios({
      method: config.method || 'get',
      url: `${baseUrl}${config.url}`,
      data: body,
      params,
      responseType: config.responseType || 'blob',
      onDownloadProgress: (event) => {
        config.onProgress && config.onProgress(event);
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
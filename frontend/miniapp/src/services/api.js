import Taro from "@tarojs/taro";

const BASE_URL = "http://localhost:8000";

function getToken() {
  return Taro.getStorageSync("access_token") || "";
}

export function setToken(token) {
  Taro.setStorageSync("access_token", token);
}

export function clearToken() {
  Taro.removeStorageSync("access_token");
}

async function request(path, options = {}) {
  const { method = "GET", data, withToken = true } = options;
  const header = { "Content-Type": "application/json" };
  if (withToken) {
    const token = getToken();
    if (token) header["Authorization"] = "Bearer " + token;
  }
  const res = await Taro.request({ url: BASE_URL + path, method, data, header });
  if (res.statusCode === 401) {
    clearToken();
    Taro.reLaunch({ url: "/pages/login/index" });
    throw new Error("Unauthorized");
  }
  if (res.statusCode >= 400) throw new Error("Request failed: " + res.statusCode);
  return res.data;
}

export const api = {
  get:   (path, withToken = true) => request(path, { method: "GET", withToken }),
  post:  (path, data, withToken = true) => request(path, { method: "POST", data, withToken }),
  patch: (path, data) => request(path, { method: "PATCH", data }),
  del:   (path) => request(path, { method: "DELETE" }),
};

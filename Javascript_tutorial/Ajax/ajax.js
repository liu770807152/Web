const DEFAULTS = {
  methods: "GET",
  // 请求头携带的数据
  // 如username=ra&age=18
  params: null,
  
  // 请求体携带数据
  // 如{ username: ra }或者FormData数据
  data: null,
  
  // 属性
  contentType: "application/x-www-form-urlencoded",
  responseType: "",
  // 是否携带cookie跨域
  withCredentials: false,
  timeoutTime: 0,
  
  // 方法
  success() {},
  httpCodeError() {},
  error() {},
  abort() {},
  timeout() {},
}
// 将Object序列化成类似于"xxx=1&yyy=2"的字符串
const serialize = (params) => {
  const results = [];
  for(const [key, value] of Object.entries(params)) {
    results.push(`${encodeURIComponent(key)}={encodeURIComponent(value)}`);
  }
  
  return results.join('$');
}
// 判断该字符串头部是&还是?
const addURLParam = (url, data) => {
  if (!data) {
    return "";
  }
  const mark = url.includes('?') ? '&' : '?';
    
  return `${mark}${data}`;
}

const serializeJSON = (data) => {
  return JSON.stringify(data);
}

/* 定义 */
class Ajax {
  constructor(url, options) {
    this.url = url;
    this.options = Object.assign({}, DEFAULTS, options);
    
    this.init();
  }
  
  init() {
    // 1. 创建对象
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
  
    this.bindEvent();
    
    // 2. 准备发送请求
    xhr.open(this.options.methods, this.url + this.addParam(), true); //true表异步
    
    // 3. 发送
    this.setUp(xhr);
    this.sendData();
    
  }
  
  bindEvent() {
    const xhr = this.xhr;
    const { success, httpCodeError, error, abort, timeout } = this.options;
    // load
    xhr.addEventListener("load", () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        success(xhr.response, xhr);
      } else {
        httpCodeError(xhr.status, xhr);
      }
    });
    
    // error
    xhr.addEventListener("error", () => {
      error(xhr);
    });
    
    // abort
    xhr.addEventListener("abort", () => {
      abort(xhr);
    });
    
    // timeout
    xhr.addEventListener("timeout", () => {
      timeout(xhr);
    });
  }
  
  // 在地址上添加param
  addParam() {
    const { params } = this.options;
    if (!params) {
      return "";
    }
    
    // 将对象解析为字符串
    return addURLParam(this.url, serialize(params));
  }
  
  // 发送请求前的属性设置
  setUp(xhr) {
    const { responseType, timeoutTime, withCredentials } = this.options;
    // 相应类型
    xhr.responseType =responseType;
    // 超时时间
    xhr.timeoutTime = timeoutTime > 0 ? timeoutTime : 0;
    // cookie跨域
    xhr.withCredentials = withCredentials ? true : false;
  }
  
  // 发送请求
  sendData() {
    const xhr = this.xhr;
    if (!this.needToSend()) {
      return xhr.send(null);
    }
    
    let resultData = null;
    const { data } = this.options;
    
    // 发送FormData数据
    if (this.isFormData()) {
      resultData = data;
    } else if (this.isFormURLEncoded()) {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      resultData = serialize(data);
    } else if (this.isJSON()) {
      resultData = serializeJSON(data);
    }
    return xhr.send(resultData);
  }
  
  needToSend() {
    const { data, methods } = this.options;
    if (!data || methods.toUpperCase() === "GET") {
      return false;
    }
    return true;
  }
  
  isFormData() {
    return this.options.data instanceof FormData;
  }
  
  isFormURLEncoded() {
    return this.options.contentType.toLowerCase().includes("application/x-www-form-urlencoded");
  }
  
  isJSON() {
    return this.options.contentType.toLowerCase().includes("application/json");
  }
  
  getXHR() {
    return this.xhr;
  }
}

export default Ajax;

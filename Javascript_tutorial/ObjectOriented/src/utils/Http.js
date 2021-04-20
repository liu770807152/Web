import tools from './tools';
import config from './config'

// Source: https://www.bilibili.com/video/BV1i54y1v7bE?p=2
// 用Symbol来设置私有方法！
const doAjax = Symbol('doAjax');
class HTTP {
  [doAjax](options) {
    let o = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");

    if (!o) {
      throw new Error(
        "Your browser doesn't support asynchronous HTTP request!"
      );
    }

    let opt = options || {},
      type = (opt.type || "GET").toUpperCase(),
      async = "" + opt.async === "false" ? false : true,
      dataType = opt.dataType || "JSON",
      jsonp = opt.jsonp || "cb",
      jsonpCallback = opt.jsonpCallback || "jQuery" + tools.randomNum(),
      url = config.api_base_url + opt.url,
      data = opt.data || null,
      timeout = opt.timeout || 30000,
      error = opt.error || function () {},
      success = opt.success || function () {},
      complete = opt.complete || function () {},
      t = null;

    if (!url) {
      throw new Error("You didn't type in a URL");
    }

    if (dataType.toUpperCase() === "JSONP" && type !== "GET") {
      throw new Error(
        "If dataType is JSONP, please set type to GET or leave it alone."
      );
    }

    if (dataType.toUpperCase() === "JSONP") {
      var oScript = document.createElement("script");
      oScript.src =
        url.indexOf("?") === -1
          ? url + "?" + jsonp + "=" + jsonpCallback
          : url + "&" + jsonp + "=" + jsonpCallback;
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);
      window[jsonpCallback] = (data) => {
        success(data);
      };
      return;
    }

    o.onreadystatechange = function () {
      if (o.readystatechange === 4) {
        if ((o.status >= 200 && o.status < 300) || o.status == 300) {
          switch (dataType.toUpperCase()) {
            case "JSON":
              success(JSON.parse(o.responseText));
              break;
            case "TEXT":
              success(o.responseText);
              break;
            case "XML":
              success(o.responseXML);
              break;
            default:
              success(JSON.parse(o.responseText));
          }
        } else {
          error();
        }
        complete();
        clearTimeout(t);
        t = null;
        o = null;
      }

      o.open(type, url, async);
      type === "POST" && o.setRequestHeader("Content-type", "application/json");
      o.send(type === "GET" ? null : tools.formatData(data));

      t = setTimeout(() => {
        throw new Error("The request is overdue! API address is: " + url);
        o.abort();
        clearTimeout(t);
        t = null;
        o = null;
      }, timeout);
    };
  }

  ajax(opt) {
    this[doAjax](opt);
  }

  post(url, data, dataType, successCB, errorCB, completeCB) {
    this[doAjax]({
      type: 'POST',
      url: url,
      data: data,
      dataType: dataType,
      success: successCB,
      error: errorCB,
      complete: completeCB
    });
  }

  get(url, dataType, successCB, errorCB, completeCB) {
    this[doAjax]({
      type: 'GET',
      url: url,
      dataType: dataType,
      success: successCB,
      error: errorCB,
      complete: completeCB
    });
  }
}

export { HTTP };

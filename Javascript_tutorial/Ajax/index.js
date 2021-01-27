import Ajax from "./ajax.js";
  
// 有Promise版本
const ajax = (url, options) => {
	let xhr;
	const p = new Promise((resolve, reject) => {
		xhr = new Ajax(url, {...options, 
			...{
				success(response) {
					resolve(response);
				},
				heepCodeError(status) {
					reject({
						type: 1,
						text: `HTTP状态码异常: ${status}`
					});
				},
				error(response) {
					reject({
						type: 2,
						text: "请求被阻止"
					});
				},
				abort(response) {
					reject({
						type: 3,
						text: "请求终止"
					});
				},
				timeout(response) {
					reject({
						type: 4,
						text: "请求超时"
					});
				}
			}
		}).getXHR();
	  p.xhr = xhr;
	  return p;
  });
}
   
// 无Promise版本
const get = (url, options) => {
	return new Ajax(url, { ...options, method: "GET" }).getXHR();
}

const post = (url, options) => {
	return new Ajax(url, { ...options, method: "POST" }).getXHR();
}

const getJSON = (url, options) => {
	return new Ajax(url, { ...options, method: "GET", responseType: "json" }).getXHR();
}

export { ajax, get, getJSON, post };

export function postApi(url, data = {}) {
	let post = Object.keys(data).map(key => key + '=' + encodeParam(data[key])).join('&');
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
			'ajax': true
		},
		body: post,
		mode: 'cors',
		credentials: 'include'
	}).then(response => {
		if (response.ok === false) {
			if (response.status === 404) {
				throw new Error('请求的资源没有找到:404错误,' + url)
			}
		}
		return response.json()
		// return response.text();
	}).then(jsonObj => {
			if (jsonObj.pd === false) {
				console.warn(jsonObj.error_desc || 'session timeout');
				//window.location.reload();
				return;
			}
			return jsonObj;
	}).catch(error => {
			console.error('服务器返回数据必须是json格式', error);
			console.error('fetch data parsing failed. ' + error.message);
			
	});
}

function encodeParam(value = '') {
	if (typeof value === 'object') {
		return encodeURIComponent(JSON.stringify(value));
	} else {
		return encodeURIComponent(value);
	}
}


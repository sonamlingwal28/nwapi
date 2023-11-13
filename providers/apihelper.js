
class apihelper {	
	axios = require('axios');
	/** @type { status } */
	validateStatus = (status) => status > 0;
	/**
	 * Submit HTTP Post request
	 * 
	 * @param {string} url 
	 * @param {string} body 
	 * @param {any} [headers] 
	 * @param {any} [params] 
	 * @param {status} [validateStatus] 
	 * @returns {Promise<response>} Response
	 */
	async submitPost(url, body, headers, params, validateStatus) {
		let response = {};
		await this.axios.post(url, body, { headers: headers, params: params, validateStatus: validateStatus !== undefined ? validateStatus : this.validateStatus })
			.then(res => {
				response.status = res.status;
				response.statusText = res.statusText;
				response.headers = res.headers;
				response.body = res.data;
				response.isPromiseRejected = false;
			})
			.catch(err => {
				if (err.response != undefined) {
					response.status = err.response.status;
					response.statusText = err.response.statusText;
					response.headers = err.response.headers;
					response.body = err.response.data;
				} else {
					response.err = err;
				}
				response.isPromiseRejected = true;
			});

		return response
	}

	async submitPut(url, body, headers, params, validateStatus) {
		let response = {};
		await this.axios.put(url, body, { headers: headers, params: params, validateStatus: validateStatus !== undefined ? validateStatus : this.validateStatus })
			.then(res => {
				response.status = res.status;
				response.statusText = res.statusText;
				response.headers = res.headers;
				response.body = res.data;
				response.isPromiseRejected = false;
			})
			.catch(err => {
				if (err.response != undefined) {
					response.status = err.response.status;
					response.statusText = err.response.statusText;
					response.headers = err.response.headers;
					response.body = err.response.data;
				} else {
					response.err = err;
				}
				response.isPromiseRejected = true;
			});

		return response
	}

	async submitDelete(url, headers) {
		let response = {};
		await this.axios.delete(url, { headers: headers })
			.then(res => {
				response.status = res.status;
				response.statusText = res.statusText;
				response.headers = res.headers;
				response.body = res.data;
				response.isPromiseRejected = false;
			})
			.catch(err => {
				if (err.response != undefined) {
					response.status = err.response.status;
					response.statusText = err.response.statusText;
					response.headers = err.response.headers;
					response.body = err.response.data;
				} else {
					response.err = err;
				}
				response.isPromiseRejected = true;
			});

		return response
	}

	async submitGet(url, headers) {
		let response = {};
		await this.axios.get(url, { headers: headers })
			.then(res => {
				response.status = res.status;
				response.statusText = res.statusText;
				response.headers = res.headers;
				response.body = res.data;
				response.isPromiseRejected = false;
			})
			.catch(err => {
				if (err.response != undefined) {
					response.status = err.response.status;
					response.statusText = err.response.statusText;
					response.headers = err.response.headers;
					response.body = err.response.data;
				} else {
					response.err = err;
				}
				response.isPromiseRejected = true;
			});

		return response
	}
}

module.exports = new apihelper();
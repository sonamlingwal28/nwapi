class filesyshelper {
	/** @type { status } */
	validateStatus = (status) => status > 0;
	axios = require('axios');

	readFile(fileName) {
		try {
			const filesys = require("fs");
			const fileData = filesys.readFileSync(fileName, 'utf8');
			return fileData;
		}
		catch (err) {
			return { msg: `Unable to read file `, error: err };
		}
	}

	writeFile(fileName, data) {
		try {
			const filesys = require("fs");
			filesys.writeFileSync(fileName, data);
		}
		catch (err) {
			return { msg: `Unable to append to file `, error: err };
		}
	}

	appendToFile(fileName, data) {
		try {
			const filesys = require("fs");
			filesys.appendFileSync(fileName, data);
		}
		catch (err) {
			return { msg: `Unable to append to file `, error: err };
		}
	}

	copyFile(srcFile, destFile) {
		try {
			const filesys = require("fs");
			filesys.copyFileSync(srcFile, destFile);
		}
		catch (err) {
			return { msg: `Unable to copy from src to dest`, error: err };
		}
	}

	deleteFile(fileName) {
		try {
			const filesys = require("fs");
			if (filesys.existsSync(fileName)) {
				fs.unlinkSync(fileName);
			}
		}
		catch (err) {
			return { msg: `Unable to delete file`, error: err };
		}
	}

	createDirectory(dir) {
		try {
			const filesys = require("fs");
			if (!filesys.existsSync(dir)) {
				filesys.mkdirSync(dir);
			}
		}
		catch (err) {
			return { msg: `Unable to create directory: " + di`, error: err };
		}
	}

	exists(path) {
		const filesys = require("fs");
		return filesys.existsSync(path);
	}

	convert(str) {
		var date = new Date(str),
			mnth = ("0" + (date.getMonth() + 1)).slice(-2),
			day = ("0" + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join("-");
	}

	converttime(str) {
		var date = new Date(str),
			mnth = ("0" + (date.getMonth() + 1)).slice(-2),
			day = ("0" + date.getDate()).slice(-2),
			hh = date.getHours() - 4,
			mm = date.getMinutes() - 1,
			ss = date.getSeconds() - 5,
			date = [date.getFullYear(), mnth, day].join("-"),
			time = [hh, mm, ss].join(":"),
			datetime = date + "T" + time + "Z";
		return datetime;
	}

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

	generateRandNum = () => {
		var num = Math.floor(100000000 + Math.random() * 999999999);
		return num.toString();
	};

	generateRandGuid = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};

	getdate = () => {
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let today = year + "-" + month + "-" + date;
		// prints date in YYYY-MM-DD format
		return today;
	};

	getColNo = (key, colHeader) => {
		let keyString = key.toString();
		let colNo;
		if (keyString.includes(colHeader)) {
			colNo = key.indexOf(colHeader);
			// if (debug == true) {
			// 	console.log(`Column No. ${colNo}`)
			// }
		} else {
			colNo = key.length;
			// if (debug == true) {
			// 	console.log(`Column No. ${colNo}`)
			// }
		}
		return colNo;
	}

	getEmails = () => {
		try {
			var imapConfig = {
				user: 'Sreekanth.Chandrasekaran@gmail.com',
				password: 'h@PP1NESS',
				host: 'imap.gmail.com',
				port: 993,
				tls: true,
			};
			var imap = new imap(imapConfig);
			imap.once('ready', () => {
				imap.openBox('INBOX', false, () => {
					imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
						const f = imap.fetch(results, { bodies: '' });
						f.on('message', msg => {
							msg.on('body', stream => {
								simpleParser.simpleParser(stream, async (err, parsed) => {
									// const {from, subject, textAsHtml, text} = parsed;
									console.log(parsed);
									/* Make API call to save the data
									   Save the retrieved data into a database.
									   E.t.c
									*/
								});
							});
							msg.once('attributes', attrs => {
								const { uid } = attrs;
								imap.addFlags(uid, ['\\Seen'], () => {
									// Mark the email as read after reading it
									console.log('Marked as read!');
								});
							});
						});
						f.once('error', ex => {
							return Promise.reject(ex);
						});
						f.once('end', () => {
							console.log('Done fetching all messages!');
							imap.end();
						});
					});
				});
			});

			imap.once('error', err => {
				console.log(err);
			});

			imap.once('end', () => {
				console.log('Connection ended');
			});

			imap.connect();
		} catch (ex) {
			console.log('an error occurred --> ' + ex);
		}
	};
}

module.exports = new filesyshelper();
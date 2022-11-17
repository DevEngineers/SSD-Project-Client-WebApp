const API_BASE_URI = 'http://localhost:8443/message';
import CryptoService from "./CryptoService";
import FileSaver from 'file-saver';

class MessageServices {
	/**
	 *  This service function is to store worker messages
	 */
	async storeMessageWorker(message) {
		const bearer = 'bearer ' + localStorage.getItem('token');
		return await fetch(API_BASE_URI + '/worker', {
			method: 'POST',
			headers: {
				'content-Type': 'application/json',
				Authorization: bearer,
			},
			body: JSON.stringify(message),
		})
			.then(response => {
				return response;
			})
			.catch(reason => {
				return reason;
			});
	}

	/**
	 *  This service function is to store Manager messages
	 */
	async storeMessageManager(message) {
		const bearer = 'bearer ' + localStorage.getItem('token');
		return await fetch(API_BASE_URI + '/manager', {
			method: 'POST',
			headers: {
				'content-Type': 'application/json',
				Authorization: bearer,
			},
			body: JSON.stringify(message),
		})
			.then(response => {
				return response;
			})
			.catch(reason => {
				return reason;
			});
	}

	/**
	 *  This service function is to store files
	 */
	async FileUploads(file) {
		
		
		var cipherText;
		var reader = new FileReader();
			reader.readAsText(file);
			reader.onload = async () => {
				await getCipherText(reader.result);
			}
			
		let testValue;
		const getCipherText = async (value) => {
			testValue = value;
		}

		cipherText = CryptoService.encryptData(getCipherText());
		let blobFile = new File ([cipherText], file.name, {type:"text/plain;charset=utf-8"});
		//FileSaver.saveAs(blobFile);
		const bearer = 'bearer ' + localStorage.getItem('token');
		const form = new FormData();
		form.append('name', file.name);
		form.append('file', blobFile);
		return await fetch(API_BASE_URI + '/manager/file', {
			method: 'POST',
			headers: {
				Authorization: bearer,
			},
			body: form,
		})
			.then(response => {
				return response.json();
			})
			.catch(reason => {
				return reason;
			});
	}

	/**
	 *  This service function is to Get All messages
	 */
	async getMessages() {
		const bearer = 'bearer ' + localStorage.getItem('token');
		return await fetch(API_BASE_URI, {
			method: 'GET',
			headers: {
				Authorization: bearer,
			},
		})
			.then(response => {
				return response.json();
			})
			.catch(reason => {
				return reason;
			});
	}

	/**
	 *  This service function is to get the messages by id
	 */
	async getMessageByID(id) {
		const bearer = 'bearer ' + localStorage.getItem('token');
		return await fetch(API_BASE_URI + '/' + id, {
			method: 'GET',
			headers: {
				Authorization: bearer,
			},
		})
			.then(response => {
				return response.json();
			})
			.catch(reason => {
				return reason;
			});
	}

	/**
	 *  This service function is to Add to continues messages
	 */
	async updateMessages(id, message) {
		const bearer = 'bearer ' + localStorage.getItem('token');
		return await fetch(API_BASE_URI + '/' + id, {
			method: 'PUT',
			headers: {
				'content-Type': 'application/json',
				Authorization: bearer,
			},
			body: JSON.stringify(message),
		})
			.then(response => {
				return response;
			})
			.catch(reason => {
				return reason;
			});
	}

	/**
	 *  This service function is to Remove stored messages
	 */
	async removeMessage(id) {
		const bearer = 'bearer ' + localStorage.getItem('token');
		return await fetch(API_BASE_URI + '/' + id, {
			headers: {
				Authorization: bearer,
			},
			method: 'DELETE',
		})
			.then(response => {
				return response;
			})
			.catch(reason => {
				return reason;
			});
	}
}

export default new MessageServices();

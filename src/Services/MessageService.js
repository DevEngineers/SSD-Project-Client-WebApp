/**
 * @author : M.N.M Akeel
 * Registration Number : IT19153414
 */

const API_BASE_URI = 'http://localhost:5000/message/';

class MessageServices {
	/**
	 *  This service function is to store messages
	 */
	async storeMessage(message) {
		const bearer = 'bearer ' + localStorage.getItem('token');
		return await fetch(API_BASE_URI, {
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
		const bearer = 'bearer ' + localStorage.getItem('token');
		let form = new FormData();
		form.append('name', file.name);
		form.append('file', file);

		return await fetch(API_BASE_URI + '/file', {
			method: 'POST',
			headers: {
				'content-Type': 'application/json',
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
			body: JSON.stringify(researchPaper),
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

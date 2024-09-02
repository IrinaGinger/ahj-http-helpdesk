/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */

import createRequest from './api/createRequest';

export default class TicketService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  list(callback) {
    const params = new URLSearchParams({
      'method': 'allTickets',
    });

    const encodedURL = `${this.baseURL}?${params.toString()}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    (async () => {
      const result = await createRequest(encodedURL, requestOptions);

      result.forEach(item => {
        callback(item);
      })
    })();
  }

  get(id, callback) {
    if (!id) {
      return;
    }

    const params = new URLSearchParams({
      'method': 'ticketById',
      'id': id,
    });

    const encodedURL = `${this.baseURL}?${params.toString()}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    (async () => {
      const result = await createRequest(encodedURL, requestOptions);
      callback(result);
    })();  
  }

  create(data, callback) {
    if (!data.name) {
      return;
    }

    const params = new URLSearchParams({
      'method': 'createTicket',
    });

    const encodedURL = `${this.baseURL}?${params.toString()}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };
    
    (async () => {
      const result = await createRequest(encodedURL, requestOptions);
      callback(result);
    })();

  }

  update(id, data, callback) {
    if (!id) {
      return;
    }

    const params = new URLSearchParams({
      'method': 'updateById',
      'id': id,
    });  

    const encodedURL = `${this.baseURL}?${params.toString()}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };
    
    (async () => {
      const result = await createRequest(encodedURL, requestOptions);
      callback(result);
    })();
  }

  delete(id, callback) {
    if (!id) {
      return;
    }

    const params = new URLSearchParams({
      'method': 'deleteById',
      'id': id,
    });    

    const encodedURL = `${this.baseURL}?${params.toString()}`;
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    
    (async () => {
      const result = await createRequest(encodedURL, requestOptions);
      
      if (result === 204) {
        callback(id);        
      }
    })();
  }
}

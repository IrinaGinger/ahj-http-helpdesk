/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */

import {renderElem} from './utils';

import edit from '../img/edit.png'; 
import done from '../img/done.png'; 
import del from '../img/delete.png'; 

export default class TicketView {
  constructor(container) {
    this.container = container;
  }

  ticketDraw(ticket) {
    let date;
    const dateOptions = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    }
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };

    const ticketElem = renderElem(this.container, 'div', 'ticket');
    ticketElem.id = ticket.id;

    const ticketShort = renderElem(ticketElem, 'div', 'ticket-short');
    
    const doneBtn = renderElem(ticketShort, 'div', 'circle', 'done-btn');
    const doneBtnImg = renderElem(doneBtn, 'img', 'img-btn');
    if (!ticket.status) {
      doneBtnImg.classList.add('invisible');
    }
    doneBtnImg.src = done;

    const ticketName = renderElem(ticketShort, 'div', 'ticket-name');
    ticketName.textContent = ticket.name;

    const ticketDate = renderElem(ticketShort, 'div', 'ticket-date');
    date = new Date(ticket.created);
    ticketDate.textContent = date.toLocaleString("ru", dateOptions) + " " + date.toLocaleString("ru", timeOptions);

    const editBtn = renderElem(ticketShort, 'div', 'circle', 'edit-btn');
    const editBtnImg = renderElem(editBtn, 'img', 'img-btn');
    editBtnImg.src = edit;

    const deleteBtn = renderElem(ticketShort, 'div', 'circle', 'delete-btn');
    const deleteBtnImg = renderElem(deleteBtn, 'img', 'img-btn');
    deleteBtnImg.src = del;
  }

  ticketDelete(id) {
    const ticketForDelete = document.getElementById(id);
    ticketForDelete.remove();    
  }

  ticketUpdate(data) {
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    data.forEach(item => {
      this.ticketDraw(item);
    })    
  }

  ticketDescription(ticket) {
    const currentTicket = document.getElementById(ticket.id);
    const description = renderElem(currentTicket, 'div', 'ticket-description');
    description.textContent = ticket.description;      
  }
}

import TicketService from "./TicketService";
import { renderElem, showForm, hideForm, showTicketData } from './utils';
import TicketView from './TicketView';
import TicketForm from './TicketForm';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }

    this.container = container;

    this.ticketService = new TicketService('http://localhost:7070');

    this.addTicket = this.addTicket.bind(this);
    this.editTicket = this.editTicket.bind(this);
    this.deleteTicket = this.deleteTicket.bind(this);
    this.showDescription = this.showDescription.bind(this);

    this.targetTicket = null;
  }

  init() {
    const ticketList = this.drawUI();
    this.ticketView = new TicketView(ticketList);

    const ticketDrawFunc = this.ticketView.ticketDraw.bind(this.ticketView);
    this.ticketService.list(ticketDrawFunc);
    
    ticketList.addEventListener('click', (event) => {
      event.preventDefault();

      const circleTarget = event.target.closest('.circle');
      this.targetTicket = event.target.closest('.ticket');

      if (!circleTarget) {
        this.showDescription(this.targetTicket);
        return;
      }

      if (circleTarget.classList.contains('edit-btn')) {
        showForm('edit');
        this.ticketService.get(this.targetTicket.id, showTicketData);
        return;
      } else if (circleTarget.classList.contains('delete-btn')) {
        showForm('delete');
        return;
      } else if (circleTarget.classList.contains('done-btn')) {
        const imgBtn = circleTarget.querySelector('.img-btn');
        let status;
        if (imgBtn.classList.contains('invisible')) {
          imgBtn.classList.remove('invisible');
          status = {status: true};
        } else {
          imgBtn.classList.add('invisible');
          status = {status: false};
        }
        const ticketUpdateFunc = this.ticketView.ticketUpdate.bind(this.ticketView);
        this.ticketService.update(this.targetTicket.id, status, ticketUpdateFunc);
        return;
      } else {
        return;
      }
    });
  }

  drawUI() {
    const desk = renderElem(this.container, 'div', 'desk');
    const deskHeader = renderElem(desk, 'div', 'desk-header');
    renderElem(deskHeader, 'div', 'desk-header-menu-btn');    
    const deskContent = renderElem(desk, 'div', 'desk-content');

    const addBtn = renderElem(deskContent, 'button', 'btn', 'add-btn');
    addBtn.textContent = 'Добавить тикет';
    addBtn.addEventListener('click', () => {
      showForm('add');
    });

    const addForm = new TicketForm(deskContent);
    const addFormModal = addForm.render('add').querySelector('.modal-form');
    addFormModal.addEventListener('submit', this.addTicket);

    const editForm = new TicketForm(deskContent);
    const editFormModal = editForm.render('edit').querySelector('.modal-form');
    editFormModal.addEventListener('submit', this.editTicket);

    const deleteForm = new TicketForm(deskContent);
    const deleteFormModal = deleteForm.render('delete').querySelector('.modal-form');
    deleteFormModal.addEventListener('submit', this.deleteTicket);

    return renderElem(deskContent, 'div', 'ticket-list');
  }

  showDescription(elem) {
    let description;
    if (elem.classList.contains('withDescription')) {
      description = elem.querySelector('.ticket-description');
      elem.classList.remove('withDescription');
      elem.removeChild(description);
    } else {      
      const ticketDescriptionFunc = this.ticketView.ticketDescription.bind(this.ticketView);
      this.ticketService.get(elem.id, ticketDescriptionFunc);
      elem.classList.add('withDescription');
    }
  }

  addTicket(e) {
    e.preventDefault();
    let addData = {};

    Array.from(e.target.elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const { name, value } = element;
      addData[name] = value;
    });

    const ticketDrawFunc = this.ticketView.ticketDraw.bind(this.ticketView);
    this.ticketService.create(addData, ticketDrawFunc);
    hideForm('add');
  }

  editTicket(e) {
    e.preventDefault();
    const id = this.targetTicket.id;
    let data = {};

    Array.from(e.target.elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const { name, value } = element;
      data[name] = value;
    });

    const ticketUpdateFunc = this.ticketView.ticketUpdate.bind(this.ticketView);
    this.ticketService.update(id, data, ticketUpdateFunc);
    hideForm('edit');
  }

  deleteTicket(e) {
    e.preventDefault();
    const id = this.targetTicket.id;
    const ticketDeleteFunc = this.ticketView.ticketDelete.bind(this.ticketView);
    this.ticketService.delete(id, ticketDeleteFunc);
    hideForm('delete');
  }

}

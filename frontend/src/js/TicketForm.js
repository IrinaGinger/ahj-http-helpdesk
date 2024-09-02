/**
 *  Класс для создания формы создания нового тикета
 * */

import { renderElem, hideForm} from './utils';

export default class TicketForm {
  constructor(container) {
    this.container = container;
  }

  render(type) {
    const modal = renderElem(this.container, 'div', 'modal', `modal-${type}`);
    const form = renderElem(modal, 'form', 'modal-form');
    const formHeader = renderElem(form, 'div', 'form-header');
    switch (type) {
      case 'add':
        formHeader.textContent = 'Добавить тикет';
        break;
      case 'edit':
        formHeader.textContent = 'Изменить тикет';
        break;
      case 'delete':
        formHeader.textContent = 'Удалить тикет';
        break;
    }

    if (type === 'add' || type === 'edit') {
      const lableName = renderElem(form, 'label', 'form-text');
      lableName.textContent = 'Краткое описание';
      const inputName = renderElem(lableName, 'input', 'input', 'input-name');
      inputName.name = 'name';

      const lableDescription = renderElem(form, 'label', 'form-text');
      lableDescription.textContent = 'Подробное описание';
      const inputDescription = renderElem(lableDescription, 'textarea', 'input', 'input-description');
      inputDescription.name = 'description';

    } else if (type === 'delete') {
      const confirmation = renderElem(form, 'div', 'form-text');
      confirmation.textContent = 'Вы уверены, что хотите удалить тикет?  Это действие необратимо.';
    } 

    const buttonsSection = renderElem(form, 'div', 'buttons-section');
        
    const cancelButton = renderElem(buttonsSection, 'button', 'cancel-button', 'btn');
    cancelButton.type = 'reset';
    cancelButton.textContent = 'Отмена';
    cancelButton.addEventListener('click', (event) => {
      event.preventDefault();
      hideForm(type);
    })

    const okButton = renderElem(buttonsSection, 'button', 'ok-button', 'btn');
    okButton.type = 'submit';
    okButton.textContent = 'OK';
    
    return modal;
  }


}

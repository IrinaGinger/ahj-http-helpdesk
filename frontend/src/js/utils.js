export function renderElem(parent, type, ...className) {
  const elem = document.createElement(type);
  className.forEach(item => {
    elem.classList.add(item);
  });
    
  parent.appendChild(elem);
  return elem;
}

export function showForm(type) {
  const modalForm = document.querySelector(`.modal-${type}`);
  modalForm.classList.add('modal-flex');  
}

export function hideForm(type) {
  const modalForm = document.querySelector(`.modal-${type}`);
  modalForm.classList.remove('modal-flex');  
}

export function showTicketData(ticket) {
  const editForm = document.querySelector(`.modal-edit`);
  const inputName = editForm.querySelector(`.input-name`);
  inputName.value = ticket.name;
  const inputDescription = editForm.querySelector(`.input-description`);
  inputDescription.value = ticket.description;
}
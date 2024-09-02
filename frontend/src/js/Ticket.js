export default class Ticket {
  constructor({ id, name, description, status = false, created = null }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }
}

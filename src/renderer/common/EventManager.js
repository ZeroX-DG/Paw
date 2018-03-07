const EventManager = {
  events: new Map(),

  on(event, callback) {
    this.events.has(event) || this.events.set(event, []);

    this.events.get(event).push(callback);
    return this;
  },

  off(event) {
    this.events.delete(event);
  },

  emit(event, data) {

    if (!this.events.has(event)) {
      console.log("Event not found !");
      return;
    }

    let callbacks = this.events.get(event);
    for(let i = 0; i < callbacks.length; i++) {
      callbacks[i](data);
    }

  }
}

export default EventManager;
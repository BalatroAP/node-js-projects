export default class User {
  #id;
  #name;
  #email;
  #age;
  constructor(id, name, email, age) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#age = age;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get age() {
    return this.#age;
  }

  get allMembers() {
    return [this.#id, this.#name, this.#email, this.#age];
  }

  displayAllInfo() {
    for (let i = 0; i < this.allMembers.length; i++) {
      console.log(`[DEBUG] ${this.allMembers[i]}`);
    }
  }
}

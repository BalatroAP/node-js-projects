export default class UserAccount {
  #uid;
  #email;
  #password;
  #amount;
  constructor(email, password, amount = 0, uid = 0) {
    this.#email = email;
    this.#password = password;
    this.#amount = amount;
    this.#uid = uid;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get amount() {
    return this.#amount;
  }

  get jsonClassMembers() {
    return {
      email: this.#email,
      password: this.#password,
      amount: this.#amount,
    };
  }

  displayUserAccountData() {
    console.log(
      `UID: ${this.#uid}\nEmail: ${this.#email}\nPassword: ${this.#password}\nAmount: ${this.#amount}\n`,
    );
  }
}

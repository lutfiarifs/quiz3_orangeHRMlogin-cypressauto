<<<<<<< HEAD
class LoginPage {
  // Locators
  inputUsername() { return cy.get('input[name="username"]'); }
  inputPassword() { return cy.get('input[name="password"]'); }
  loginButton() { return cy.get('button[type="submit"]'); }
  errorMessage() { return cy.get('.oxd-alert-content-text'); }
  requiredMessage() { return cy.get('.oxd-input-group__message'); }

  // Actions
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  login(username, password) {
    if (username) this.inputUsername().type(username);
    if (password) this.inputPassword().type(password);
    this.loginButton().click();
  }
}

=======
class LoginPage {
  // Locators
  inputUsername() { return cy.get('input[name="username"]'); }
  inputPassword() { return cy.get('input[name="password"]'); }
  loginButton() { return cy.get('button[type="submit"]'); }
  errorMessage() { return cy.get('.oxd-alert-content-text'); }
  requiredMessage() { return cy.get('.oxd-input-group__message'); }

  // Actions
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  login(username, password) {
    if (username) this.inputUsername().type(username);
    if (password) this.inputPassword().type(password);
    this.loginButton().click();
  }
}

>>>>>>> 80bd8f9f486386ae37b077042dc506c28f90a284
export default new LoginPage();
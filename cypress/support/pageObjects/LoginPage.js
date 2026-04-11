class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');

    // ✅ wait element biar tidak flaky
    cy.get('input[placeholder="Username"]', { timeout: 10000 })
      .should('be.visible');
  }

  inputUsername(username) {
    cy.get('input[placeholder="Username"]').clear().type(username);
  }

  inputPassword(password) {
    cy.get('input[placeholder="Password"]').clear().type(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  // ✅ Helper login (WAJIB untuk dashboard test)
  login(username, password) {
    if (username) this.inputUsername(username);
    if (password) this.inputPassword(password);
    this.clickLogin();
  }

  // ✅ Success
  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard');
  }

  // ❌ Error credentials
  verifyInvalidCredentials() {
    cy.contains('Invalid credentials', { timeout: 10000 })
      .should('be.visible');
  }

  // ❌ Required field
  verifyRequiredField() {
    cy.contains('Required').should('be.visible');
  }

}

export default new LoginPage();
<<<<<<< HEAD
import LoginPage from '../support/pages/LoginPage';

describe('OrangeHRM Login Feature with POM', () => {
  
  beforeEach(() => {
    LoginPage.visit();
    // Mengambil data dari fixtures
    cy.fixture('loginData').as('data');
  });

  it('TC1 - Login dengan Username & Password valid', function() {
    LoginPage.login(this.data.validUser.username, this.data.validUser.password);
    cy.url().should('include', '/dashboard');
  });

  it('TC2 - Login dengan Username salah', function() {
    LoginPage.login(this.data.invalidUser.username, this.data.validUser.password);
    LoginPage.errorMessage().should('have.text', 'Invalid credentials');
  });

  it('TC3 - Login dengan Password salah', function() {
    LoginPage.login(this.data.validUser.username, this.data.invalidUser.password);
    LoginPage.errorMessage().should('have.text', 'Invalid credentials');
  });

  it('TC4 - Login tanpa mengisi Username dan Password', function() {
    LoginPage.loginButton().click();
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

  it('TC5 - Login dengan Username kosong', function() {
    LoginPage.login(null, this.data.validUser.password);
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

  it('TC6 - Login dengan Password kosong', function() {
    LoginPage.login(this.data.validUser.username, null);
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

=======
import LoginPage from '../support/pages/LoginPage';

describe('OrangeHRM Login Feature with POM', () => {
  
  beforeEach(() => {
    LoginPage.visit();
    // Mengambil data dari fixtures
    cy.fixture('loginData').as('data');
  });

  it('TC1 - Login dengan Username & Password valid', function() {
    LoginPage.login(this.data.validUser.username, this.data.validUser.password);
    cy.url().should('include', '/dashboard');
  });

  it('TC2 - Login dengan Username salah', function() {
    LoginPage.login(this.data.invalidUser.username, this.data.validUser.password);
    LoginPage.errorMessage().should('have.text', 'Invalid credentials');
  });

  it('TC3 - Login dengan Password salah', function() {
    LoginPage.login(this.data.validUser.username, this.data.invalidUser.password);
    LoginPage.errorMessage().should('have.text', 'Invalid credentials');
  });

  it('TC4 - Login tanpa mengisi Username dan Password', function() {
    LoginPage.loginButton().click();
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

  it('TC5 - Login dengan Username kosong', function() {
    LoginPage.login(null, this.data.validUser.password);
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

  it('TC6 - Login dengan Password kosong', function() {
    LoginPage.login(this.data.validUser.username, null);
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

>>>>>>> 80bd8f9f486386ae37b077042dc506c28f90a284
});
import LoginPage from '../../support/pageObjects/LoginPage';

describe('Pengujian Automation fitur Login pada web OrangeHRM (POM + Intercept)', () => {

  beforeEach(() => {
    LoginPage.visit();
  });

  // 1. Tes Login dengan Username & Password valid
  it('Login dengan Username & Password valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValid');

    LoginPage.inputUsername('Admin');
    LoginPage.inputPassword('admin123');
    LoginPage.clickLogin();

    cy.wait('@loginValid')
      .its('response.statusCode')
      .should('eq', 302);

    LoginPage.verifyLoginSuccess();
  });

  // 2. Tes Login dengan Username & Password salah
  it('Login dengan Username & Password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidAll');

    LoginPage.inputUsername('testadmin');
    LoginPage.inputPassword('admin321');
    LoginPage.clickLogin();

    cy.wait('@loginInvalidAll');
    LoginPage.verifyInvalidCredentials();
  });

  // 3. Tes Login dengan Username salah dan Password Benar
  it('Login dengan Username "testadmin" dan Password benar', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidUser');

    LoginPage.inputUsername('testadmin');
    LoginPage.inputPassword('admin123');
    LoginPage.clickLogin();

    cy.wait('@loginInvalidUser');
    LoginPage.verifyInvalidCredentials();
  });

  // 4. Tes Login dengan Username Benar dan Password salah
  it('Login dengan Username benar dan Password "admin321"', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidPass');

    LoginPage.inputUsername('Admin');
    LoginPage.inputPassword('admin321');
    LoginPage.clickLogin();

    cy.wait('@loginInvalidPass');
    LoginPage.verifyInvalidCredentials();
  });

  // 5. Tes Login dengan Username & Password kosong
  it('Login tanpa input Username dan Password', () => {
    cy.intercept('POST', '**/auth/validate').as('emptyLogin');

    LoginPage.clickLogin();

    // Pastikan API tidak terpanggil
    cy.get('@emptyLogin.all').should('have.length', 0);

    cy.contains('Required').should('be.visible');
  });

  // 6. Tes Login dengan Username kosong
  it('Login dengan Username kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('noUsername');

    LoginPage.inputPassword('admin123');
    LoginPage.clickLogin();

    cy.get('@noUsername.all').should('have.length', 0);

    cy.contains('Required').should('be.visible');
  });

  // 7. Tes Login dengan Password kosong
  it('Login dengan Password kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('noPassword');

    LoginPage.inputUsername('Admin');
    LoginPage.clickLogin();

    cy.get('@noPassword.all').should('have.length', 0);

    cy.contains('Required').should('be.visible');
  });

});
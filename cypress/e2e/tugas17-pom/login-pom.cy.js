import LoginPage from '../../support/pages/LoginPage';

describe('OrangeHRM Login Feature with POM', () => {
  
  beforeEach(() => {
    LoginPage.visit();
    // Mengambil data dari fixtures
    cy.fixture('loginData').as('data');
  });

  // Test Case 1 - Tes Login Username dan Password valid
  it('Login dengan Username & Password valid', function() {
    LoginPage.login(this.data.validUser.username, this.data.validUser.password);
    cy.url().should('include', '/dashboard');
  });

  // Test Case 2 - Tes Login dengan Ssername "test"
  it('Login dengan Username "test"', function() {
    
    // Mengisi kolom Username dengan "test" yang berarti username salah dari properti invalidUsername
    LoginPage.login(this.data.invalidUsername.username, this.data.invalidUsername.password);
    LoginPage.errorMessage().should('have.text', 'Invalid credentials');
  });

  // Test Case 3 - Tes Login dengan Password "admin321"
  it('Login dengan Password "admin321"', function() {

    // Mengisi kolom Password dengan "admin321" yang berarti username salah dari properti invalidPassword
    LoginPage.login(this.data.invalidPassword.username, this.data.invalidPassword.password);
    LoginPage.errorMessage().should('have.text', 'Invalid credentials');
  });

  // Test Case 4 - Tes Login tanpa mengisi Username 
  it('Login dengan Username kosong', function() {
    LoginPage.login(null, this.data.validUser.password);
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

  // Test Case 5 - Tes Login tanpa mengisi Password 
  it('Login dengan Password kosong', function() {
    LoginPage.login(this.data.validUser.username, null);
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

  // Test Case 6 - Tes Login tanpa mengisi Username dan Password
  it('Login tanpa mengisi Username dan Password', function() {
    LoginPage.loginButton().click();
    LoginPage.requiredMessage().should('be.visible').and('contain', 'Required');
  });

});
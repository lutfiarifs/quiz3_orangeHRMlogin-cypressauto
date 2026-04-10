<<<<<<< HEAD
describe('OrangeHRM Login Feature with Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  // Test Case 1 - Tes Login Username dan Password valid
  it('Login dengan Username & Password valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValid');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginValid').its('response.statusCode').should('eq', 302);
    cy.url().should('include', '/dashboard');
  });

  // Test Case 2 - Tes Login Username & Password salah
  it('Login dengan Username & Password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidAll');

    cy.get('input[name="username"]').type('testadmin');
    cy.get('input[name="password"]').type('admin321');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidAll');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 3 - Tes Login dengan Username salah
  it('Login dengan Username "testadmin"', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidUser');

    cy.get('input[name="username"]').type('testadmin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidUser');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 4 - Tes Login dengan Password salah
  it('Login dengan Password "admin321"', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidPass');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin321');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidPass');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 5 - Tes login dengan Field Username dan Password kosong
  it('Login tanpa input Username dan Password', () => {
    cy.intercept('GET', '**/auth/login').as('emptyLogin');

    cy.get('button[type="submit"]').click();
    
  //Memastikan Request ini tidak pernah ada/terjadi
    cy.get("@emptyLogin.all").should("have.length", 0);  
    cy.contains('Required').should('be.visible');
  });

  // Test Case 6 - Tes Login dengan Username kosong
  it('Login dengan Username kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('noUsername');

    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

  //Memastikan Request ini tidak pernah ada/terjadi
    cy.get("noUsername.all").should("have.length", 0);
    cy.contains('Required').should('be.visible');
  });

  // Test Case 7 - Tes Login dengan Password kosong
  it('Login dengan Password kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('noPassword');

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

  //Memastikan Request ini tidak pernah ada/terjadi
    cy.get("noPassword.all").should("have.length", 0);
    cy.contains('Required').should('be.visible');
  });
  
=======
describe('OrangeHRM Login Feature with Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  // Test Case 1 - Tes Login Username dan Password valid
  it('Login dengan Username & Password valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValid');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginValid').its('response.statusCode').should('eq', 302);
    cy.url().should('include', '/dashboard');
  });

  // Test Case 2 - Tes Login Username & Password salah
  it('Login dengan Username & Password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidAll');

    cy.get('input[name="username"]').type('testadmin');
    cy.get('input[name="password"]').type('admin321');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidAll');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 3 - Tes Login dengan Username salah
  it('Login dengan Username "testadmin"', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidUser');

    cy.get('input[name="username"]').type('testadmin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidUser');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 4 - Tes Login dengan Password salah
  it('Login dengan Password "admin321"', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidPass');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin321');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidPass');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 5 - Tes login dengan Field Username dan Password kosong
  it('Login tanpa input Username dan Password', () => {
    cy.intercept('GET', '**/auth/login').as('emptyLogin');

    cy.get('button[type="submit"]').click();
    
  //Memastikan Request ini tidak pernah ada/terjadi
    cy.get("@emptyLogin.all").should("have.length", 0);  
    cy.contains('Required').should('be.visible');
  });

  // Test Case 6 - Tes Login dengan Username kosong
  it('Login dengan Username kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('noUsername');

    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

  //Memastikan Request ini tidak pernah ada/terjadi
    cy.get("noUsername.all").should("have.length", 0);
    cy.contains('Required').should('be.visible');
  });

  // Test Case 7 - Tes Login dengan Password kosong
  it('Login dengan Password kosong', () => {
    cy.intercept('POST', '**/auth/validate').as('noPassword');

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

  //Memastikan Request ini tidak pernah ada/terjadi
    cy.get("noPassword.all").should("have.length", 0);
    cy.contains('Required').should('be.visible');
  });
  
>>>>>>> 80bd8f9f486386ae37b077042dc506c28f90a284
});
describe('OrangeHRM Login Feature with Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  // ✅ 1. Login valid
  it('Login dengan Username & Password valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValid');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginValid').its('response.statusCode').should('be.oneOf', [200, 302]);
    cy.url().should('include', '/dashboard');
  });

  // ✅ 2. Username & Password salah
  it('Login dengan Username & Password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidAll');

    cy.get('input[name="username"]').type('salahUser');
    cy.get('input[name="password"]').type('salahPass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidAll');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // ✅ 3. Username salah
  it('Login dengan Username salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidUser');

    cy.get('input[name="username"]').type('test');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidUser');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // ✅ 4. Password salah
  it('Login dengan Password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginInvalidPass');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin321');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginInvalidPass');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // ✅ 5. Semua field kosong (tidak ada API call)
  it('Login tanpa Username & Password', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('emptyField');

    cy.get('button[type="submit"]').click();

    cy.wait('@emptyField');
    cy.contains('Required').should('be.visible');
  });

  // ✅ 6. Username kosong (tidak ada API login)
  it('Login dengan Username kosong', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('noUsername');

    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@noUsername');
    cy.contains('Required').should('be.visible');
  });

  // ✅ 7. Password kosong (tidak ada API login)
  it('Login dengan Password kosong', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('noPassword');

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.wait('@noPassword');
    cy.contains('Required').should('be.visible');
  });

});
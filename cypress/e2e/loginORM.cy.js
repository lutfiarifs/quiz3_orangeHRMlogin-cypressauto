describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  // Test Case 1 - Login dengan username valid
  it('Login dengan Username & Password valid', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
  });

  // Test Case 2 - Tes dengan username salah
  it('Login dengan Username "Test"', () => {
    cy.get('input[name="username"]').type('test');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 3 - Tes dengan password salah
  it('Login dengan password "admin321"', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin321');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 4 - Mengosongkan semua field
  it('Login tanpa mengisi Username dan Password', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  // Test Case 5 - Tes Login dengan username kosong
  it('Login dengan Username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  // Test Case 6 - Tes Login dengan password kosong
  it('Login dengan Password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

});
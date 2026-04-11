import LoginPage from '../../support/pageObjects/LoginPage';
import DashboardPage from '../../support/pageObjects/DashboardPage';

describe('Pengujian Automation Fitur Menu Directory di menu Dashboard pada web OrangeHRM (POM + Intercept)', () => {

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login('Admin', 'admin123');
  });

  //Test Case 1 - Mengakses halaman Directory
  it('Menampilkan halaman Directory', () => {
    cy.intercept('GET', '**/directory/**').as('openDirectory');

    DashboardPage.clickDirectoryMenu();
    cy.wait('@openDirectory');

    DashboardPage.verifyDirectoryPage();
  });

  //Test Case 2 - Pencarian berdasarkan nama pegawai 
  it('Mencari Pegawai berdasarkan nama "Rebecca"', () => {
    cy.intercept('GET', '**/api/v2/directory/employees*').as('searchByName');

    DashboardPage.clickDirectoryMenu();

    DashboardPage.inputEmployeeName('Rebecca');

    DashboardPage.clickSearch();

    cy.wait('@searchByName')
      .its('response.statusCode')
      .should('eq', 200);

    DashboardPage.verifySearchResult();
  });

  //Test Case 3 - Pencarian berdasarkan menu Dropdown Job Title 
  it('Mencari Pegawai berdasarkan menu Dropdown Job Title "HR Manager"', () => {
    cy.intercept('GET', '**/api/v2/directory/employees*').as('searchByJob');

    DashboardPage.clickDirectoryMenu();

    DashboardPage.selectJobTitle('HR Manager');

    DashboardPage.clickSearch();

    cy.wait('@searchByJob')
      .its('response.statusCode')
      .should('eq', 200);

    DashboardPage.verifySearchResult();
  });

});
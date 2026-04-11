class DashboardPage {

  verifyDashboard() {
    cy.contains('Dashboard').should('be.visible');
  }

  clickDirectoryMenu() {
    cy.contains('Directory').click();
  }

  verifyDirectoryPage() {
    cy.url().should('include', '/directory');
  }

  //Input Nama Pegawai 
  inputEmployeeName(name) {
    cy.get('input[placeholder="Type for hints..."]')
      .clear()
      .type(name);

    cy.contains('.oxd-autocomplete-option', name, { timeout: 10000 })
      .click();
  }

  //Pemilihan berdasarkan menu Dropdown Job Title
  selectJobTitle(job) {
    cy.contains('label', 'Job Title')
      .parents('.oxd-input-group')
      .find('.oxd-select-text')
      .click();

    cy.contains('.oxd-select-dropdown div', job, { timeout: 10000 })
      .click();
  }

  //Melakukan Klik Search
  clickSearch() {
    cy.contains('button', 'Search').click();
  }

  //Validasi hasil 
  verifySearchResult() {
    cy.get('body', { timeout: 10000 })
      .should('satisfy', (body) => {
        return body.text().includes('Records Found') || body.text().includes('No Records Found');
      });
  }

}

export default new DashboardPage();
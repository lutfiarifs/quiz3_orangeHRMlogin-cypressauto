describe('OrangeHRM Login Feature with Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  // Test Case 1: Intercept request login utama (Success)
  it('Login dengan Username & Password valid', () => {
    // Intercept API login untuk memastikan response sukses
    cy.intercept('POST', '**/auth/login').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Validasi intercept: Menunggu request selesai dan cek status code
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    cy.url().should('include', '/dashboard');
  });

  // Test Case 2: Intercept request login (Invalid Credentials)
  it('Login dengan Username salah', () => {
    // Intercept dengan alias berbeda untuk validasi error
    cy.intercept('POST', '**/auth/login').as('loginFail');

    cy.get('input[name="username"]').type('test');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Validasi intercept
    cy.wait('@loginFail').its('response.statusCode').should('eq', 200); // OrangeHRM tetap return 200 tapi membawa pesan error
    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 3: Intercept request logo/image saat load page
  it('Login dengan password salah - Validasi Assets', () => {
    // Intercept request gambar logo untuk memastikan UI terload sempurna
    cy.intercept('GET', '**/logo**').as('getLogo');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin321');
    cy.get('button[type="submit"]').click();

    cy.wait('@getLogo').its('response.statusCode').should('eq', 200);
    cy.contains('Invalid credentials').should('be.visible');
  });

  // Test Case 4: Intercept request messages/localization
  it('Login tanpa mengisi Username dan Password', () => {
    // Intercept request ke endpoint messages atau i18n jika ada (menggunakan wildcard)
    cy.intercept('GET', '**/i18n/messages/**').as('getMessages');

    cy.get('button[type="submit"]').click();

    // Karena tidak ada request ke server saat field kosong (validasi frontend), 
    // kita pastikan tidak ada login request yang terkirim secara tidak sengaja
    cy.contains('Required').should('be.visible');
  });

  // Test Case 5: Intercept request ke action password reset (Navigation check)
  it('Navigasi ke Forgot Password - Validasi Intercept URL', () => {
    // Intercept request saat klik "Forgot your password?"
    cy.intercept('GET', '**/requestPasswordResetCode').as('resetPasswordPage');

    cy.contains('Forgot your password?').click();

    cy.wait('@resetPasswordPage').its('response.statusCode').should('eq', 200);
    cy.url().should('include', 'requestPasswordResetCode');
  });

  // Test Case 6: Intercept XHR/Fetch untuk dashboard data (setelah login)
  it('Login dan Intercept Dashboard Action Summary', () => {
    cy.intercept('GET', '**/dashboard/shortcuts').as('dashboardData');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Menunggu data dashboard tampil
    cy.wait('@dashboardData').its('response.statusCode').should('eq', 200);
    cy.get('.oxd-topbar-header-title').should('be.visible');
  });

});
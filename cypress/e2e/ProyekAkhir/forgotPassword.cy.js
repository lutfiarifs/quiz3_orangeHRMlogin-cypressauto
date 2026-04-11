import LoginPage from '../../support/pageObjects/LoginPage';
import ForgotPasswordPage from '../../support/pageObjects/ForgotPasswordPage';

describe('Pengujian Automation Forgot Password pada web OrangeHRM (POM + Intercept)', () => {

  beforeEach(() => {
    LoginPage.visit();
  });

  it('Reset password berhasil', () => {
    ForgotPasswordPage.clickForgotPassword();

    cy.intercept('POST', '**/auth/requestPasswordResetCode').as('reset');

    ForgotPasswordPage.inputUsername('Admin');
    ForgotPasswordPage.submitReset();

    cy.wait('@reset');
    ForgotPasswordPage.verifySuccess();
  });

});
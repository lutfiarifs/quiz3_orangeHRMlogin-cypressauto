class ForgotPasswordPage {
  clickForgotPassword() {
    cy.contains('Forgot your password?').click();
  }

  inputUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  submitReset() {
    cy.get('button[type="submit"]').click();
  }

  verifySuccess() {
    cy.contains('Reset Password link sent successfully').should('be.visible');
  }
}

export default new ForgotPasswordPage();
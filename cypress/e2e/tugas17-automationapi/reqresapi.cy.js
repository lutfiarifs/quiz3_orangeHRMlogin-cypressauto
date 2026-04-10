describe('API Testing Reqres.in', () => {

  const baseUrl = 'https://reqres.in/api';

  // Request 1 - GET List Users
  it('GET List Users', () => {
    cy.request(`${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  // Request 2 - GET Single User
  it('GET Single User', () => {
    cy.request(`${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(2);
    });
  });

  // Request 3 - GET User Not Found
  it('GET User Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // Request 4 - POST Create User
  it('POST Create User', () => {
    cy.request('POST', `${baseUrl}/users`, {
      name: 'Lutfi',
      job: 'QA Automation Engineer'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('Lutfi');
    });
  });

  // Request 5 - PUT Update User
  it('PUT Update User', () => {
    cy.request('PUT', `${baseUrl}/users/2`, {
      name: 'Lutfi Update',
      job: 'Senior QA'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Lutfi New Update');
    });
  });

  // Request 6 - PATCH Update User
  it('PATCH Update User', () => {
    cy.request('PATCH', `${baseUrl}/users/2`, {
      job: 'Lead QA'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.job).to.eq('QA Lead');
    });
  });

  // Request 7 - DELETE User
  it('DELETE User', () => {
    cy.request('DELETE', `${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

});
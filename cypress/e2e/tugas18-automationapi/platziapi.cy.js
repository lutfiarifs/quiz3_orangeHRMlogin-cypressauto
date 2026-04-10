describe('API Testing FakeAPI Platzi - Refactor Version', () => {

  const baseUrl = 'https://api.escuelajs.co/api/v1';

  let productId; // simpan ID untuk dipakai di test lain

  // 🔹 Mengambil data awal (dynamic ID)
  before(() => {
    cy.request(`${baseUrl}/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);

      productId = response.body[0].id; // mengambil ID pertama
    });
  });

  // Req 1 - GET All Products
  it('GET All Products', () => {
    cy.request(`${baseUrl}/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body[0]).to.have.property('title');
    });
  });

  // Req 2 - GET Single Product (dynamic)
  it('GET Single Product', () => {
    cy.request(`${baseUrl}/products/${productId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(productId);
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('price');
    });
  });

  // Req 3 - GET Product Not Found
  it('GET Product Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/products/999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // Req 4 - POST Create Product
  it('POST Create Product', () => {
    cy.request('POST', `${baseUrl}/products`, {
      title: 'Test Produk Cypress',
      price: 660000,
      description: 'Testing Cypress API',
      categoryId: 1,
      images: ['https://placeimg.com/640/480/any']
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.title).to.eq('Produk Cypress');
      expect(response.body).to.have.property('id');

      // menyimpan ID baru untuk test berikutnya
      productId = response.body.id;
    });
  });

  // Req 5 - PUT Update Product
  it('PUT Update Product', () => {
    cy.request('PUT', `${baseUrl}/products/${productId}`, {
      title: 'Produk Update',
      price: 300000,
      description: 'New Updated',
      categoryId: 1,
      images: ['https://placeimg.com/640/480/any']
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq('Produk Update');
    });
  });

  // Req 6 - PATCH Update Product
  it('PATCH Update Product', () => {
    cy.request('PATCH', `${baseUrl}/products/${productId}`, {
      price: 500000
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.price).to.eq(500000);
    });
  });

  // Req 7 - DELETE Product
  it('DELETE Product', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/products/${productId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 204]).to.include(response.status);
    });
  });

});
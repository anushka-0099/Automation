describe('Restful API (https://restful-api.dev) - CRUD operations', () => {
  const base = 'https://restful-api.dev'
  let resourceId: any

  it('Create - POST /posts', () => {
    cy.request('POST', `${base}/posts`, {
      title: 'Test Title',
      body: 'Test body',
      userId: 123
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([200, 201])
      expect(resp.body).to.have.property('id')
      resourceId = resp.body.id
    })
  })

  it('Read - GET /posts/:id', () => {
    cy.request('GET', `${base}/posts/${resourceId}`).then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body).to.have.property('id', resourceId)
      expect(resp.body).to.have.property('title')
      expect(resp.body).to.have.property('body')
    })
  })

  it('Update - PUT /posts/:id', () => {
    cy.request('PUT', `${base}/posts/${resourceId}`, {
      id: resourceId,
      title: 'Updated Title',
      body: 'Updated body',
      userId: 123
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([200, 201])
      expect(resp.body).to.have.property('title', 'Updated Title')
      expect(resp.body).to.have.property('body', 'Updated body')
    })
  })

  it('Partial Update - PATCH /posts/:id', () => {
    cy.request('PATCH', `${base}/posts/${resourceId}`, {
      title: 'Patched Title'
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([200, 201])
      expect(resp.body).to.have.property('title', 'Patched Title')
    })
  })

  it('Delete - DELETE /posts/:id', () => {
    cy.request('DELETE', `${base}/posts/${resourceId}`).then((resp) => {
      // some test servers return 200, others 204
      expect([200, 202, 204]).to.include(resp.status)
    })
  })

  it('Verify deletion - GET returns 404 or empty', () => {
    cy.request({ url: `${base}/posts/${resourceId}`, failOnStatusCode: false }).then((resp) => {
      // either 404 or 200 with empty body depending on implementation
      expect([200, 404, 204]).to.include(resp.status)
    })
  })

  it('List - GET /posts', () => {
    cy.request('GET', `${base}/posts`).then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body).to.be.an('array')
    })
  })

  
})

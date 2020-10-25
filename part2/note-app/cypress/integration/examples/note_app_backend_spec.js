describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const user = {
      name: "Mr NoNeramte",
      username: "cyborg-redqiue",
      password: "adsfadsf38808nr3r123712"
    }
    cy.request('POST', 'http://localhost:3002/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
  })
})


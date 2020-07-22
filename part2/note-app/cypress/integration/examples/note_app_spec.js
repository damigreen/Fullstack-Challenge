/// <reference types="cypress" />

describe('Note app', function () {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
  })
  
  
  describe('when logged in', function (){
    it('name of the user is shown', function() {  
      cy.contains('log in')
      .click({ force: true })
      cy.get('#username')
      .type('damigreen')
      cy.get('#password')
      .type('dajdoer8erjfj9839ueh')
      cy.contains('login')
      .click()
      cy.contains('damilola faseun logged in')
    })

    describe('and a note is create', function() {
      beforeEach(function() {
        cy.contains('new note')
          .click()  
        cy.get('input')
          .type('a new note created by cypress')
        cy.contains('save')
          .click()
      })
          
      it('it can be made importnt', function() {
        cy.contains('a new note created by cypress')
          .contains('make important')
          .click() 
        cy.contains('a new note created by cypress')
          .contains('make not important')  
      })
    }) 
  })
})
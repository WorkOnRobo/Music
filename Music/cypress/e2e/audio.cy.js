it('play audio', () => {
  cy.visit('/')
  cy.get('.composition-name') // Select the first element with class "composition-name"
    .first() // or .eq(index) to select a specific element
    .click()
  cy.get('#play-btn').click()

  cy.wait(5000)
  cy.get('#player-play-btn').click()
})

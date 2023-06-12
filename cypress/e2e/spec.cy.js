describe('homepage spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls'
    })
    cy.visit('http://localhost:3000')
  });

  it('Should display title and the existing shortened URLs', () => {
    cy.get(':nth-child(1) > .title').contains('.title','Awesome photo')
      .get(':nth-child(1) > .link').contains('.link', 'http://localhost:3001/useshorturl/1')
      .get(':nth-child(2) > .title').contains('.title', 'title')
      .get(':nth-child(2) > .link').contains('.link', 'http://localhost:3001/useshorturl/2')
      .get(':nth-child(3) > .title').contains('.title', 'title')
      .get(':nth-child(3) > .link').contains('.link', 'http://localhost:3001/useshorturl/3')
      .get(':nth-child(4) > .title').contains('.title', 'sda')
      .get(':nth-child(4) > .link').contains('.link', 'http://localhost:3001/useshorturl/4') 
  })

  it('Should display the Form with the proper inputs', () => {
    cy.get('[placeholder="Title..."]').should('have.attr', 'placeholder', 'Title...');
    cy.get('[placeholder="URL to Shorten..."]').should('have.attr', 'placeholder', 'URL to Shorten...');
  });

  it('Should reflect the information the user fill out in the input fields', () => {
    cy.get('[placeholder="URL to Shorten..."]').type('this is a url')
    cy.get('[placeholder="Title..."]').type('this is a title')
  });

  it('should have a form', () => {
    cy.get('[placeholder="URL to Shorten..."]').type('https://images.unsplash.com/photo')
    cy.get('[placeholder="Title..."]').type('this is a title')
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
        statusCode: 201,
        fixture: "url"
      })
    cy.get('.submit-button').click()
     .get('.url').contains('.title','this is a title')
     .get('.url').contains('.link', 'http://localhost:3001/useshorturl/5') 
     .get(':nth-child(5) > p').contains('https://images.unsplash.com/photo')
  });

})
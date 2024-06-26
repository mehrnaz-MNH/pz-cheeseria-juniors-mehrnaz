/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

    // open the cart
    cy.get('[data-cy=open-cart]').click();

    // Click on the Purchase button
    cy.get('[data-cy=purchase-button]').click();

    // Verify that the purchase was successful
    cy.get('[data-cy=purchase-alert]').should('be.visible');

    // Verify that the cart is empty after the purchase
    cy.get('[data-cy=cart-clear]').should('be.visible');

    // close the notification
    cy.visit('/');

    // click on the recent purchase cart
    cy.get('[data-cy=recent-purchase]').click();

    // check if items are there
    cy.get('[data-cy=cart-has-item]').should('have.text', 'You have 2 items in your cart.');

  })

})

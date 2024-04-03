/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

    // Click on the Purchase button
    cy.contains('Purchase').click();

    // Verify that the purchase was successful
    cy.contains('Purchase successful').should('be.visible');

    // Verify that the cart is empty after the purchase
    cy.contains('No items in cart.').should('be.visible');

  })

})

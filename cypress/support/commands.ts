/// <reference types="cypress" />

Cypress.Commands.add("getByData", (selector) => {
  cy.get(`[data-testid=${selector}]`);
});

Cypress.Commands.add("getStripeElement", (fieldName, index) => {
  if (Cypress.config("chromeWebSecurity")) {
    throw new Error(
      "To get stripe element `chromeWebSecurity` must be disabled"
    );
  }
  const selector = `input[data-elements-stable-field-name="${fieldName}"]`;
  cy.get("iframe")
    .eq(index)
    .its("0.contentDocument")
    .should("exist")
    .its("body")
    .should("not.be.undefined")
    .then(cy.wrap)
    .find(selector);
});
declare global {
  namespace Cypress {
    interface Chainable {
      getByData(selector: string): Chainable<Element>;
      getStripeElement(fieldName: string, index: number): Chainable<Element>;
    }
  }
}

export {};

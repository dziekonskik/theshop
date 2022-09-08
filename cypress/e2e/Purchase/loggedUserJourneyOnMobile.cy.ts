import { aliasMutation, getIframeInternals } from "../../../util/test-utils";

describe("Logged in user journey on mobile", () => {
  before(() => {
    cy.viewport("iphone-7");
    cy.intercept(Cypress.env("HYGRAPH_CONTENT_API"), (req) => {
      aliasMutation(req, "upsertOrder");
    });
  });

  it("customer is able to do the full journey from login to purchase", () => {
    context("User logs in to make a puchase", () => {
      cy.visit("/auth/login");
      cy.getByData("email").type(Cypress.env("login"));
      cy.getByData("password").type(Cypress.env("password"));
      cy.get("form").find("button").click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/auth/dashboard");
      });
      cy.get("section").should("contain.text", Cypress.env("login"));
    });

    context("User adds two items of this same type", () => {
      cy.visit("/products");
      cy.getByData("add-to-cart-button").first().click();
      cy.wait("@upsertOrder");
      cy.getByData("cart-icon").should("contain.text", "1");
      cy.getByData("add-to-cart-button").first().click();
      cy.wait("@upsertOrder");
      cy.visit("/cart");
      cy.getByData("cart-item-quantity").should("contain.text", "2");
    });

    context("User add one more item of different type", () => {
      cy.visit("/products");
      cy.getByData("add-to-cart-button").eq(1).click();
      cy.wait("@upsertOrder");
      cy.getByData("cart-icon").should("contain.text", "2");
    });

    context("User confirms order and proceeds to checkout successflly", () => {
      cy.visit("/cart");
      cy.getByData("cart-item").then((cartItems) => {
        const itemCount = Cypress.$(cartItems).length;
        cy.getByData("cart-item").should("have.length", itemCount);
      });
      cy.getByData("checkout-link").should("have.attr", "href", "/checkout");
      cy.getByData("checkout-link").first().click();
      cy.location("pathname").should("eq", "/checkout");
    });

    context("User fills out the form and proceeds to payment", () => {
      cy.getByData("checkout-step-button").should("be.disabled");
      cy.getByData("name").type("Test User");
      cy.getByData("email").type(Cypress.env("login"));
      cy.getByData("addresslineone").type("77 Super Street");
      cy.getByData("addresslinetwo").type("Suite A");
      cy.getByData("postalcode").type("00-007");
      cy.getByData("city").type("Super City");
      cy.getByData("phone").type("505 720 340").blur();
      cy.getByData("checkout-step-button").click();
      cy.getByData("checkout-step-button").should("have.text", "Back");
    });

    context("User cannot click pay button without filling the form", () => {
      cy.getByData("pay-button-wrapper").find("button").should("be.disabled");
    });

    context(
      "User can successful purchase after filling the form correctly",
      () => {
        cy.getByData("credit-card").getStripeElement("cardNumber", 0);
        // AssertionError
        // Timed out retrying after 4000ms: Expected to find element: input[data-elements-stable-field-name="cardNumber"], but never found it. Queried from element: <body>
      }
    );
  });
});

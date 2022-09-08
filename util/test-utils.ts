import { CyHttpMessages } from "cypress/types/net-stubbing";

// Utility to match GraphQL mutation based on the operation name
const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  const { body } = req;
  return (
    body.hasOwnProperty("operationName") && body.operationName === operationName
  );
};

// Alias query if operationName matches
export const aliasQuery = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `${operationName}`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `${operationName}`;
  }
};

// Stripe test helpers

export const getIframeInternals = (iframe: JQuery<HTMLIFrameElement>) => {
  return cy
    .wrap(iframe)
    .its("0.contentDocument")
    .should("exist")
    .its("body")
    .should("not.be.undefined")
    .then(cy.wrap);
};

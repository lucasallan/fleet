describe("Software", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
    cy.setupWithSoftware();
    cy.loginWithCySession();
    cy.viewport(1600, 900);
  });
  after(() => {
    cy.logout();
  });

  describe("Manage software page", () => {
    beforeEach(() => {
      cy.loginWithCySession();
      cy.viewport(1600, 900);
      cy.visit("/software/manage");
    });
    it("displays total software count", () => {
      cy.getAttached(".manage-software-page__count")
        .not(".count-loading")
        .within(() => {
          cy.findByText(/902 software items/i).should("exist");
        });
    });
  });
});

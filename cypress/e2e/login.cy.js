describe("Login",()=>{
    beforeEach("Visit-Orange-Hrm-Demo-website",()=>{
        cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages").as("loginpage");
        cy.visit("/auth/login");
        cy.wait('@loginpage');
    });
    
    it("Correct-credentials-should-login",()=>{
        cy.get('input[name="username"]').click().type("Admin");
        cy.get('input[name="password"]').click().type("admin123");
        cy.get('button[type="submit"]').click();
        cy.url().should('eq','https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });
    
    it("Correct-userName-Incorrect-password-should-throw proper-error-message",()=>{
        cy.get('input[name="username"]').click().type("Admin");
        cy.get('input[name="password"]').click().type("incorrect-credentials");
        cy.get('button[type="submit"]').click();
        cy.contains('Invalid credentials');
    });

    it("Correct-password-Incorrect-username-should-throw proper-error-message",()=>{
        cy.get('input[name="username"]').click().type("incorrect-userName");
        cy.get('input[name="password"]').click().type("admin123");
        cy.get('button[type="submit"]').click();
        cy.contains('Invalid credentials');
    });

});
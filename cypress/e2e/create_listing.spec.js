describe('Create Listing Form', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.window().then((win) => {
            win.location.hash = "#listings";
        });
    });

    it('should open the create listing modal when the button is clicked', () => {
        cy.get('#openCreateListingModal').click();
        cy.get('#createListingModal').should('not.have.class', 'hidden');
    });

    it('should create a new listing and add it to the grid', () => {
        cy.get('#openCreateListingModal').click();
        cy.get('#listingTitle').type('Test Listing');
        cy.get('#listingDescription').type('This is a test listing');
        cy.get('#startingBid').type('100');
        cy.get('#endsAt').type('2024-07-30T10:00');
        cy.get('#imageInput').type('https://via.placeholder.com/150');
        cy.get('#imageAltInput').type('Placeholder Image');
        cy.get('#createListingForm').submit();

        cy.get('#listingsGrid .listing').should('have.length', 1);
        cy.get('#listingsGrid .listing').first().within(() => {
            cy.get('h3').should('contain', 'Test Listing');
            cy.get('p').first().should('contain', 'This is a test listing.');
            cy.get('p').eq(1).should('contain', 'Starting Bid: 100 credits');
            cy.get('p').eq(2).should('contain', 'Ends At: 5/30/2024, 10:00:00 AM'); // Adjust the date format as necessary
            cy.get('img').should('have.attr', 'src', 'https://via.placeholder.com/150');
            cy.get('img').should('have.attr', 'alt', 'Placeholder Image');
        });
    });

    it('should reset the form and close the modal after creating a listing', () => {
        cy.get('#openCreateListingModal').click();
        cy.get('#listingTitle').type('Test Listing');
        cy.get('#listingDescription').type('This is a test listing');
        cy.get('#startingBid').type('100');
        cy.get('#endsAt').type('2024-07-30T10:00');
        cy.get('#imageInput').type('https://via.placeholder.com/150');
        cy.get('#imageAltInput').type('Placeholder Image');
        cy.get('#createListingForm').submit();

        cy.get('#createListingModal').should('have.class', 'hidden');
        cy.get('createListingForm').within(() => {
            cy.get('#listingTitle').should('have.value', '');
            cy.get('#listingDescription').should('have.value', '');
            cy.get('#startingBid').should('have.value', '');
            cy.get('#endsAt').should('have.value', '');
            cy.get('#imageInput').should('have.value', '');
            cy.get('#imageAltInput').should('have.value', '');
        });
    });
});

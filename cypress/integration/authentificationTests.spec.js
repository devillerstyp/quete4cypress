describe('Backmarket authentification tests', () => {
    
    beforeEach(() => {
        cy.visit('https://www.backmarket.fr/register')
        cy.wait(5000)
        
    })

    it('should failed authentification on wrong credentials', () =>  {

        cy.wait(15000)
        cy.login('styp@yopmail.com', 'Backmarket@0101nn')
        cy.contains('Mauvaise combinaison email/mot de passe')
            .should('be.visible')              
        
        })
    it('should fail when email is empty', () =>  { 

        cy.login(null, 'wrongPassword')
        cy.contains('Le champ "Email" est obligatoire').should('be.visible')         
            
    })

    it('should fail when password is empty', () =>  { 
        
        cy.login('styp@yopmail.com', null)
        cy.wait(5000)
        cy.contains('Mot de passe *')           
       
    })
    it('should fail when email is invalid form', () =>  {  
        cy.login('stypoyopmail.com', 'wrongPassword')
        cy.wait(5000)
        cy.contains('Mauvaise combinaison email')
            .should('be.visible')          
             

    })
    it('should  authentification succefully', () =>  {
        cy.login('styp@yopmail.com', 'Backmarket@0101')
        cy.wait(5000)
        cy.visit('https://www.backmarket.fr/dashboard/orders')
        cy.url().should('contain', '/dashboard/orders')
               
    })
    

    //styp@yopmail.com/Backmarket@0101
})
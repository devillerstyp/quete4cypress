
import 'cypress-file-upload'
require('cypress-downloadfile/lib/downloadFileCommand')


Cypress.Commands.add("product", (q, type, info, limit) => { 
    cy.request({
        url: 'https://tastedive.com/api/similar',
        methode: 'GET',
        qs: {
            q: q,
            type: type,
            limit: limit,
            info: info,
            k: '375546-Personne-3HDDMZ4L'
        }
    }).then(response => {
        cy.log(JSON.stringify(response.body))

       //connexion ok avec code status 200
        expect(response).to.be.ok

       
        //Test sur q(paraametre de recherche) 
         if(q !== undefined) {
            expect(response.body.Similar.Info[0].Name).to.equal(q);
        }else{
            //expect(response.code).to.be.oneOf([200, 302]);
            expect(response.body.Similar.Info[0].Name).to.equal('!!!');
        }                          
        
        
        //Test sur type      
         if(type !== undefined){
             //expect(response.body.Similar.Info[0].Type).eql(type)
             expect(response.body.Similar.Info[0].Type).to.equal(response.body.Similar.Results[0].Type)
        }else{
              expect(response.body.Similar.Results).to.be.empty
            }
        
         //test sur info
        if(info == 1){
            
            expect(response.body.Similar.Info[0]).to.have.all.keys('wTeaser', 'yID', 'yUrl','wUrl','Name', 'Type')
            
        }else{
            
            expect(response.body.Similar.Info[0]).to.not.have.all.keys('wTeaser', 'yID', 'yUrl','wUrl','Name', 'Type')
            
        }
        // Test limit
        if(limit !== undefined){
            //expect(response.body.Similar.Results).lengthOf(limit)
            expect(response.body.Similar.Results.length).to.equal(limit)
            
        }else{
            expect(response.body.Similar.Results.length).to.equal(20)
        }

        
    })
 })
 Cypress.Commands.add('login', (email, password) => {

    if (email != undefined) {
        cy.get('#email-signin')
            .type(email)
            .should('have.value', email)
    }

    if (password != undefined) {
        cy.get('#password-signin')
            .type(password)
            
    }

    cy.get('[data-test=submit-button-login]').click()
})
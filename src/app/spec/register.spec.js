const bent = require('bent');
const urlBase = 'http://localhost:4200/';

describe('creating user', () => {
    const createUser = bent(urlBase,'GET', 'json', 200);
    

    it('should post a new user', async (done, reject) => {
            const newUser = await createUser('create-user?username=cuongdo&password=1234');
            expect (newUser.status).toBe('Create user successfully');
            done();
    });
})
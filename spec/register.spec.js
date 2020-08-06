const bent = require('bent');
const cookieService = require('ngx-cookie-service')
const urlBase = 'http://localhost:8000/';

describe('creating user', () => {
    const createUser = bent(urlBase,'GET', 'json', 200);
    

    it('should post a new user', async (done, reject) => {
            const newUser = await createUser('create-user?username=steven&password=1234&confirmpassword=1234');
            expect (newUser.status).toBe('Create user successfully');
            done();
    });
    it('should response warning message as user already exits', async (done, reject) => {
        const newUser = await createUser('create-user?username=steven&password=1234&confirmpassword=1234');
        expect (newUser.status).toBe('Username already exists, please choose different one ');
        done();
});

})

describe('logging user name and password', () => {
    const loggingUser = bent(urlBase,'GET', 'json', 200);
    
    it('should login successfully', async (done, reject) => {
        const userloged = await loggingUser('authenticate?username=steven&password=1234');
        expect (userloged.status).toBe('OK');
        done();
});

it('should fail to login as password incorrectly', async (done, reject) => {
    const userloged = await loggingUser('authenticate?username=steven&password=12345');
    expect (userloged.reason).toBe('bad password');
    done();
});

})

describe('posting transaction', () => {
    const addTransaction = bent(urlBase,'GET', 'json', 200);
    const loggingUser = bent(urlBase,'GET', 'json', 200);

    
    it('should fail to post a new transaction as token doesnt provided', async (done, reject) => {
        const userloged = await loggingUser('authenticate?username=steven&password=1234');
        const addedTrans = await addTransaction('add-transaction?date=08052020&description=milk&account=grocery&credit=10')
        expect (addedTrans.status).toBe('fail in serve');
        done();
});

})
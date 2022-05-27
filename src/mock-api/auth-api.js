import mock from './mock';
import mockApi from './mock-api.json';

let usersApi = mockApi.components.examples.auth_users.value;

const authServiceConfig = {
    signIn: 'api/auth/sign-in',
    signUp: 'api/auth/sign-up',
};

export default authServiceConfig;

mock.onGet(authServiceConfig.signIn).reply(async (config) => {
    const data = JSON.parse(config.data);
    const {email, password} = data;

    let foundedUser = usersApi.find((_user) => _user.data.email === email);

    const user = foundedUser ? Object.assign({}, foundedUser) : null;

    const error = [];

    if (!user) {
        error.push({
            type: 'email',
            message: 'Check your email address',
        });
    }

    if (user && user.password !== password) {
        error.push({
            type: 'password',
            message: 'Check your password',
        });
    }

    if (error.length === 0) {
        delete user.password;

        const response = {
            user,
        };

        return [200, response];
    }

    return [200, {error}];
});

mock.onPost(authServiceConfig.signUp).reply((request) => {
    const data = JSON.parse(request.data);
    const {displayName, password, email} = data;
    const isEmailExists = usersApi.find((_user) => _user.data.email === email);
    const error = [];

    if (isEmailExists) {
        error.push({
            type: 'email',
            message: 'The email address is already in use',
        });
    }

    if (error.length === 0) {
        const newUser = {
            uuid: '1234',
            from: 'custom-db',
            password,
            role: 'admin',
            data: {
                displayName,
                email,
            },
        };

        usersApi = [...usersApi, newUser];

        const user = {...newUser};

        delete user.password;

        const response = {
            user,
        };

        return [200, response];
    }
    return [200, {error}];
});

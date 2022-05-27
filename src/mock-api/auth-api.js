import mock from './mock';
import mockApi from './mock-api.json';

let usersApi = mockApi.components.examples.auth_users.value;

const authServiceConfig = {
    signIn: 'api/auth/sign-in',
    signUp: 'api/auth/sign-up',
    accessToken: 'api/auth/access-token',
    updateUser: 'api/auth/user/update',
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

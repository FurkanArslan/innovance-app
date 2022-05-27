import mockApi from './mock-api.json';
import mock from './mock';

const ordersDB = mockApi.components.examples.orders.value;

mock.onGet('/api/orders').reply((config) => {
    return [200, ordersDB];
});

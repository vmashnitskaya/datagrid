import { User } from './authentificationInterfaces';

const authHttp = async (url: string, method = 'GET', body: User | null = null, headers = {}) => {
    try {
        let userBody = '';
        let userHeaders = {};
        if (body) {
            userBody = JSON.stringify(body);
            userHeaders = { ...headers, 'Content-Type': 'application/json' };
        }
        const response = await fetch(url, { method, body: userBody, headers: userHeaders });
        const data = await response.json();

        if (response.status === 400) {
            throw new Error(data.message || 'Something went wrong.');
        }

        return data;
    } catch (e) {
        return e.message;
    }
};

export default authHttp;

const dataHttp = async (
    url: string,
    method = 'GET',
    body: { [key: string]: any } | null = null,
    headers = {}
) => {
    try {
        let userBody = '';
        const userHeaders = {
            ...headers,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
        if (body) {
            userBody = JSON.stringify(body);
        }

        let response = null;

        if (method === 'GET') {
            response = await fetch(url, { method, headers: userHeaders });
        } else {
            response = await fetch(url, { method, body: userBody, headers: userHeaders });
        }

        const data = await response.json();

        if (response.status === 400 || response.status === 500) {
            throw new Error(data.message || 'Something went wrong.');
        }

        return data;
    } catch (e) {
        throw new Error(e.message || 'Something went wrong.');
    }
};

export default dataHttp;

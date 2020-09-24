const fetchUserData = async () => {
    const url = 'https://my.api.mockaroo.com/datagrid.json?key=80505eb0';
    const res = await window.fetch(url, { method: 'GET' });
    const data = await res.json();

    return data;
};

export default fetchUserData;

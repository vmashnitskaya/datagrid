const links = {
    users: 'https://my.api.mockaroo.com/datagrid.json?key=80505eb0',
    technologies: 'https://my.api.mockaroo.com/datagrid.json?key=80505eb0',
    locations: 'https://my.api.mockaroo.com/datagrid.json?key=80505eb0',
};

const fetchUserData = async (tabActive: string) => {
    console.log(tabActive);
    const url = tabActive in links ? links[tabActive as keyof typeof links] : null;
    if (url === null) throw new Error(`Invalid tab active: ${tabActive}`);
    const res = await window.fetch(url, { method: 'GET' });
    const data = await res.json();

    return data;
};

export default fetchUserData;

const createRequest = async (url, options) => {
    const request = fetch(url, options);
        
    const result = await request;
    
    if (!result.ok) {
    console.error('Ошибка');
    
    return;
    }

    if (result.status === 204) {
        return result.status;
    }

    const data = await result.json();
    return data;
};

export default createRequest;

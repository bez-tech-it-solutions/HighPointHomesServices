import axios from 'axios'

export const fetchApi = async ({ path, method = 'GET', headers = {}, body = null, setLoading, setState }) => {
    try {
        const options = { method, url: `https://api.teintoo.com/api.php${path}`, headers, ...(body && { data: body }) };
        const response = await axios(options);
        setState(response.data);
    } catch (error) {
        setState(error);
    } finally {
        setLoading(false);
    }
};
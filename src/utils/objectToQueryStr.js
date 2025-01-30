export const objectToQueryStr = (params) => {
    const query = new URLSearchParams();

    for (const key in params) {
        if (params[key] !== undefined && params[key] !== "") {
            query.append(key, params[key]);
        }
    }

    return query.toString() !== "" ? query.toString() : null;
};
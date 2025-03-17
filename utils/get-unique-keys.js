function getUniqueKeys(array) {
    const uniqueKeys = new Set();

    array.forEach(obj => {
        Object.keys(obj).forEach(key => uniqueKeys.add(key));
    });

    return Array.from(uniqueKeys);
}

export default getUniqueKeys
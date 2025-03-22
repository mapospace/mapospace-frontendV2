const getColorForValue = (value, maxValue) => {
    const colors = ['#0136f8', '#1a4af9', '#345ef9', '#4d72fa', '#6786fb', '#809bfc'];

    const segments = colors.length;
    const range = maxValue / segments;

    for (let i = 0; i < segments; i++) {
        const lowerBound = range * (segments - (i + 1));
        if (value > lowerBound) {
            return colors[i];
        }
    }

    return colors[segments - 1];
};

export default getColorForValue
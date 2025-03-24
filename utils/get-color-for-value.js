const getColorForValue = (value, maxValue, newColor = null) => {
    const colors = newColor == null ? [
        "#d1c5fa", "#E9A5F1", "#FED2E2", "#a48bf6", "#9577f4",
        "#8664f3", "#7751f1", "#c2b1f9", "#8F87F1", "#b39ef7",
        "#C7D9DD", "#ADB2D4", "#FFFECE", "#80CBC4", "#D99D81",
        "#A6F1E0", "#B4EBE6", "#73C7C7", "#C7DB9C", "#EFDCAB"
    ] : newColor;

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
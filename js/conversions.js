const conversionTypes = {
    length: {
        imperial: ['inches', 'feet', 'yards', 'miles'],
        metric: ['millimeters', 'centimeters', 'meters', 'kilometers'],
        conversions: {
            inches_millimeters: 25.4,
            inches_centimeters: 2.54,
            inches_meters: 0.0254,
            inches_kilometers: 0.0000254,

            feet_inches: 12,
            feet_millimeters: 304.8,
            feet_centimeters: 30.48,
            feet_meters: 0.3048,
            feet_kilometers: 0.0003048,

            yards_inches: 36,
            yards_feet: 3,
            yards_millimeters: 914.4,
            yards_centimeters: 91.44,
            yards_meters: 0.9144,
            yards_kilometers: 0.0009144,

            miles_inches: 63360,
            miles_feet: 5280,
            miles_yards: 1760,
            miles_millimeters: 1609344,
            miles_centimeters: 160934.4,
            miles_meters: 1609.344,
            miles_kilometers: 1.60934,

            millimeters_centimeters: 0.1,
            millimeters_meters: 0.001,
            millimeters_kilometers: 0.000001,

            centimeters_millimeters: 10,
            centimeters_meters: 0.01,
            centimeters_kilometers: 0.00001,

            meters_millimeters: 1000,
            meters_centimeters: 100,
            meters_kilometers: 0.001,

            kilometers_millimeters: 1000000,
            kilometers_centimeters: 100000,
            kilometers_meters: 1000
        }
    },
    weight: {
        imperial: ['ounces', 'pounds', 'stones'],
        metric: ['grams', 'kilograms'],
        conversions: {
            ounces_grams: 28.3495,
            ounces_kilograms: 0.0283495,
            ounces_pounds: 0.0625,
            ounces_stones: 0.004464,
            
            pounds_ounces: 16,
            pounds_grams: 453.592,
            pounds_kilograms: 0.453592,
            pounds_stones: 0.071429,
            
            stones_ounces: 224,
            stones_pounds: 14,
            stones_grams: 6350.29,
            stones_kilograms: 6.35029,
            
            grams_ounces: 0.035274,
            grams_pounds: 0.00220462,
            grams_stones: 0.000157473,
            grams_kilograms: 0.001,
            
            kilograms_ounces: 35.274,
            kilograms_pounds: 2.20462,
            kilograms_stones: 0.157473,
            kilograms_grams: 1000
        }
    },
    temperature: {
        imperial: ['fahrenheit'],
        metric: ['celsius', 'kelvin'],
        conversions: {}
    },
    currency: {
        imperial: ['USD'],
        metric: ['EUR', 'GBP', 'JPY', 'CNY'],
        conversions: {
            USD_EUR: 0.93,
            USD_GBP: 0.79,
            USD_JPY: 150.27,
            USD_CNY: 7.19
        }
    }
};

function convert(value, fromUnit, toUnit, type) {
    if (type === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit);
    }

    const conversionKey = `${fromUnit}_${toUnit}`;
    const reverseConversionKey = `${toUnit}_${fromUnit}`;
    const conversions = conversionTypes[type].conversions;

    if (conversions[conversionKey]) {
        return value * conversions[conversionKey];
    } else if (conversions[reverseConversionKey]) {
        return value / conversions[reverseConversionKey];
    }

    return value;
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        return (value - 32) * (5/9);
    } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        return (value * (9/5)) + 32;
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        return value + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        return value - 273.15;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        return (value - 32) * (5/9) + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        return (value - 273.15) * (9/5) + 32;
    }
    return value;
}

function getExplanation(value, fromUnit, toUnit, result, type) {
    if (type === 'temperature') {
        if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            return `${value}°F = (${value} - 32) × (5/9) = ${result.toFixed(2)}°C`;
        } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            return `${value}°C = (${value} × 9/5) + 32 = ${result.toFixed(2)}°F`;
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
            return `${value}°C + 273.15 = ${result.toFixed(2)}K`;
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
            return `${value}K - 273.15 = ${result.toFixed(2)}°C`;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
            return `(${value} - 32) × (5/9) + 273.15 = ${result.toFixed(2)}K`;
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
            return `(${value} - 273.15) × (9/5) + 32 = ${result.toFixed(2)}°F`;
        }
    }

    const conversionKey = `${fromUnit}_${toUnit}`;
    const reverseConversionKey = `${toUnit}_${fromUnit}`;
    const conversions = conversionTypes[type].conversions;

    if (conversions[conversionKey]) {
        return `${value} ${fromUnit} × ${conversions[conversionKey]} = ${result.toFixed(2)} ${toUnit}`;
    } else if (conversions[reverseConversionKey]) {
        return `${value} ${fromUnit} ÷ ${conversions[reverseConversionKey]} = ${result.toFixed(2)} ${toUnit}`;
    }

    return `${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
}

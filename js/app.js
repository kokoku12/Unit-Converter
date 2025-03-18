document.addEventListener('DOMContentLoaded', function() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const inputValue = document.getElementById('inputValue');
    const result = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    const conversionExplanation = document.getElementById('conversionExplanation');
    const conversionButtons = document.querySelectorAll('.conversion-types .btn');

    let currentType = 'length';

    function updateUnitOptions(type) {
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';

        const imperial = conversionTypes[type].imperial;
        const metric = conversionTypes[type].metric;

        [...imperial, ...metric].forEach(unit => {
            fromUnitSelect.add(new Option(unit, unit));
            toUnitSelect.add(new Option(unit, unit));
        });

        // default selections
        fromUnitSelect.value = imperial[0];
        toUnitSelect.value = metric[0];
    }

    function performConversion() {
        const value = parseFloat(inputValue.value);
        if (isNaN(value) || value < 0) {
            result.value = '';
            conversionExplanation.textContent = 'Please enter a valid positive number.';
            return;
        }

        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;

        const convertedValue = convert(value, fromUnit, toUnit, currentType);
        result.value = convertedValue.toFixed(2);

        conversionExplanation.textContent = getExplanation(
            value,
            fromUnit,
            toUnit,
            convertedValue,
            currentType
        );
    }

    // Event Listeners for conversion type buttons
    conversionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            conversionButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            currentType = this.dataset.type;
            updateUnitOptions(currentType);
            performConversion();
        });
    });

    // Event listeners for unit selects and input
    [fromUnitSelect, toUnitSelect, inputValue].forEach(element => {
        element.addEventListener('change', performConversion);
        element.addEventListener('input', performConversion);
    });

    // Copy button functionality
    copyButton.addEventListener('click', function() {
        if (result.value) {
            navigator.clipboard.writeText(result.value).then(() => {
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                }, 2000);
            });
        }
    });

    // Initialize with length conversion
    updateUnitOptions(currentType);
});
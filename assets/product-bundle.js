var keys = [];
var options = [];
var selects = [];
var prodcutBundlePicker = document.getElementById('product-bundle__picker');
var currentOption = '';

// get array of key and array of options
document.querySelectorAll('variant-radios .product-form__input input').forEach(input => {
    let option = input.value.trim();
    options.push(option);
    option.split(',').forEach(item => {
        let key = item.split(':')[0].trim();
        if (keys.indexOf(key) == -1) {
            keys.push(key);
        }
    });

    if(input.checked) currentOption = option;
});

// create bundle selector
keys.forEach(key => {
    selects[key] = [];
    var selectOptions = '';
    var isCheckBox = false;
    options.forEach(option => {
        option.split(',').forEach(item => {
            const optionKey = item.split(':')[0].trim();
            const optionValue = item.split(':')[1].trim();
            if(selects[key].indexOf(optionValue) == -1 && key == optionKey) {
                selects[key].push(optionValue);
                selectOptions += `<option value="${optionValue}">${optionValue}</option>`;
                if(optionValue.toLowerCase() == 'true' || optionValue == 'false') isCheckBox = true;
            }
        })
    });

    var container = document.createElement('div');

    container.setAttribute('data-key', key);
    container.classList.add('product-bundle__container');

    if(isCheckBox) {
        container.innerHTML = `
            <label for="product-bundle--${key}" class="product-bundle__label inline-block">${key}</label>
            <input class="product-bundle__checkbox" id="product-bundle--${key}" type="checkbox">
        `;
    } else {
        container.innerHTML = `
            <label for="product-bundle--${key}" class="product-bundle__label">${key}</label>
            <select class="product-bundle__select" id="product-bundle--${key}">
                ${selectOptions}
            </select>
        `;
    }

    prodcutBundlePicker.appendChild(container);
});

// init select option value
currentOption.split(',').forEach(option => {
    const key = option.split(':')[0].trim();
    const value = option.split(':')[1].trim();
    document.querySelector(`[data-key="${key}"]`).classList.add('active');
    if (document.querySelector(`[data-key="${key}"] select`)) {
        document.querySelector(`[data-key="${key}"] select`).value = value;
    } else {
        if(value == 'True') document.querySelector(`[data-key="${key}"] input`).checked = true;
        else document.querySelector(`[data-key="${key}"] input`).checked = false;
    }    
});

function changeOption() {
    const productType = document.querySelector('[data-key="Product Type"] .product-bundle__select').value;
    if(productType == 'Monthly') {
        document.querySelector('[data-key="Month"]').classList.remove('active');
        document.querySelector('[data-key="Addons"]').classList.add('active');
    } else {
        document.querySelector('[data-key="Month"]').classList.add('active');
        document.querySelector('[data-key="Addons"]').classList.remove('active');
    }

    currentOption = '';
    document.querySelectorAll('.product-bundle__container.active').forEach(container => {
        const key = container.querySelector('label').textContent.trim();
        var value = '';
        if(container.querySelector('select')) {
            value = container.querySelector('select').value.trim();
        } else {
            if(container.querySelector('input').checked) value = 'True';
            else value = 'False';
        }

        if(!currentOption) currentOption = `${key}: ${value}`;
        else currentOption += `, ${key}: ${value}`;
    });

    console.log(currentOption);
    document.querySelector(`input[value="${currentOption}"]`).nextElementSibling.click();
}

// add change event to bundle selector
document.querySelectorAll('.product-bundle__select').forEach(select => {
    select.addEventListener('change', function(e){
        e.preventDefault();
        changeOption();
    })
});

document.querySelectorAll('.product-bundle__checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function(e){
        e.preventDefault();
        changeOption();
    })
});
const cardName = document.querySelector('span.card-name');
const cardNumber = document.querySelector('span.card-number');
const cardYear = document.querySelector('span.card-year');
const cardMonth = document.querySelector('span.card-month');
const cardCvc = document.querySelector('span.card-cvc');


const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    const cl = input.classList
    cl.add('input-invalid');

    input.addEventListener('input', (e) => {
        if (input.type == 'text') {
            if (input.value == '') {
                cl.add('input-error')
            } else {
                cl.remove('input-error')
            }
        } else {
            if (/^-?\d+$/.test(input.value)) {
                cl.remove('input-error')
            } else if (input.value == '') {
                cl.add('input-error')
            } else {
                cl.add('input-error')
            }
        }
    })

    input.addEventListener('keydown', (e) => {
        if (input.value.length == input.minLength - 1)
                input.classList.remove('input-invalid')

        if (input.type == 'number') {
            var key = e.keyCode || e.charCode;
            if( key == 8 || key == 46 ) {
                input.classList.add('input-invalid')
                return;
            }

            if (input.value.length >= input.maxLength)
                e.preventDefault();
        }
    })
})

const cardNameInput = document.querySelector('input[name="card-name"]');
cardNameInput.addEventListener('keyup', (e) => {
    if (cardNameInput.classList.contains('input-error')) {
        cardName.innerHTML = "Jane Appleseed"
    } else {
        cardName.innerHTML = cardNameInput.value
    }
})

const cardNumberInput = document.querySelector('input[name="card-number"]');
cardNumberInput.addEventListener('keyup', (e) => {
    if (cardNumberInput.value.length >= 16) {
        formatCardNumber(cardNumberInput, cardNumber);
        return;
    }

    if (cardNumberInput.classList.contains('input-error')) {
        cardNumber.innerHTML = "0000 0000 0000 0000"
    } else {
        cardNumber.innerHTML = cardNumberInput.value
    }
})

const cardYearInput = document.querySelector('input[name="card-year"]');
cardYearInput.addEventListener('keyup', (e) => {
    validateInput(cardYearInput, cardYear, "00") 
})

const cardMonthInput = document.querySelector('input[name="card-month"]');
cardMonthInput.addEventListener('keyup', (e) => {
    validateInput(cardMonthInput, cardMonth, "00") 
})

const cardCvcInput = document.querySelector('input[name="card-cvc"]');
cardCvcInput.addEventListener('keyup', (e) => {
    validateInput(cardCvcInput, cardCvc, "000") 
})

function validateInput(inputEl, targetEl, defaultValue) {
    if (inputEl.value.length > defaultValue.length) {
        return;
    }

    if (inputEl.classList.contains('input-error')) {
        targetEl.innerHTML = defaultValue
    } else {
        targetEl.innerHTML = inputEl.value
    }
}

function formatCardNumber(inputEl, targetEl) {
    let result = "";
    for (let i = 0; i < inputEl.value.length; i+=4) {
        result += inputEl.value.substring(i, i+4);
        result = result + " ";
    }

    targetEl.innerHTML = result;
}

const form = document.querySelector('form');
const article = document.querySelector('article')
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
        isValid = isValid && !input.classList.contains('input-error') && !input.classList.contains('input-invalid');
    })

    if (isValid) {
        article.classList.add('success');
    }
})

const btnTy = document.querySelector('button.btn-ty');
btnTy.addEventListener('click', (e) => {
    article.classList.remove('success');
    inputs.forEach(input => {
        input.value = ''
    })
})
import { getErrorMessage } from './errors.js';

const validInputs = {
  name: false,
  email: false,
  subject: false,
  message: false,
};

export const validate = (input) => {
  let isValid = input.validity.valid;

  let errorTextareaPattern = false;
  const textareaPattern = { minN: '10', maxN: '300' };
  if (input.type === 'textarea') {
    ({ isValid, errorTextareaPattern } = validateTAPattern({
      input,
      pattern: textareaPattern,
      validators: {
        errorTextareaPattern,
        isValid,
      },
    }));
  }

  if (isValid) {
    validInputs[input.name] = true;
    input.parentElement.classList.remove('invalid-input-group');
    input.parentElement.querySelector('.invalid-input-message').innerHTML = '';
  } else {
    validInputs[input.name] = false;
    input.parentElement.classList.add('invalid-input-group');
    input.parentElement.querySelector('.invalid-input-message').innerHTML =
      getErrorMessage(input, {
        errorTextareaPattern,
        pattern: textareaPattern,
      });
  }

  handleSubmitButton();
};

//Function that validate that the textarea fulfill the pattern
const validateTAPattern = ({ input, pattern, validators }) => {
  const { value, validity } = input;
  const { minN, maxN } = pattern;
  const textareaPattern = new RegExp(`^[\\s\\S]{${minN},${maxN}}$`);

  if (!validity['valueMissing']) {
    // executes only when there are text in the input
    if (textareaPattern.test(value)) {
      return { errorTextareaPattern: false, isValid: true };
    }
    return { errorTextareaPattern: true, isValid: false };
  }
  return validators;
};

const handleSubmitButton = () => {
  const isValidForm = checkValidForm();
  const submitButton = document.querySelector('.contact-form .button-form');
  submitButton.disabled = isValidForm ? false : true;
};

//Function that verifies that every input is valid
export const checkValidForm = () => {
  return Object.keys(validInputs).reduce(
    (accumulator, value) => accumulator && validInputs[value],
    true
  );
};

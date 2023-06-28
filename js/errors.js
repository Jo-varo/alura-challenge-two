const errors = ['valueMissing', 'typeMismatch', 'patternMismatch'];

const errorMessages = {
  valueMissing: (name) => `El ${name} no puede estar vacío`,
  typeMismatch: (name) => `El ${name} no es válido`,
  patternMismatch: (name, minN, maxN) =>
    `El campo ${name} debe contener entre ${minN} a ${maxN} caracteres.`,
};

export const getErrorMessage = (
  { validity, placeholder: name, pattern },
  textareaValidations
) => {
  name = name.toLowerCase().split(' ')[0];
  let errorMessage;

  const { errorTextareaPattern } = textareaValidations;

  if (errorTextareaPattern) {
    const {
      pattern: { minN, maxN },
    } = textareaValidations;
    return (errorMessage = errorMessages['patternMismatch'](name, minN, maxN));
  }

  errors.map((error) => {
    if (validity[error]) {
      if (error === 'patternMismatch') {
        const [minN, maxN] = pattern.slice(7).slice(0, -1).split(',');
        errorMessage = errorMessages[error](name, minN, maxN);
      } else {
        errorMessage = errorMessages[error](name);
      }
    }
  });
  return errorMessage;
};

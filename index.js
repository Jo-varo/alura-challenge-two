import { validate, checkValidForm } from './js/validations.js';

const form = document.querySelector('form');
form.onsubmit = (e) => {
  const isValidForm = checkValidForm();
  if (!isValidForm) {
    e.preventDefault();
  }
};

const inputs = form.querySelectorAll('.input-form');
inputs.forEach((input) => {
  input.onblur = () => validate(input);
});

const generateEmail = () => {
  const user = 'jorgevargas0240';
  const at = '@';
  const domain = 'gmail';
  return `${user}${at}${domain}.com`;
};

const replaceContactMail = () => {
  const navMail = document.querySelector('header .header-menu .header-mail');
  const generatedMail = generateEmail();
  navMail.innerHTML = generatedMail;
  navMail.href = `mailto:${generatedMail}`;
};
replaceContactMail();

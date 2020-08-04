'use strict';

(function () {
const body = document.body;
const header = document.querySelector('.header');
const headerTopWrapper = header.querySelector('.header__top-wrapper');
const headerNav = header.querySelector('.nav');
const headerBurger = header.querySelector('.header__burger');
const headerLogo = header.querySelector('.header__logo-img');


function onJSLoad () {
  header.classList.remove('header--nojs');
  headerTopWrapper.classList.remove('header__top-wrapper--nojs');
  headerNav.classList.remove('nav--nojs');
  headerLogo.classList.add('header__logo-img--light');
}
onJSLoad();


function onDOMLoaded () {
  const telInputs = document.querySelectorAll('input[type="tel"]');
  const mailInputs = document.querySelectorAll('input[type="email"]');

  telInputs.forEach((telInput) => {
    telInput.value = JSON.parse(localStorage.getItem('phoneNumber'));
  })
  mailInputs.forEach((mailInput) => {
    mailInput.value = JSON.parse(localStorage.getItem('emailAddress'));
  })
}


function DOMLoaded () {
  document.addEventListener('DOMContentLoaded', onDOMLoaded);
}
DOMLoaded();


function menuToggle () {
  headerNav.classList.toggle('nav--opened');
  headerBurger.classList.toggle('header__burger--opened');
  headerLogo.classList.toggle('header__logo-img--light');
}

headerBurger.addEventListener('click', menuToggle);


function onMenuFullWidth () {
  if (document.documentElement.clientWidth === headerNav.offsetWidth) {
    body.classList.add('body--scroll-locked');
  } else {
    body.classList.remove('body--scroll-locked');
  }
}

function menuFullWidth () {
  headerBurger.addEventListener('click', onMenuFullWidth);
}
menuFullWidth();


function smoothAnimationForAnchors () {
  const anchors = document.querySelectorAll('a[href*="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockId = anchor.getAttribute('href');

      document.querySelector('' + blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}
smoothAnimationForAnchors();


function numberMaskSet() {
  const telInput = document.querySelectorAll('.form input[type="tel"]');

  telInput.forEach(function (it) {
    Inputmask("+7 999 999 99 99", {
      placeholder: '',
      showMaskOnHover: false,
      showMaskOnFocus: false
    }).mask(it);
  });
}
numberMaskSet();


const feedback = document.querySelector('.feedback');


function formValidityCheck (currentFormWrapper) {
  const currentForm = currentFormWrapper.querySelector('form');
  currentForm.setAttribute('novalidate', 'novalidate');

  currentForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (formInputsValidityCheck(currentForm)) {
      const currentTelInputValue = currentForm.querySelector('input[type="tel"]').value;
      const currentMailInputValue = currentForm.querySelector('input[type="email"]').value;

      currentForm.reset();
      localStorage.setItem('phoneNumber', JSON.stringify(currentTelInputValue));
      localStorage.setItem('emailAddress', JSON.stringify(currentMailInputValue));
    }
  });
}
formValidityCheck(feedback);

function formInputsValidityCheck (currentForm) {
  const phone = currentForm.querySelector('input[type="tel"]');
  const mail = currentForm.querySelector('input[type="email"]');
  const phoneValue = phone.value.trim();
  const mailValue = mail.value.trim();
  let phoneValueSplited;
  let isPhoneValid = false;
  let isMailValid = true;

  if (phoneValue) {
    phoneValueSplited = phoneValue.split('+')[1].split(' ').join('').trim();
  }

  if (phoneValue && phoneValueSplited.length !== 11) {
    setErrorFor(phone, 'Данные не верны');
  } else if (phoneValue === '') {
    setErrorFor(phone, 'Данные не верны');
  } else {
    isPhoneValid = true;
    setSuccessFor(phone);
  }

  if (!mailValue.includes('@') && mailValue !== '') {
    isMailValid = false;
    setErrorFor(mail, 'Данные не верны');
  } else {
    setSuccessFor(mail);
  }

  return isPhoneValid && isMailValid;
}


function setErrorFor (input, message) {
  const inputControl = input.parentElement;
  const small = inputControl.querySelector('small');
  inputControl.classList.add('form__input-control--error');
  small.textContent = message;
}


function setSuccessFor (input) {
  const inputControl = input.parentElement;
  inputControl.classList.remove('form__input-control--error');
}
})();

'use strict';

var header = document.querySelector('.header');
var headerTopWrapper = header.querySelector('.header__top-wrapper');
var headerNav = header.querySelector('.nav');
var headerBurger = header.querySelector('.header__burger');
var headerLogo = header.querySelector('.header__logo-img');

header.classList.remove('header--nojs');
headerTopWrapper.classList.remove('header__top-wrapper--nojs');
headerNav.classList.remove('nav--nojs');

headerLogo.classList.add('header__logo-img--light');

function menuToggle() {
  headerNav.classList.toggle('nav--opened');
  headerBurger.classList.toggle('header__burger--opened');
  headerLogo.classList.toggle('header__logo-img--light');
}

headerBurger.addEventListener('click', menuToggle);

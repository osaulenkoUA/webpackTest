'use strict';

import './style.css';
import menuList from './list.js';
import menuItemTemplate from './a.hbs';
const form = document.querySelector('.js-form');
const listZakaz = document.querySelector('.list-zakaz');
// ---MODAL WINDOW--------------------//
crateMenu(menuList);
// ------func for crate obj//
const CrateObj = function (type, value) {
  this.type = type;
  this.value = value;
};

function crateMenu(menuList) {
  const menuItem = menuList
    .map(itemMenu => {
      return menuItemTemplate(itemMenu);
    })
    .join('');
  form.insertAdjacentHTML('afterbegin', menuItem);
}
// =----------------------//

const btn = document.querySelector('.js-btn');
btn.addEventListener('click', boo);

function boo(e) {
  const newArray = [];
  const zakaz = [];
  e.preventDefault();
  const allInp = document.querySelectorAll('.js-input');
  allInp.forEach(inp => {
    const valueColor = inp.value;
    const nameColor = inp.name;
    const currentColor = new CrateObj(nameColor, valueColor);
    newArray.push(currentColor);
  });

  menuList.forEach((el, idx) => {
    if (newArray[idx].value < el.value) {
      const zakazCurrColor = el.value - newArray[idx].value;
      const temp = new CrateObj(el.type, zakazCurrColor);
      zakaz.push(temp);
    }
  });
  if (zakaz.length === 0) {
    listZakaz.insertAdjacentHTML('beforeend', `<li>ВСЕ Є!!!</li>`);
  } else {
    zakazList(zakaz);
  }
}

function zakazList(array) {
  listZakaz.innerHTML = '';
  array.forEach(elem => {
    const type = elem.type;
    const value = elem.value;
    const li = `${type} - ${value}`;
    listZakaz.insertAdjacentHTML(
      'beforeend',
      `<li class="list-zakaz__item">${li}</li>`,
    );
  });
}

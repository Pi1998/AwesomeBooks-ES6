/* eslint-disable no-unused-vars */

import { BookCollection } from "./modules/bookCollection.js";
import {  homeClick, addClick, contactClick } from "./modules/eventHandler.js";

// handle page link clicks

document.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.getElementById('home-link');
  const addLink = document.getElementById('add-link');
  const contactLink = document.getElementById('contact-link');
  const line = document.querySelector('hr');

  homeLink.style.display = 'block';
  addLink.style.display = 'none';
  contactLink.style.display = 'none';

  homeLink.addEventListener('click', homeClick);
  addLink.addEventListener('click', addClick);
  contactLink.addEventListener('click', contactClick);

  const bookCollection = new BookCollection();
  window.bookCollection = bookCollection;
});

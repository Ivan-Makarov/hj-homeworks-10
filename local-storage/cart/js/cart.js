'use strict';

const colors = document.querySelector('#colorSwatch');
const sizes = document.querySelector('#sizeSwatch');
const cart = document.querySelector('#quick-cart');
const cartForm = document.querySelector('#AddToCartForm');
const addToCart = document.querySelector('#AddToCart');

function getData(from, handler) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(e) {
        const data = JSON.parse(xhr.response);
        // data.forEach(item => console.log(item))
        handler(data);
    });

    xhr.open('GET', from);
    xhr.send()
}

getData('https://neto-api.herokuapp.com/cart/colors', handleColors);
getData('https://neto-api.herokuapp.com/cart/sizes', handleSizes);

addToCart.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(cartForm);

    for (const [k, v] of formData) {
        console.log(`${k} : ${v}`);
    }
    formData.append('productId', cartForm.dataset.productId);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(e) {
        console.log(xhr.response);
        // console.log(JSON.parse(xhr.response));

        // const itemData = JSON.parse(xhr.response);
        // const cartItem = document.createElement('div');
        // cartItem.classList.add('quick-cart-product', 'quick-cart-product-static');
        // cartItem.id = `quick-cart-product-${itemData.id}`;
        // cartItem.style.opacity = '1';
        // cartItem.innerHTML = `<div class="quick-cart-product-wrap">
        //                           <img src="${itemData.pic}" title="${itemData.title}">
        //                           <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
        //                           <span class="s2"></span>
        //                         </div>
        //                      <span class="count hide fadeUp" id="quick-cart-product-count-${itemData.id}">${itemData.count}</span>
        //                      <span class="quick-cart-product-remove remove" data-id="${itemData.id}"></span>`
        // console.log(cartItem);
        // cart.appendChild(cartItem);
    });

    xhr.open('POST',  'https://neto-api.herokuapp.com/cart');
    xhr.send(formData)
});

function handleColors(data) {
    function makeHTML(html, color) {
        if (color.isAvailable) {
            html += `<div data-value="${color.type}" class="swatch-element color ${color.type} available">
                        <div class="tooltip">${color.title}</div>
                        <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}">
                        <label for="swatch-1-${color.type}" style="border-color: ${color.type};">
                              <span style="background-color: ${color.code};"></span>
                              <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                        </label>
                    </div>`
        } else {
            html += `<div data-value="${color.type}" class="swatch-element color ${color.type} soldout">
                        <div class="tooltip">${color.title}</div>
                        <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" disabled>
                        <label for="swatch-1-${color.type}" style="border-color: ${color.type};">
                              <span style="background-color: ${color.code};"></span>
                              <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                        </label>
                    </div>`
        }
        return html;
    }
    colors.innerHTML = data.reduce(makeHTML, colors.innerHTML);
}

function handleSizes(data) {
    function makeHTML(html, size) {
        if (size.isAvailable) {
            html += `<div data-value="${size.type}" class="swatch-element plain ${size.type} available">
                        <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}">
                        <label for="swatch-0-${size.type}">
                          ${size.title}
                          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                        </label>
                    </div>`
        } else {
            html += `<div data-value="${size.type}" class="swatch-element plain ${size.type} soldout">
                        <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" disabled>
                        <label for="swatch-0-${size.type}">
                          ${size.title}
                          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                        </label>
                    </div>`
        }
        return html;
    }
    sizes.innerHTML = data.reduce(makeHTML, sizes.innerHTML);
}

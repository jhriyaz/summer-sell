
/**
 * The function `getProductPriceInNumber` retrieves the price of a product from the HTML document and
 * returns it as a number.
 * @param id - The id parameter is the id of the HTML element that contains the product price.
 * @returns the price of a product as a number.
 */
function getProductPriceInNumber(id) {

    let itemPriceString = document.getElementById(id).innerText
    let itemPrice = parseFloat(itemPriceString)
    return itemPrice
}



/* This code snippet adds a click event listener to the HTML element with the id "couponCode". When the
element is clicked, the function inside the event listener is executed. */
document.getElementById('couponCode').addEventListener('click', function (e) {
    navigator.clipboard.writeText(e.target.innerText);
    document.getElementById('coupon-alert-message').classList.replace('hidden', 'flex')

})


/**
 * The function enables a button by removing the 'btn-disabled' class and changing the background color
 * to '#E527B2'.
 * @param buttonId - The parameter `buttonId` is the id of the button element that you want to enable.
 */
function buttonEnable(buttonId) {
    let button = document.getElementById(buttonId)
    button.classList.remove('btn-disabled')
    button.style.background = '#E527B2'
}

/**
 * The function `discountValidation()` checks if the total price is greater than or equal to 200, and
 * if so, it checks if the coupon code entered is 'SELL200'. If the conditions are met, it calculates
 * the discount price, updates the displayed discount and net prices, and displays a success message.
 * @returns different values depending on the conditions. If the totalPrice is less than 200, it will
 * return 0.00. If the totalPrice is greater than or equal to 200 and the coupon code is incorrect, it
 * will return an alert message. Otherwise, it will calculate the discountPrice and netPrice, update
 * the corresponding elements in the HTML, and return undefined.
 */
function discountValidation() {
    if (totalPrice >= 200) {

        if (couponField.value != 'SELL200') {

            return alert('please put correct code')

        }
    } if (totalPrice < 200) {
        return document.getElementById('discount-Price').innerText = 0.00
    } else {
        discountPrice = totalPrice * (20 / 100)
        document.getElementById('discount-Price').innerText = discountPrice.toFixed(2)
        netPrice = totalPrice - discountPrice
        document.getElementById('net-Price').innerText = netPrice.toFixed(2)
        couponButton.innerText = 'Applied'
        document.getElementById('coupon-apply-alert-message').innerText = 'Code Applied'
        document.getElementById('coupon-apply-alert-message').classList.replace('hidden', 'flex')
        document.getElementById('coupon-apply-alert-message').classList.replace('alert-error', 'alert-success')
    }
}
let cartListBox = document.getElementById('cartItems')
let totalPrice = getProductPriceInNumber('total-price')
let discountPrice = getProductPriceInNumber('discount-Price')
let netPrice = getProductPriceInNumber('net-Price')
let couponButton = document.getElementById('couponButton')
let couponField = document.getElementById('couponField')





/**
 * The function `getProductPrice` adds a product to the cart, updates the total price, and
 * enables/disables buttons based on certain conditions.
 * @param target - The `target` parameter is the element that triggered the function. It is typically
 * an HTML element that represents a product or item.
 */
function getProductPrice(target) {

    // enables disabled button on add cart

    let itemPrice = parseFloat(target.children[1].lastElementChild.firstChild.innerText)
    buttonEnable('purchaseButton')
    // adding items on cart list and set name to cart list with item price
    let itemName = target.children[1].firstElementChild.nextElementSibling.innerText
    let countItems = cartListBox.children.length
    let p = document.createElement('p')
    p.innerHTML = `${countItems + 1} : <span class="text-xl"> ${itemName}</span> `
    cartListBox.classList.remove('hidden')
    cartListBox.appendChild(p)

    // adding item price to total estimated amount
    totalPrice += itemPrice
    document.getElementById('total-price').innerText = totalPrice.toFixed(2)
    // discount add if new added to cart cart
    if (discountPrice > 1) {
        discountValidation()
    }
    if (totalPrice >= 200) {
        buttonEnable('couponButton')

    }
    // net total price set into section
    netPrice = totalPrice - discountPrice
    document.getElementById('net-Price').innerText = netPrice.toFixed(2)
}
// REMOVE DISCOUNT IF COUPON CODE CHANGES
/* The `couponField.addEventListener('focusout', function () { ... })` code adds an event listener to
the `couponField` element. This event listener listens for the `focusout` event, which occurs when
the user moves focus away from the `couponField` element (e.g., by clicking outside of the field). */
couponField.addEventListener('focusout', function () {
    if (couponField.value != 'SELL200') {
        discountPrice = 0
        netPrice = totalPrice - discountPrice
        document.getElementById('discount-Price').innerText = discountPrice.toFixed(2);
        document.getElementById('net-Price').innerText = netPrice.toFixed(2)
        couponButton.innerText = 'ApplY'
        document.getElementById('coupon-apply-alert-message').innerHTML = `coupon removed <br> please put correct code and click apply`
        document.getElementById('coupon-apply-alert-message').classList.replace('alert-success', 'alert-error')

    }

})

// discount calculation
/* The code `couponButton.addEventListener('click', discountValidation)` adds a click event listener to
the HTML element with the id "couponButton". When the element is clicked, the function
`discountValidation` is executed. This allows the function to be triggered when the user clicks on
the "couponButton" element, typically used to apply a coupon code and calculate the discount price. */
couponButton.addEventListener('click', discountValidation)
// reload page after purchase
/* The code `document.getElementById('goHomeButton').addEventListener('click', function () {
    window.location.reload()
})` adds a click event listener to the HTML element with the id "goHomeButton". When the element is
clicked, the function inside the event listener is executed. In this case, the function reloads the
current page using `window.location.reload()`. This effectively refreshes the page and brings the
user back to the initial state of the application. */
document.getElementById('goHomeButton').addEventListener('click', function () {
    window.location.reload()
})
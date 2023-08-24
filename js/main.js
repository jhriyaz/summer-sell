
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
document.getElementById('couponCode').addEventListener('click', function (e) {
    navigator.clipboard.writeText(e.target.innerText);
    document.getElementById('coupon-alert-message').classList.replace('hidden', 'flex')

})

// enables disabled buttons
function buttonEnable(buttonId) {
    let button = document.getElementById(buttonId)
    button.classList.remove('btn-disabled')
    button.style.background = '#E527B2'
}

// discount coupon validation
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
couponButton.addEventListener('click', discountValidation)
// reload page after purchase
document.getElementById('goHomeButton').addEventListener('click', function () {
    window.location.reload()
})
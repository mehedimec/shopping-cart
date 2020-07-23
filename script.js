//item1 increment
const incrementItemBtn1 = document.getElementById("incrementItem1");
incrementItemBtn1.addEventListener("click", function(){
    itemQtyhandler("phoneQty", "phonePrice", "increment");
})
//item2 increment
const incrementItemBtn2 = document.getElementById("incrementItem2");
incrementItemBtn2.addEventListener("click", function() {
    itemQtyhandler("casingQty", "casingPrice", "increment");
})
//item1 increment
const decrementItemBtn1 = document.getElementById("decrementItem1");
decrementItemBtn1.addEventListener("click", function() {
    itemQtyhandler("phoneQty", "phonePrice", "decrement");
})
//item1 increment
const decrementItemBtn2 = document.getElementById("decrementItem2");
decrementItemBtn2.addEventListener("click", function() {
    itemQtyhandler("casingQty", "casingPrice", "decrement");
})

// Item 1 Delete
const itemDeleteBtn1 = document.getElementById("removeItem1");
itemDeleteBtn1.addEventListener("click", function(){
   RemoveItemFromCart("phone", "phonePrice")
}) 
// Item 2 Delete
const itemDeleteBtn2 = document.getElementById("removeItem2");
itemDeleteBtn2.addEventListener("click", function(){
   RemoveItemFromCart("casing", "casingPrice")
})

//Item quantity handler
function itemQtyhandler(itemQtyId, itemPriceId, type){
    const itemQty = document.getElementById(itemQtyId).value;
    const newItemQty = type == "increment" ? parseFloat(itemQty) + 1 : parseFloat(itemQty) - 1 ;
    const itemPrice = document.getElementById(itemPriceId).innerText;
    var itemPriceAmount = parseFloat(itemPrice);
    // To save the base value of the product for future calculation even after changing the DOM
    const itemOriginalPrice = itemPriceAmount / itemQty;
    // prevent item quantity decrement less than 1
    if (newItemQty <= 1){
        document.getElementById(itemQtyId).value = 1;
        document.getElementById(itemPriceId).innerText = itemOriginalPrice;        
    } else{
        document.getElementById(itemQtyId).value = newItemQty;
        const updatedPrice = itemOriginalPrice * newItemQty;
        document.getElementById(itemPriceId).innerText = updatedPrice;

        // DOM Updating to invoice 
      if(itemQtyId == "phoneQty" ){
        document.getElementById("invoice-phonePrice").innerText = itemOriginalPrice;
        document.getElementById("invoice-phoneQty").innerText = newItemQty;
        document.getElementById("invoice-phoneTotal").innerText = updatedPrice;
     }else if(itemQtyId == "casingQty" ){
        document.getElementById("invoice-casingPrice").innerText = itemOriginalPrice;
        document.getElementById("invoice-casingQty").innerText = newItemQty;
        document.getElementById("invoice-casingTotal").innerText = updatedPrice;
     }
    }

    //Updating new subtotal & Total
    updateTotal();
}


//total & subtotal calculation
function updateTotal(){
    const phonePrice = document.getElementById("phonePrice").innerText;
    const casingPrice = document.getElementById("casingPrice").innerText;
    const getSubtotal = parseFloat(phonePrice) + parseFloat(casingPrice);
    document.getElementById("subtotal").innerText = getSubtotal;
    //5% tax calculation
    const getTax = getSubtotal * (5/100);
    document.getElementById("tax").innerText = getTax;
    const getTotal = getSubtotal + getTax;
    document.getElementById("total").innerText = getTotal;

    //for invoice
    document.getElementById("invoice-subtotal").innerText = getSubtotal;
    document.getElementById("invoice-tax").innerText = getTax;
    document.getElementById("invoice-total").innerText = getTotal;

    // Remove Checkout Button When Total amount is 0
    if(getSubtotal < 1){
        checkOutBtn.style.display ="none";
 }
}



// Functionality for Item Remove
function RemoveItemFromCart(itemId, ItemPriceId){
 document.getElementById(itemId).style.display= "none";
 document.getElementById(ItemPriceId).innerText = 0;
 //Updating on Invoice
 if(itemId == "phone" ){
    document.getElementById("invoice-phone").style.display= "none";
 }else if(itemId == "casing" ){
    document.getElementById("invoice-casing").style.display= "none";
 }
 updateTotal();
}

// Checkout 
const checkOutBtn = document.getElementById('checkoutbtn');
checkOutBtn.addEventListener("click", function(){
   document.getElementById("deliveryDetails").classList.remove("d-none");
   document.getElementById("shoppingcart").classList.add("d-none");
})
// Delivery Details Submit 
const deliveryDetailsForm = document.getElementById('deliveryDetailsForm');
deliveryDetailsForm.addEventListener("submit", function(e){
   e.preventDefault();
   // Printing Invoice Customer Details 
   document.getElementById("showCustomerName").innerText = deliveryDetailsForm.customerName.value;
   document.getElementById("showCustomerPhone").innerText = deliveryDetailsForm.customerPhone.value;
   document.getElementById("showCustomerEmail").innerText = deliveryDetailsForm.customerEmail.value;
   document.getElementById("showCustomerAddress").innerText = deliveryDetailsForm.customerAddress.value;

   //Hiding and Showing Elements
   document.getElementById("shoppingcart").classList.add("d-none");
   document.getElementById("deliveryDetails").classList.add("d-none");
   document.getElementById("invoice").classList.remove("d-none");
})
// button onclick focus --> plus and minus button
const focusableElements = [...modal.querySelectorAll('input, button')]
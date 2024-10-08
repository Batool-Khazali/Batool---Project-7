
// const logInAPI = "https://localhost:44387/api/LoginAndRegister/login";
const moveToOrdersAPI = "https://localhost:44387/api/Orders/MoveItemsToOrder/";
const deleteCart = "https://localhost:44387/api/Carts/deleteCart/";


// test cart tems in local storage
localStorage.setItem("item1", JSON.stringify({ cart_id: 16, bookId: 17, quantity: 1, format: "PDF", price: 29.99 }));
localStorage.setItem("item2", JSON.stringify({ cart_id: 16, bookId: 22, quantity: 2, format: "Hard Copy", price: 29.99 }));
localStorage.setItem("item3", JSON.stringify({ cart_id: 16, bookId: 5, quantity: 1, format: "Hard Copy", price: 29.99 }));

// test data in local storage
localStorage.setItem("jwtToken", "token");
localStorage.setItem("userId", 16);
localStorage.setItem("cartId", 17);



async function goToCheckout() {

    // check if user is logged in
    let JWTToken = localStorage.getItem("jwtToken");
    if (JWTToken === null) {
        location.href = "shop-login.html";
        return;
    }

    // if not do the following:

    // get all cart items from local storage and save them in an array
    let cartItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("item")) {
            cartItems.push(JSON.parse(localStorage.getItem(key)));
        }
    }
    // console.log(cartItems);

    // get user id for the api
    let id = localStorage.getItem("userId");

    // use api to create new order and add the iyems
    let response = await fetch(moveToOrdersAPI + id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems)
    });
    // console.log(response);


    //clear local storge from cart items
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("item")) {
            localStorage.removeItem(key);
        }
    }

    // delete cart + cart items from DB using the cart ID
    let cartId = localStorage.getItem("cartId");
    let deleteResponse = await fetch(deleteCart + cartId, {
        method: "DELETE",
    });
    // console.log(deleteResponse);
    

    // redirect to checkout page
    location.href = "shop-checkout.html";
}
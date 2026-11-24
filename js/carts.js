let productsInCart = localStorage.getItem("productsInCart")
let allProducts = document.querySelector(".products ")
let badge = document.querySelector(".badge");

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("productsInCart")) || [];

    badge.innerHTML = cart.reduce((total, item) => total + (item.quantity || 1),0);
}

updateCartBadge();

if (productsInCart){
    let item = JSON.parse(productsInCart)
    drawCartProducts(item)
}

function drawCartProducts(products){
    if (products.length === 0) {
    allProducts.innerHTML = '<p style="color: white;">Your cart is empty.</p>';
    document.querySelector("#totalPrice").innerText = "0.00";
    return;
}
    let y = products.map ((item) => {
        return `
                    <div class="product-item">
                        <img class="product-item-img"  src="${item.imageUrl}" alt="">
                        <div class="product-item-desc">
                            <h2 class= "product-title"> ${item.title}</h2>
                            <p class="product-price">${item.price}</p>
                            <span class="product-price">${item.category}</span>
                        </div>
                        <div class="product-item-action">
                            <button onclick="changeQuantity(${item.id}, -1)">-</button>

                               <span>${item.quantity || 1}</span>

                              <button onclick="changeQuantity(${item.id}, 1)">+</button>

                            <button class="add-to-cart" onclick="removeFromCart(${item.id})">
                            Remove From Cart
                              </button>
                         
                        </div>

                      </div>
                       `
                
    })
    allProducts.innerHTML = y.join("")
    let total = products.reduce((sum, item) => {

    let price = Number(item.price.replace(/[^\d.]/g, ""));

    return sum +(price * (item.quantity || 1))

}, 0);

document.querySelector("#totalPrice").innerText = total.toFixed(2);
}
function changeQuantity(id, amount) {
    let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

    let item = products.find(item => item.id == id);

    if (item) {
        item.quantity = (item.quantity || 1) + amount;
    }

    localStorage.setItem("productsInCart", JSON.stringify(products));

    drawCartProducts(products);
    updateCartBadge();
}

function removeFromCart (id){
    let products = JSON.parse(localStorage.getItem("productsInCart"))
    products = products.filter((item) => {
        return item.id != id

    })
    localStorage.setItem("productsInCart", JSON.stringify(products))
    drawCartProducts(products)
updateCartBadge()
}
let favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];

let favoritesContainer = document.querySelector(".favorite-products");
function drawFavoriteProducts() {
    if (favoriteProducts.length === 0) {
    favoritesContainer.innerHTML =
        '<p style="color: white;">You have no favorite items.</p>';
    return;
}

    let y = favoriteProducts.map((item) => {

        return `
        <div class="product-item">

            <img class="product-item-img" src="${item.imageUrl}" alt="">

            <div class="product-item-desc">

                <h2 class="product-title">${item.title}</h2>

                <p class="product-price">Category: ${item.category}</p>

            </div>

            <div class="product-item-action">

                <i class="fa-solid fa-heart fav"
                onclick="removeFromFavorites(${item.id})"></i>

            </div>

        </div>
        `;
    });

    favoritesContainer.innerHTML = y.join("");
}

drawFavoriteProducts();
function removeFromFavorites(id) {

    favoriteProducts = favoriteProducts.filter((item) => item.id != id);

    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));

    drawFavoriteProducts();
}
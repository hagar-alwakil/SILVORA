
let userInfo = document.querySelector("#user-info");
let userData = document.querySelector("#user");
let links = document.querySelector("#links");

let username = localStorage.getItem("username");

if (username) {
    links.style.display = "none";
    userInfo.style.display = "flex";
    userData.innerHTML = "Hello, " + username;
} else {
    links.style.display = "flex";
    userInfo.style.display = "none";
}

let logOutBtn = document.querySelector("#log-out");

if (logOutBtn) {
    logOutBtn.addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("username");
        window.location.href = "index.html";
    });
}
let allProducts = document.querySelector(".products ")
let products = [
    {
        id : 1,
        title : "Men's Silver Necklace",
        price : " Price : 8030 LE  ",
        category :"Category : Men's Chain ",
        imageUrl : "images/11.jpeg"
    }
    ,
    {
        id : 2,
        title : "Men's Silver Watch",
        price : " Price : 35000 LE ",
        category : "Category :Men's Watches ",
        imageUrl : "images/1.png"
    }
    ,
    {
        id : 3,
        title : "Women's Silver Ring ",
        price : " Price : 7300 LE ",
        category :"Category : Women's Rings",
        imageUrl : "images/7.jpeg"
    }
    ,
    {
        id : 4,
        title : "Women's Silver Necklace",
        price : " Price : 9400 LE" ,
        category :" Category : Women's Necklaces ",
        imageUrl : "images/4.jpeg"
    },

    {
        id : 5,
        title : "Men's Silver Bracelet",
        price : " Price : 3500 LE ",
        category : "Category : Men's Bracelets",
        imageUrl : "images/8.png"
    },

    {
        id : 6,
        title :"Women's Silver Earrings",
        price : " Price : 4200 LE ",
        category : "Category : Women's Earings ",
        imageUrl : "images/5.jpeg"
    },

    {
        id : 7,
        title : "Men's Silver Accessories",
        price : " Price : 6500 LE ",
        category : "Category : Men's Accessories ",
        imageUrl : "images/16.png"
    },

    {
        id : 8,
        title :"Women's Silver Band Ring",
        price : "Price : 3800 LE ",
        category : "Category : Women's Band Rings ",
        imageUrl : "images/15.png"
    },

    {
        id : 9,
        title : "Women's Silver Chain",
        price : " Price : 12000 LE ",
        category : "Category : Women's Chains ",
        imageUrl : "images/9.jpeg"
    },

    {
        id : 10,
        title :" Women's Silver Necklace & Earrings",
        price :" Price : 22800 LE ",
        category :"Category : Women's Sets" ,
        imageUrl : "images/14.png"
    },

    {
        id : 11,
        title : "Women's Silver Watch",
        price : "Price : 45000 LE ",
        category : "Category : Women's Watches ",
        imageUrl : "images/17.png"
    },

    {
        id : 12,
        title : "Men's Silver Band Ring",
        price : " Price : 3700 LE ",
        category :" Category : Men's Rings ",
        imageUrl : "images/12.png"
    },

]

let cartProductDiv = document.querySelector (".carts-products div")
let badge = document.querySelector(".badge")
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("productsInCart")) || [];

    badge.innerHTML = cart.reduce((total, item) => total + item.quantity, 0);
}
updateCartBadge()
let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart") ): []
let favoriteItems = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
function drawItems (list = products){
    let y = list.map ((item) => {
        return `
                    <div class="product-item">
                        <img class="product-item-img"  src="${item.imageUrl}" alt="">
                        <div class="product-item-desc">
                            <h2 class= "product-title"> ${item.title}</h2>
                            <p class="product-price">${item.price}</p>
                            <span class="product-price">${item.category}</span>
                        </div>
                        <div class="product-item-action">
                            <button class="add-to-cart" onClick = 
                            "toggleCart (${item.id})">
                            ${addedItem.some(cartItem=>cartItem.id ===item.id) ? "Remove From Cart" :"Add To Cart" }</button>
                            <i class="fa-solid fa-heart fav ${favoriteItems.some(fav => fav.id == item.id)
                                 ? "active" : ""}" onclick="toggleFavorite(${item.id})"></i>
                        </div>

                      </div>
                       `
                
    })
    allProducts.innerHTML = y.join("")
}
drawItems()
function toggleFavorite(id) {
    console.log("Favorite clicked", id)

    let product = products.find(item => item.id == id);

    let exist = favoriteItems.some(item => item.id == id);

    if (exist) {
        favoriteItems = favoriteItems.filter(item => item.id != id);
    } else {
        favoriteItems.push(product);
    }

    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteItems));

    drawItems();
}
let searchInput = document.querySelector(".search");
let searchBtn = document.querySelector(".search-btn");

searchInput.addEventListener("input", function() {

    let value = searchInput.value.toLowerCase().trim();

    let result = products.filter(item =>
        item.title.toLowerCase().startsWith(value)
    );

    drawItems(result);

});
function toggleCart(id) {

    if (!localStorage.getItem("username")) {
        window.location = "login.html";
        return;
    }

    let existingItem = addedItem.find(item => item.id === id);

    if (existingItem) {

        addedItem = addedItem.filter(item => item.id !== id);

    } else {

        let chosenItem = products.find(item => item.id === id);

        addedItem.push({...chosenItem, quantity: 1});

    }

    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
     updateCartBadge()
    drawCart();

    drawItems();
}
let shoppingCartIcon = document.querySelector(".shopping-cart i")
let cartsProducts = document.querySelector(".carts-products")
shoppingCartIcon.addEventListener("click",opencart)
function opencart(){
    
        if (cartsProducts.style.display == "block"){
            cartsProducts.style.display = "none"
        }else{
            cartsProducts.style.display = "block"
        }
    }
function drawCart (){
    cartProductDiv.innerHTML = addedItem.map(item => `<div class ="cart-item">
        <h4> ${item.title} </h4>
        <p> Price: ${Number(item.price.replace(/[^0-9.]/g, "")) * (item.quantity || 1)} LE </p>
        <div class ="quantity"> <button Onclick = "changeQuantity(${item.id},-1)">-</button>
        <span> ${item.quantity || 1 } </span>
        <button Onclick =  "changeQuantity(${item.id},1)">+</button>
        </div>`).join ("")
        let total = addedItem.reduce ((sum,item) => sum +(item.quantity || 1), 0)
        badge.style.display = "block"
        badge.innerHTML= total

}
function addToCart(id){
    if (! localStorage.getItem("username")){
        window.location = "login.html"
    return ;}
        let choosenItem = products.find (item => item.id === id)
        let existingItem = addedItem.find (item=> item.id ===id)
        if (existingItem){
            existingItem.quantity = (existingItem.quantity || 1) +1
        }else{
            addedItem.push ({...choosenItem, quantity :1})
        }
        localStorage.setItem("productsInCart", JSON.stringify(addedItem))
    
        drawCart ()
    }

function changeQuantity (id ,amount){
    let item = addedItem.find(item => item.id ===id)
    if (!item) return;
    item.quantity =(item.quantity || 1) + amount
    if (item.quantity <= 0){
        addedItem =
        addedItem.filter(item => item.id !==id)
    }
    localStorage.setItem("productsInCart" , JSON.stringify (addedItem))
    drawCart()
    drawItems()
}
drawCart()
updateCartBadge()

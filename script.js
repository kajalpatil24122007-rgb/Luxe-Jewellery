document.addEventListener("DOMContentLoaded", function(){

const products = [
  {id:1,name:"Gold Necklace",price:5000,category:"Necklace",image:"gold-necklace.jpg"},
  {id:2,name:"Diamond Ring",price:8000,category:"Ring",image:"diamond-ring.jpg"},
  {id:3,name:"Silver Earrings",price:3000,category:"Earrings",image:"silver-earrings.jpg"},
  {id:4,name:"Luxury Necklace",price:12000,category:"Necklace",image:"luxury-necklace.jpg"},
  {id:5,name:"Rose Gold Ring",price:6500,category:"Ring",image:"rose-gold-ring.jpg"},
  {id:6,name:"Pearl Earrings",price:4000,category:"Earrings",image:"pearl-earrings.jpg"},
{id:7,name:"Bridal Gold Set",price:25000,category:"Necklace",image:"bridal-gold-set.jpg"},
  {id:8,name:"Gold Bracelet",price:7000,category:"Bracelet",image:"gold-bracelet.jpg"},
  {id:9,name:"Diamond Bracelet",price:15000,category:"Bracelet",image:"diamond-bracelet.jpg"},
  {id:10,name:"Silver Ring",price:2000,category:"Ring",image:"silver-ring.jpg"},
  {id:11,name:"Silver Anklet",price:2500,category:"Anklet",image:"silver-anklet.jpg"},
  {id:12,name:"Traditional Anklet",price:3800,category:"Anklet",image:"traditional-anklet.jpg"},
  {id:13,name:"Heart Pendant",price:3200,category:"Pendant",image:"heart-pendant.jpg"},
  {id:14,name:"Diamond Pendant",price:11000,category:"Pendant",image:"diamond-pendant.jpg"},
  {id:15,name:"Diamond Stud Earrings",price:15000,category:"Earrings",image:"diamond-stud-earrings.jpg"},
  {id:16,name:"Silver Chain Necklace",price:3500,category:"Necklace",image:"silver-chain-necklace.jpg"},
  {id:17,name:"Platinum Ring",price:18000,category:"Ring",image:"platinum-ring.jpg"},
  {id:18,name:"Traditional Jhumka",price:2800,category:"Earrings",image:"traditional-jhumka.jpg"},
  {id:19,name:"Temple Jewellery Necklace",price:22000,category:"Necklace",image:"temple-jewellery-necklace.jpg"},
  {id:20,name:"Minimal Gold Ring",price:4500,category:"Ring",image:"minimal-gold-ring.jpg"},
  {id:21,name:"Luxury Diamond Choker",price:30000,category:"Necklace",image:"luxury-diamond-choker.jpg"},
  {id:22,name:"Crystal Drop Earrings",price:5200,category:"Earrings",image:"crystal-drop-earrings.jpg"}, 
   {id:23,name:"Diamond Nose Pin",price:2800,category:"Nose Pin",image:"diamond-nose-pin.jpg"},
  {id:24,name:"Gold Nose Pin",price:1500,category:"Nose Pin",image:"gold-nose-pin.jpg"},
  {id:25,name:"Traditional Mangalsutra",price:18000,category:"Mangalsutra",image:"traditional-mangalsutra.jpg"},
  {id:26,name:"Diamond Mangalsutra",price:35000,category:"Mangalsutra",image:"diamond-mangalsutra.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let filteredProducts = [...products];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sort");
const container = document.getElementById("wishlist-container");

function updateCounts(){
  const cartCount = document.getElementById("cart-count");
  const wishCount = document.getElementById("wishlist-count");

  if(cartCount) cartCount.innerText = "🛒 " + cart.length;
  if(wishCount) wishCount.innerText = "❤️ " + wishlist.length;
}


function displayProducts(items){
  if(!productList) return;

  productList.innerHTML = "";

  items.forEach(product=>{
    productList.innerHTML += `
      <div class="card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="addToWishlist(${product.id})">❤️</button>
      </div>
    `;
  });
}


if(searchInput){
searchInput.addEventListener("input", function(){
  const value = this.value.toLowerCase();
  filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  displayProducts(filteredProducts);
});
}


if(categoryFilter){
categoryFilter.addEventListener("change", function(){
  if(this.value === "all"){
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(p => p.category === this.value);
  }
  displayProducts(filteredProducts);
});
}


// SORT
if(sortSelect){
sortSelect.addEventListener("change", function(){
  let sorted = [...filteredProducts];

  if(this.value === "low") sorted.sort((a,b)=>a.price-b.price);
  if(this.value === "high") sorted.sort((a,b)=>b.price-a.price);

  displayProducts(sorted);
});
}



window.addToCart = function(id){
  const product = products.find(p => p.id === id);
  cart.push(product);   // FULL product object store kara
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart 🛒");
}


window.addToWishlist = function(id){
  if(!wishlist.includes(id)){
    wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCounts();
    alert("Added to Wishlist");
  }
}


// REMOVE WISHLIST
window.removeFromWishlist = function(id){
  wishlist = wishlist.filter(item=>item !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
}


const wishlistContainer = document.getElementById("wishlist-items");
if(wishlistContainer){
  if(wishlist.length === 0){
    wishlistContainer.innerHTML = "<p>Wishlist is empty 💔</p>";
  } else {
    wishlist.forEach(id=>{
      const item = products.find(p=>p.id===id);
      if(item){
        wishlistContainer.innerHTML += `
          <div class="card">
            <img src="${item.image}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="removeFromWishlist(${item.id})">Remove ❌</button>
          </div>
        `;
      }
    });
  }
}

function updateWishlistCount(){
  const wishIcon = document.getElementById("wishlist-count");
  if(wishIcon){
    wishIcon.innerText = "❤️ " + wishlist.length;
  }
}

function addToWishlist(product){
  
  const exists = wishlist.find(item => item.id === product.id);

  if(!exists){
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    alert("Added to Wishlist ❤️");
  } else {
    alert("Already in Wishlist");
  }
}

updateWishlistCount();




const cartContainer = document.getElementById("cart-items");
if(cartContainer){
  if(cart.length === 0){
    cartContainer.innerHTML = "<h3>Your cart is empty 🛒</h3>";
  } else {
    cart.forEach((item,index)=>{
      cartContainer.innerHTML += `
        <div class="card">
          <img src="${item.image}" width="150">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <button onclick="removeFromCart(${index})">Remove ❌</button>
        </div>
      `;
    });
  }
}

window.removeFromCart = function(index){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}


function updateCounts(){
  const cartCount = document.getElementById("cart-count");
  const wishCount = document.getElementById("wishlist-count");
  if(cartCount){
    cartCount.innerText = "🛒 " + cart.length;
  }
  if(wishCount){
    wishCount.innerText = "❤️ " + wishlist.length;
  }
}


const checkoutContainer = document.getElementById("checkout-items");

if(checkoutContainer){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  if(cart.length === 0){
    checkoutContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
  } else {
    cart.forEach(item=>{
      total += item.price;

      checkoutContainer.innerHTML += `
        <div class="checkout-item">
          <span>${item.name}</span>
          <span>₹${item.price}</span>
        </div>
      `;
    });
  }

  document.getElementById("total-price").innerText = "Total: ₹" + total;
}


window.goToCheckout = function(){
  window.location.href = "checkout.html";
}
window.placeOrder = function(e){
  e.preventDefault();
  alert("Order Placed Successfully 🎉");
  localStorage.removeItem("cart");
  cart = [];
  updateCounts();
  window.location.href = "index.html";
}
updateCounts();
displayProducts(products);
});
window.addEventListener("scroll", function(){
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});





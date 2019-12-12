//using  data, brands, types from data.js


//data declarations////////////////////////////////////////////////////////////////
var currentPriceFilter = 0;
var currentTypeFilter = 0;
var currentBrandFilter = 0;
var itemsToShow = [];
var shoppingCart = new Set();


//functions declarations////////////////////////////////////////////////////////////////

//load all items
function updateUI() {   
    //clear all befor update
    clearAll();

    let root = document.getElementById('shopping_root');
    let i;
    for (i = 0; i < itemsToShow.length; i++) {
        let item_index = itemsToShow[i];
        let item = data[item_index];
        let html = buildItem (item, item_index);

        var newNode = document.createElement('li');            
        newNode.innerHTML = html;
        root.appendChild(newNode);
    }

    //add click event handler for all new "Add to cart" buttons
    addClickHandlerToAddToCartButtons();
}


/*******************************************
    Build this html node and insert in the list: 
    <li>        
        <div class="body">
          <img src="img/img "></img>
          <p>brand name</p>
          <p>type</p>
          <p>CAD price</p>
        </div>
        <div class="cta"><a class="cta_btn">Add to cart</a></div>
    </li>
***********************************************/
function buildItem(item, index) {
    return "<div class=\"body\">" +
                "<img src=\"img/" + item.img + "\"></img>" +
                "<p>" + brands[item.brand] + " " + item.name + "</p>" + 
                "<p>" + types[item.type] + "</p>" +
                "<p>CAD $" +  item.price + "</p>" +
            "</div>" + 
            "<div class=\"cta\"><a class=\"cta_btn\" data_attr=\"" + index +"\">Add to cart</a></div>";
}

// remove all items
function clearAll() {
    let root = document.getElementById('shopping_root');
    root.innerHTML = "";
}


function priceChanged (radio_item) {
    let val = radio_item.value;    
    let low = 0;
    let high = 10000000;

    if (currentPriceFilter == val){
        return;
    }
    
    currentPriceFilter = val;
    if(currentPriceFilter == 1){
        //0-100
        high = 100;
    }
    else if(currentPriceFilter == 2){
        //100-200
        low= 100;
        high= 200; 
        
    }
    else if(currentPriceFilter == 3){
        //200-300
        low=200;
        high=300;
        
    }
    else if(currentPriceFilter == 4){
        //300>
        low=300;        
    }       
    
    filterbyPrice(low, high);

    //clear other filters
    document.getElementById("type_no_filter").checked = true;
    document.getElementById("brand_no_filter").checked = true;    
    currentTypeFilter = 0;
    currentBrandFilter = 0;

    //update UI
    updateUI();
}

// filter all by price
function filterbyPrice(low, high) {
    itemsToShow = [];
    for (i = 0; i < data.length; i++) {        
        let item = data[i];
        if (item.price >= low && item.price < high) {
            itemsToShow.push(i); 
        }
    }
}

function typeChanged(type_item){
    let val = type_item.value;
    if (currentTypeFilter == val){
        return;
    }    
    currentTypeFilter = val;

    filterbyType(currentTypeFilter);

    //clear other filters
    document.getElementById("price_no_filter").checked = true;
    document.getElementById("brand_no_filter").checked = true;   
    currentPriceFilter = 0;
    currentBrandFilter = 0; 

    //update UI
    updateUI();
}

// filter all by type
function filterbyType(type) {
    itemsToShow = [];
    for (i = 0; i < data.length; i++) {        
        let item = data[i];
        if (type == 0 || item.type == (type-1) ) {
            itemsToShow.push(i); 
        }
    }
}

function brandChanged (brand_item){
    let val = brand_item.value;
    if (currentBrandFilter == val){
        return;
    }    
    currentBrandFilter = val;

    filterbyBrand(currentBrandFilter);

    //clear other filters
    document.getElementById("type_no_filter").checked = true;
    document.getElementById("price_no_filter").checked = true;
    currentPriceFilter = 0;
    currentTypeFilter = 0;

    //update UI    
    updateUI();
}


// filter all by type
function filterbyBrand(brand) {
    itemsToShow = [];
    for (i = 0; i < data.length; i++) {        
        let item = data[i];
        if (brand == 0 || item.brand == (brand-1) ) {
            itemsToShow.push(i); 
        }
    }
}


function addClickHandlerToAddToCartButtons(){
    var add_to_cart_buttons = document.getElementsByClassName("cta_btn");
    for (var i = 0; i < add_to_cart_buttons.length; i++) {
        add_to_cart_buttons[i].addEventListener('click', addToCart, false);
    }    
}


function addToCart() {
    let index = this.getAttribute("data_attr");

    if(shoppingCart.has(index)){
        alert("The item is already in your shopping cart");
        return;
    }

    let brand = brands[data[index].brand];
    var msg  = "Adding to cart: " + brand + " " + data[index].name;
    alert(msg);
    shoppingCart.add(index);

    document.getElementById("cart_items_num").innerHTML = shoppingCart.size;
}


document.getElementById("cart_btn").onclick = function(){
    let store = document.getElementById("shopping_root");
    let cart = document.getElementById("shopping_cart");

    
    if (cart.style.display=='none' || cart.style.display=="" ){
        store.style.display='none';
        cart.style.display='block';
    } 
    else{        
        cart.style.display='none';
        store.style.display='grid';
    }
};


//init local data///////////////////////////////////////////////////////////////////////
for (i = 0; i < data.length; i++) {
    itemsToShow.push(i);   
}

document.getElementById("cart_items_num").innerHTML = shoppingCart.size;

//action/////////////////////////////////////////////////////////////////
//initial update
updateUI();


getData();
fetch("https://my-json-server.typicode.com/JayaKishan/jsondata/items")
.then(res => res.json())
.then(data => getData(data))


function getData(data) {
  const container = document.getElementById('itemsDisplay');
  for (i in data) {
    const card = document.createElement('article');
    const content = `
            <article>
              <img src="${data[i].image}" alt="${data[i].name}" width="100" height="300">
              <div class="text">
                <h3>${data[i].name}</h3>
                <p>${data[i].discount}%</p>
                <div class="item-details">
                  <div style="flex-grow: 3"> <strike style='color:red'><span style='color:black'>$${data[i].price.display}</span></strike></div>
                  <div style="flex-grow: 6"> $${data[i].price.actual}</div>
                  <div style="flex-grow: 3"><button type="button" name="button" class="addToClass" onclick="addToCart(this.id)" id="${data[i].price.actual},${data[i].name},${i}" >Add to cart</button></div>
                </div>
              </div>
            </article>
    `;
    container.innerHTML += content;
  }
}

function addToCart(item) {
  itemId =item.split(',')[2];
  var itemDiv = document.querySelector('[data-item="'+itemId+'"]');
  if ((itemDiv == null) == true) {
    console.log(true);
    const cardDetails = document.getElementById('cartDetails');
    const cartItems = `
          <div class="cart-items" data-item="${item.split(',')[2]}">
            <div class="delItem" onclick=delItem(${item.split(',')[2]})>X</div>
            <div style="flex-grow: 6">${item.split(',')[1]}</div>
            <div style="flex-grow: 3"><input value="1" data-price="${item.split(',')[0]}" id="${item.split(',')[2]}" min="1" class="quantity-field" type="number" oninput="priceDif(this.id)"></div>
            <div style="flex-grow: 2" id="itemValueDif${item.split(',')[2]}" class="priceForTotal">${item.split(',')[0]}</div>
          </div>
    `;
    cardDetails.innerHTML += cartItems;
  }else {
    alert('Already added to cart!')
  }
  totalPrice();
}

function delItem(itemId) {
  var itemDiv = document.querySelector('[data-item="'+itemId+'"]');
  itemDiv.remove();
  totalPrice();
}

function priceDif(value) {
  var input = document.getElementById(value);
  var actualPrice = parseInt(input.getAttribute('data-price'));
  var count = parseInt(input.value);
  var valueFromItem = document.getElementById("itemValueDif"+value)
  valueFromItem.innerHTML = actualPrice*count;
  totalPrice();
}

var totalP = [];
function totalPrice() {
  totalP = [];
  var totalPrice = document.querySelectorAll(".priceForTotal");
  const appendTP = document.querySelector('.total-value');
  if (totalPrice.length == 0) {
    appendTP.textContent = '0';
  }else {
    totalPrice.forEach(totalPrice => {
      totalP.push(parseInt(totalPrice.textContent))
      appendTP.textContent = '';
      appendTP.textContent += totalP.reduce((a, b) => a + b);
  	});
  }
}

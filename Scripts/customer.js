let cartItems = [];

let orderItems = [];

let getItems = [];
let staticProducts = [
  {
    id: 1,
    productName: "Pink Bag",
    price: 1000,
    description:
      "Long Lasting And Highly Comfortable New Ladies Handbag Pink Color Gender: Women",
    image: "https://media.istockphoto.com/id/1393144771/photo/pink-womens-stylish-bag-of-rectangular-shapes.jpg?s=612x612&w=0&k=20&c=t1To8tgeiJCC2Mt0dlGOo0tET97orvBW_C3rIhoAt3s=",
  },
  {
    id: 2,
    productName: "Brown Bag",
    price: 2000,
    description: "Tote Bag With Detachable Sling Strap",
    image: "https://media.istockphoto.com/id/1367616249/photo/leather-bag.jpg?s=612x612&w=0&k=20&c=ZFLYmFegX9LwTzGYU65gyAMDQJ6X2Qf4gCKkaq79zDI=",
  },
  {
    id: 3,
    productName: "Grey Bag",
    price: 1500,
    description: "Grey Solid Shoulder Bag",
    image: "https://media.istockphoto.com/id/1362790282/photo/womens-bag-of-grey-color-genuine-leather-grey-painted-wooden-background.jpg?s=612x612&w=0&k=20&c=CeasmmH8ziXj5gjuSaD-Rc4GmyZI5us9Y68Sm7gD11A=",
  },
  {
    id: 4,
    productName: "Purple Bag",
    price: 1000,
    description: "Reptilian Pattern Satchel Bag with Detachable Strap",
    image: "https://media.istockphoto.com/id/478992166/photo/designer-bag.jpg?s=612x612&w=0&k=20&c=8oQpzM61m1aLP4SJIJHOL4bwxsz7XW63iJschl1Df5s=",
  },
];


let productsDisplayRef = document.getElementById("productsdisplay");
let cartItemsRef = document.getElementById("cartitems");
let totalRef = document.getElementById("totalamount");
let totalquantity = 1;

window.addEventListener("load", () => {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify(orderItems));
  }
  if (!localStorage.getItem("buy")) {
    localStorage.setItem("buy", JSON.stringify(getItems));
  }
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(staticProducts));
  }
  if (location.pathname === "/E-Commerce/User/home.html") {
    ProductsLoadAction();
    CartCountAction();
  }
  if (location.pathname === "/E-Commerce/User/cart.html") {
    ViewCartProducts();
    CartCountAction();
  }
  if (location.pathname === "/E-Commerce/User/orders.html") {
    DisplayOrders();
    CartCountAction();
  }
});

const LogOutAction = () => {
  sessionStorage.removeItem("adminemail");
  sessionStorage.removeItem("adminid");
  window.location.replace("/E-Commerce/index.html");
};

const CartCountAction = () => {
  let cartItemsArr = JSON.parse(localStorage.getItem("cart"));
  let totalquantity = 0;
  let userid = sessionStorage.getItem("userid");
  for (let item of cartItemsArr) {
    if (parseInt(userid) === parseInt(item.userId))
    {
      totalquantity += parseInt(item.quantityofproduct);
    }
  }
  //console.log(totalquantity);
  document.getElementById("cartcount").innerText = `Cart-${totalquantity}`;
  if (totalquantity === 0) {
    document.getElementById("checkoutbtn").disabled = true;
  }
};

const addToCart = (productId) => {
  let quantity = prompt("Please enter the quantity:");
  let cartArr = JSON.parse(localStorage.getItem("cart"));
  let productArr = JSON.parse(localStorage.getItem("products"));
  let userid = sessionStorage.getItem("userid");
  productArr = productArr.find((x) => x.id === productId);
  if (quantity !== "") {
    if (cartArr.find((x) => x.productid === productId)) {
      cartArr.map((x) => {
        if (x.productid === productId) {
          x.quantityofproduct =
            parseInt(x.quantityofproduct) + parseInt(quantity);
          x.price =
            parseInt(x.price) + parseInt(quantity) * parseInt(productArr.price);
        }
      });
    } else {
      cartArr.push({
        userId: userid,
        orderId: getRandomNumber(),
        productid: productArr.id,
        products: productArr.productName,
        quantityofproduct: quantity,
        price: parseInt(quantity) * parseInt(productArr.price),
      });
    }
  }
  //console.log(cartArr);
  localStorage.setItem("cart", JSON.stringify(cartArr));
};

const RemoveItem = (productId) => {
  let cartArr = JSON.parse(localStorage.getItem("cart"));
  let userId = sessionStorage.getItem("userid");

  cartArr = cartArr.filter((x) => {
    if (x.id !== parseInt(userId) && x.productid !== productId) {
      return x;
    }
  });

  localStorage.setItem("cart", JSON.stringify(cartArr));
  ViewCartProducts();
};

const ViewCartProducts = () => {
  let cartItems = JSON.parse(localStorage.getItem("cart"));
  let userid = sessionStorage.getItem("userid");
  let str = "";
  let totalAmount = 0;
  for (let cart of cartItems) {
    if (parseInt(userid) === parseInt(cart.userId)) {
      str += `<tr>
      <td>${cart.products}</td>
      <td>${cart.quantityofproduct}</td>
      <td>₹ ${cart.price}</td>
      <td class="col-1">
        <div class="btn btn-outline-danger" onclick="RemoveItem(${cart.productid})">Remove</div>
      </td>
    </tr>`;
      totalAmount += parseInt(cart.price);
    }
  }
  cartItemsRef.innerHTML = str;
  totalRef.innerText = `Total Amount : ₹ ${totalAmount}`;
  //   document.getElementById("cartcount").innerText = `Cart-${totalquantity}`;
};

const DisplayOrders = () => {
  //console.log("helo");
  let orderItemsRef = document.getElementById("orderitems");
  let ordersArr = JSON.parse(localStorage.getItem("orders"));
  let getItemsArr = JSON.parse(localStorage.getItem("buy"));
  let userid = sessionStorage.getItem("userid");
  let str = "";
  console.log(ordersArr);
  for (let item of ordersArr) {
    if (parseInt(item.userId) === parseInt(userid)) {
      let val = "";
      if (item.status === "Confirmed") {
        val += `<p class="text-success">${item.status}</p>`;
      } else if(item.status === "Rejected"){
        val += `<p class="text-danger">${item.status}</p>`;
      }
      else{
        val += `<p>${item.status}</p>`;
      }
      str += `<tr>
        <td class="col">${item.orderId}</td>
        <td class="col">${item.date}</td>
        <td class="col">${item.products}</td>
        <td class="col">${item.quantityofproduct}</td>
        <td class="col">₹ ${item.price}</td>
        <td class="col" id="statustext">${val}</td>
      </tr>`;
    }
  }
  for (let item of getItemsArr) {
    if (parseInt(item.userId) === parseInt(userid)) {
      let val = "";
      if (item.status === "Confirmed") {
        val += `<p class="text-success">${item.status}</p>`;
      } else if(item.status === "Rejected"){
        val += `<p class="text-danger">${item.status}</p>`;
      }
      else{
        val += `<p>${item.status}</p>`;
      }
      str += `<tr>
        <td class="col">${item.orderId}</td>
        <td class="col">${item.date}</td>
        <td class="col">${item.products}</td>
        <td class="col">${item.quantityofproduct}</td>
        <td class="col">₹ ${item.price}</td>
        <td class="col" id="statustext">${val}</td>
      </tr>`;
    }
  }

  orderItemsRef.innerHTML = str;
};

const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

const CheckOutAction = () => {
  let ordersArr = JSON.parse(localStorage.getItem("orders"));
  let cartArr = JSON.parse(localStorage.getItem("cart"));
  let userid = sessionStorage.getItem("userid");
  for (let item of cartArr) {
    ordersArr.push({
      userId: userid,
      orderId: getRandomNumber(),
      date: new Date().toDateString(),
      products: item.products,
      quantityofproduct: item.quantityofproduct,
      price: item.price,
      status: "pending",
    });
  }
  cartArr = [];
  localStorage.setItem("orders", JSON.stringify(ordersArr));
  localStorage.setItem("cart", JSON.stringify(cartArr));
};

const BuyNow = (productId) => {
  console.log("hello");
  let quantity = prompt("Please enter the quantity:");
  let getItemsArr = JSON.parse(localStorage.getItem("buy"));
  let productArr = JSON.parse(localStorage.getItem("products"));
  let userid = sessionStorage.getItem("userid");
  productArr = productArr.find((x) => x.id === productId);
  if (quantity !== "") {
    if (getItemsArr.find((x) => x.productid === productId)) {
      getItemsArr.map((x) => {
        if (x.productid === productId) {
          x.quantityofproduct =
            parseInt(x.quantityofproduct) + parseInt(quantity);
          x.price =
            parseInt(x.price) + parseInt(quantity) * parseInt(productArr.price);
        }
      });
    } else {
      getItemsArr.push({
        userId: userid,
        orderId: getRandomNumber(),
        date: new Date().toDateString(),
        productid: productArr.id,
        products: productArr.productName,
        quantityofproduct: quantity,
        price: parseInt(quantity) * parseInt(productArr.price),
        status: "pending",
      });
    }
  }
  localStorage.setItem("buy", JSON.stringify(getItemsArr));
};
const ProductsLoadAction = () => {
  let productArr = JSON.parse(localStorage.getItem("products"));
  let str = "";
  for (let product of productArr) {
    str += `<div class="row mt-5">
        <div class="col-md-4">
          <img src=${product.image} class="img-fluid" style="width: 350px;height: 220px;" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title fs-4">${product.productName}</h5>
            <p class="card-text">
            ${product.description}
            </p>
            <p class="card-text fs-5">₹ ${product.price}</p>
            <button class="btn btn-warning w-100 mb-2" onclick="addToCart(${product.id})">Add to cart</button>
            <button class="btn btn-success w-100 mb-2" onclick="BuyNow(${product.id})">Buy now</button>
          </div>
        </div>
      </div>`;
  }
  productsDisplayRef.innerHTML = str;
  //   document.getElementById("cartcount").innerText = `Cart-${totalquantity}`;
};

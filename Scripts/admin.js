
let staticProducts = [
  {
    id: 1,
    productName: "Pink Bag",
    price: 1000,
    description:
      "Long Lasting And Highly Comfortable New Ladies Handbag Pink Color Gender: Women",
    image: "https://media.istockphoto.com/id/1393144771/photo/pink-womens-stylish-bag-of-rectangular-shapes.jpg?s=612x612&w=0&k=20&c=t1To8tgeiJCC2Mt0dlGOo0tET97orvBW_C3rIhoAt3s="
  },
  {
    id: 2,
    productName: "Brown Bag",
    price: 2000,
    description: "Tote Bag With Detachable Sling Strap",
    image: "https://media.istockphoto.com/id/1367616249/photo/leather-bag.jpg?s=612x612&w=0&k=20&c=ZFLYmFegX9LwTzGYU65gyAMDQJ6X2Qf4gCKkaq79zDI="
  },
  {
    id: 3,
    productName: "Grey Bag",
    price: 1500,
    description: "Grey Solid Shoulder Bag",
    image: "https://media.istockphoto.com/id/1362790282/photo/womens-bag-of-grey-color-genuine-leather-grey-painted-wooden-background.jpg?s=612x612&w=0&k=20&c=CeasmmH8ziXj5gjuSaD-Rc4GmyZI5us9Y68Sm7gD11A="
  },
  {
    id: 4,
    productName: "Purple Bag",
    price: 1000,
    description: "Reptilian Pattern Satchel Bag with Detachable Strap",
    image: "https://media.istockphoto.com/id/478992166/photo/designer-bag.jpg?s=612x612&w=0&k=20&c=8oQpzM61m1aLP4SJIJHOL4bwxsz7XW63iJschl1Df5s="
  },
];

const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

let ordersArr = JSON.parse(localStorage.getItem("orders"));

window.addEventListener("load", () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(staticProducts));
  }
  if (location.pathname === "/E-Commerce/Admin/home.html") {
    ProductDetilsLoad();
  }
  if (location.pathname === "/E-Commerce/Admin/orders.html") {
    OrdersPage();
  }
});

const RemoveToast = (editId=0) => {
  document.getElementById("toastmsg").innerHTML = "";
  window.location.replace("/E-Commerce/Admin/home.html");
};
const displayToast = (editId=0) => {
  // console.log("hello");
  let str = "";
  if(editId===0)
  {
    str += `<div style="width:250px;height:30px;border-radius:5px;background-color: rgb(135, 182, 135);margin-top:10px">
  <p class="text-white">Product Added Successfully!!<button type="button" class="btn-close"
    onclick="RemoveToast()"></button></p>
</div>`;
  }
  else{
    str += `<div style="width:250px;height:30px;border-radius:5px;background-color: rgb(135, 182, 135);margin-top:10px">
  <p class="text-white">Product Updated Successfully!!<button type="button" class="btn-close"
    onclick="RemoveToast()"></button></p>
</div>`;
  }
  

  document.getElementById("toastmsg").innerHTML = str;
};

const LogOutAction = () => {
  sessionStorage.removeItem("adminemail");
  sessionStorage.removeItem("adminid");
  window.location.replace("/E-Commerce/index.html");
};

let productDetailsRef = document.getElementById("productdetails");
let addProductNameRef = document.getElementById("addproductname");
let addProductPriceRef = document.getElementById("addproductprice");
let addProductQuantityRef = document.getElementById("addproductquantity");
let addProductDescriptionRef = document.getElementById("addproductdescription");
let addProductUrlRef = document.getElementById("addproducturl");
let addProductBtnRef = document.getElementById("addproductbtn");
let errorRef = document.getElementById("errorref");
let successMsgRef = document.getElementById("successmsg");

const AddProducts = () => {
  if (
    addProductNameRef.value != "" &&
    addProductPriceRef.value != "" &&
    addProductDescriptionRef.value != "" &&
    addProductUrlRef.value != ""
  ) {
    let productArr = JSON.parse(localStorage.getItem("products"));
    productArr.push({
      id: getRandomNumber(),
      productName: addProductNameRef.value,
      price: parseInt(addProductPriceRef.value),
      description: addProductDescriptionRef.value,
      image: addProductUrlRef.value,
    });

    localStorage.setItem("products", JSON.stringify(productArr));
    displayToast();
    
  } else {
    errorRef.innerText = "Please fill all the fields!";
  }
};

const editProducts = (editId) => {
  let editProductsDataRef = document.getElementById("editproductsdata");
  let productArr = JSON.parse(localStorage.getItem("products"));
  let str = "";
  for (let product of productArr) {
    if (product.id === editId) {
      str = `<div class="card-body py-5 px-md-5">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <h3 class="mb-5">Edit Product</h3>
          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example3">Name</label>
            <input
              type="text"
              id="editproductname"
              class="form-control"
              placeholder="Enter name of the product"
              value="${product.productName}"
            />
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example3">Price</label>
            <input
              type="text"
              id="editproductprice"
              class="form-control"
              placeholder="Enter price of the product"
              value=${product.price}
            />
          </div>
    
          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4"
              >Description</label
            >
            <textarea
              class="form-control"
              type="text"
              id="editproductdescription"
              placeholder="Enter description"
            >${product.description}</textarea>
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4">Image</label>
            <input
              type="url"
              id="editproducturl"
              class="form-control"
              placeholder="Enter image url"
              value=${product.image}
            />
          </div>
    
          <p id="errorref" class="text-danger"></p>
          <!-- Submit button -->
          <button
            type="submit"
            class="btn btn-primary btn-block mb-4"
            onclick="EditProductsData(${editId})"
          >
            Edit
          </button>
          <div id="toastmsg"></div>
        </div>
      </div>
    </div>`;
    }
    editProductsDataRef.innerHTML = str;
    
    // console.log(editId);
  }
};

const EditProductsData = (editId) => {
  let productArr = JSON.parse(localStorage.getItem("products"));
  let editProductNameRef = document.getElementById("editproductname");
  let editProductPriceRef = document.getElementById("editproductprice");
  let editProductDescriptionRef = document.getElementById(
    "editproductdescription"
  );
  let editProductUrlRef = document.getElementById("editproducturl");

  for (let product of productArr) {
    if (product.id == editId) {
      product.productName = editProductNameRef.value;
      product.price = editProductPriceRef.value;
      product.description = editProductDescriptionRef.value;
      product.image = editProductUrlRef.value;
    }
  }

  // console.log(productArr);
  localStorage.setItem("products", JSON.stringify(productArr));
  displayToast(editId);
  // ProductDetilsLoad();
};

const deleteProducts = (deleteId) => {
  console.log("Hello");
  let productArr = JSON.parse(localStorage.getItem("products"));
  productArr = productArr.filter((x) => {
    if (x.id !== deleteId) {
      return x;
    }
  });

  localStorage.setItem("products", JSON.stringify(productArr));
  ProductDetilsLoad();
};

const ApproveOrder = (orderid) => {
  console.log(orderid);
  let orderArr = JSON.parse(localStorage.getItem("orders"));
  let getItemsArr = JSON.parse(localStorage.getItem("buy"));
  let approveBtnRef = document.getElementById("approvebtn");
  let rejectBtnRef = document.getElementById("rejectbtn");
  let orderStatusMsgRef = document.getElementById("orderstatusmsg");
  for (let item of orderArr) {
    if (item.orderId === orderid) {
      item.status = "Confirmed";
    }
  }
  for (let item of getItemsArr) {
    if (item.orderId === orderid) {
      item.status = "Confirmed";
    }
  }
  approveBtnRef.disabled = true;
  rejectBtnRef.disabled = true;
  // orderStatusMsgRef.innerText = "Approved";
  localStorage.setItem("orders", JSON.stringify(orderArr));
  localStorage.setItem("buy", JSON.stringify(getItemsArr));
};

const RejectOrder = (orderid) => {
  console.log(orderid);
  let orderArr = JSON.parse(localStorage.getItem("orders"));
  let getItemsArr = JSON.parse(localStorage.getItem("buy"));
  let approveBtnRef = document.getElementById("approvebtn");
  let rejectBtnRef = document.getElementById("rejectbtn");
  let orderStatusMsgRef = document.getElementById("orderstatusmsg");
  for (let item of orderArr) {
    if (item.orderId === orderid) {
      item.status = "Rejected";
    }
  }
  for (let item of getItemsArr) {
    if (item.orderId === orderid) {
      item.status = "Rejected";
    }
  }
  approveBtnRef.disabled = true;
  rejectBtnRef.disabled = true;
  // orderStatusMsgRef.innerText = "Approved";
  localStorage.setItem("orders", JSON.stringify(orderArr));
  localStorage.setItem("buy", JSON.stringify(getItemsArr));
};

const OrdersPage = () => {
  console.log("Hello");
  let ordersArr = JSON.parse(localStorage.getItem("orders"));
  let getItemsArr = JSON.parse(localStorage.getItem("buy"));
  let usersDataArr = JSON.parse(localStorage.getItem("users"));
  let str = "";
  let ordersPlacedPageRef = document.getElementById("ordersplacedpage");
  for (let order of ordersArr) {
    const useremail = usersDataArr.find(
      (x) => parseInt(x.id) === parseInt(order.userId)
    );
    //console.log(useremail.email);
    let val = "";
    if (order.status === "pending") {
      val += ` <div class="container d-flex">
      <p id="orderstatusmsg"></p>
      <div class="btn btn-outline-primary me-2" id="approvebtn" onclick="ApproveOrder(${order.orderId})">Approve</div>
      <div class="btn btn-outline-danger" id="rejectbtn" onclick="RejectOrder(${order.orderId})">Reject</div>
    </div>`;
    } else if (order.status === "Rejected") {
      val += `<p class="text-danger">${order.status}</p>`;
    } else {
      val += `<p class="text-success">${order.status}</p>`;
    }

    str += `<tr>
    <td>${order.orderId}</td>
    <td>${useremail.email}</td>
    <td>${order.date}</td>
    <td>${order.products}</td>
    <td>${order.quantityofproduct}</td>
    <td>₹ ${order.price}</td>
    <td class="col-1"> 
    ${val}
    </td>
    </tr>`;
  }
  for (let order of getItemsArr) {
    const useremail = usersDataArr.find(
      (x) => parseInt(x.id) === parseInt(order.userId)
    );
    let val = "";
    if (order.status === "pending") {
      val += ` <div class="container d-flex">
      <p id="orderstatusmsg"></p>
      <div class="btn btn-outline-primary me-2" id="approvebtn" onclick="ApproveOrder(${order.orderId})">Approve</div>
      <div class="btn btn-outline-danger" id="rejectbtn" onclick="RejectOrder(${order.orderId})">Reject</div>
    </div>`;
    } else if (order.status === "Rejected") {
      val += `<p class="text-danger">${order.status}</p>`;
    } else {
      val += `<p class="text-success">${order.status}</p>`;
    }

    str += `<tr>
    <td>${order.orderId}</td>
    <td>${useremail.email}</td>
    <td>${order.date}</td>
    <td>${order.products}</td>
    <td>${order.quantityofproduct}</td>
    <td>₹ ${order.price}</td>
    <td class="col-1"> 
    ${val}
    </td>
    </tr>`;
  }
  ordersPlacedPageRef.innerHTML = str;
};

const ProductDetilsLoad = () => {
  let str = "";
  let productArr = JSON.parse(localStorage.getItem("products"));

  for (let product of productArr) {
    str += `<tr>
        <td class="col-2"><img src="${product.image}" alt="" style="width: 100px;height: 100px;"></td>
        <td class="col-2">${product.productName}</td>
        <td class="col-4">${product.description}</td>
        <td class="col-2">₹${product.price}</td>
        <td class="col-1">
          <div class="btn btn-outline-primary" onclick="editProducts(${product.id})">Edit</div>
        </td>
        <td class="col-1">
          <div class="btn btn-outline-danger" onclick="deleteProducts(${product.id})">Remove</div>
        </td>
      </tr>
      <p id="new"></p>`;
  }
  productDetailsRef.innerHTML = str;
};

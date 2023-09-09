const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

//Show sidebar menu
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

//Close sidebar menu

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

//change theme

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  // Toggle the 'active' class on both span elements
  const spans = themeToggler.querySelectorAll("span");
  spans.forEach((span) => {
    span.classList.toggle("active");
  });
});

// my function

let Orders = [];

let myForm = document.querySelector(".myForm");
let productName = document.querySelector(".productName");
let productQuantity = document.querySelector(".productQuantity");
let price = document.querySelector(".price");
// let uniqueId = document.querySelector(".uniqueId");

myForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let data = JSON.parse(localStorage.getItem("Orders")) || [];
  if (productName.value == "" || productQuantity.value == "" || price.value == "") {
    alert('Please enter valid product details!!');
    return null;
  }

  var alreadyPresent = data.find(
    (product) =>
      product.productName === productName.value && product.price === price.value
  );

  const productQuantityValue = parseFloat(alreadyPresent?.productQuantity);
  const quantityToAdd = parseFloat(productQuantity.value);

  if (alreadyPresent) {
    alreadyPresent.productQuantity = (
      productQuantityValue + quantityToAdd
    ).toString();

    localStorage.setItem("Orders", JSON.stringify(data));
    showProduct(data);
  }
  else {
    let id = data[Object(data).length - 1]?.uniqueId || 0;

    let newProduct = {
      uniqueId: id + 1,
      productName: productName.value,
      productQuantity: productQuantity.value,
      price: price.value,
    };

    let productData = JSON.parse(localStorage.getItem("Orders")) || [];
    productData.push(newProduct);
    localStorage.setItem("Orders", JSON.stringify(productData));
    showProduct(productData);
  }
  productName.value = "";
  productQuantity.value = "";
  price.value = "";
});

let tableList = document.querySelector("table tbody");

let productJsonData = JSON.parse(localStorage.getItem("Orders")) || [];

function showProduct(productData) {
  tableList.innerHTML = "";
  for (let i = 0; i < productData.length; i++) {
    let order = productData[i];
    let tr = document.createElement("tr");
    tr.classList.add("trElement");
    tr.setAttribute("id", order.uniqueId);
    tr.innerHTML = `
        <td>${order.uniqueId}</td>
        <td>${order.productName}</td>
        <td>${order.productQuantity}</td>
        <td>${order.price}</td>
        <td class="primary" onclick="popup(${order.uniqueId})">Delete</td>
        `;
    document.querySelector("table tbody").appendChild(tr);
  }
}

showProduct(productJsonData);

function popup(idToDelete) {
  var popup = document.getElementById("popup");

  if (popup.style.display == "none") {
    popup.style.display = "flex";
    popup.innerHTML = `<div class="content">
            <div class="popup-top">
                <h2>
                    Delete Product
                </h2>
                <h2 class="popClose" onclick="popup()">
                    X
                </h2>
            </div>
            <div class="deleteContent">
                <h3>
                    Enter quantity of product that you want to delete?
                </h3>
                <input type="number" id="qty">
                <button type="button" onclick="updateButton(${idToDelete})">Update</button>
            </div>`;
  } else {
    popup.style.display = "none";
  }
}
function updateButton(idToDelete) {
  var qty = document.getElementById("qty");
  var value = qty.value || "";
  deleteEle(idToDelete, value);
  popup();
}
function deleteEle(count, value) {
  const trDelElement = document.getElementById(count);
  if (value <= 0) {
    alert("Please enter valid Quantity!!");
    return null;
  }
  if (trDelElement) {
    var tdElements = trDelElement.getElementsByTagName("td");
    var firstTd = tdElements[0];
    var thirdTd = tdElements[2];
    const currentThirdTdValue = parseFloat(thirdTd.textContent);
    if (!isNaN(currentThirdTdValue)) {
      var newThirdTdValue = currentThirdTdValue - value;
      if (newThirdTdValue <= 0) {
        trDelElement.remove();
      } else {
        thirdTd.textContent = newThirdTdValue;
      }
      let productData = JSON.parse(localStorage.getItem("Orders")) || [];
      console.log("p", productData);
      var orderToUpdate = productData.find(
        (order) => order.uniqueId == firstTd.textContent
      );
      console.log(orderToUpdate);
      if (orderToUpdate) {
        if (newThirdTdValue <= 0) {
          productData.splice(firstTd.textContent - 1, 1);
        } else {
          orderToUpdate.productQuantity = newThirdTdValue;
        }
        localStorage.setItem("Orders", JSON.stringify(productData));
      }
      showProduct(JSON.parse(localStorage.getItem("Orders")) || []);
    }
  }
}
// toggle form

const addProductLink = document.getElementById("addProductLink");
const formDiv = document.querySelector(".form");
const dashboard = document.getElementById("dashboard");
addProductLink.addEventListener("click", function (event) {
  event.preventDefault();

  if (formDiv.style.display === "none" || formDiv.style.display === "") {
    addProductLink.classList.add("active");
    dashboard.classList.remove('active');
    formDiv.style.display = "block";
  }
});

dashboard.addEventListener("click", function (event) {
  event.preventDefault();

  if (formDiv.style.display === "block") {
    addProductLink.classList.remove('active');
    dashboard.classList.add('active');
    formDiv.style.display = 'none';
  }
})
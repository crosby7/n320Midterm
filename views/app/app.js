// import invoiceGenerator
import Invoice from "../app/invoiceGenerator.js";

let cart = [];
let cartCount = 0;

// initialize the cart display
document.getElementById("cartDisplay").innerText = cartCount;

// item definitions
let shirt = {
  name: "Custom Branded Shirts (10/order)",
  quantity: 0,
  price: document.getElementById("shirt").getAttribute("data-price"),
};
let pencil = {
  name: "Custom Pencils (200/order)",
  quantity: 0,
  price: document.getElementById("pencils").getAttribute("data-price"),
};
let mousepad = {
  name: "Custom Mousepads (30/order)",
  quantity: 0,
  price: document.getElementById("mousepads").getAttribute("data-price"),
};

// button click handlers
document.getElementById("shirt").addEventListener("click", function () {
  shirt.quantity++;
  cartCount++;
  document.getElementById("cartDisplay").innerText = cartCount;

  // now that at least one item is added, an invoice can be made -- show the button
  document.getElementById("displayInvoice").style.display = "block";
});
document.getElementById("pencils").addEventListener("click", function () {
  pencil.quantity++;
  cartCount++;
  document.getElementById("cartDisplay").innerText = cartCount;

  // now that at least one item is added, an invoice can be made -- show the button
  document.getElementById("displayInvoice").style.display = "block";
});
document.getElementById("mousepads").addEventListener("click", function () {
  mousepad.quantity++;
  cartCount++;
  document.getElementById("cartDisplay").innerText = cartCount;

  // now that at least one item is added, an invoice can be made -- show the button
  document.getElementById("displayInvoice").style.display = "block";
});

// checkout handler
document
  .getElementById("displayInvoice")
  .addEventListener("click", function () {
    // reset the cart
    cart = [];

    // add items to cart if they have a quantity
    if (shirt.quantity > 0) {
      cart.push(shirt);
    }
    if (pencil.quantity > 0) {
      cart.push(pencil);
    }
    if (mousepad.quantity > 0) {
      cart.push(mousepad);
    }

    // if user info is not set, terminate function
    if (!document.getElementById("email").value) {
      alert("Please enter your email address!");
      return;
    } else if (!document.getElementById("name").value) {
      alert("Please enter your name!");
      return;
    }

    // get user info
    let userEmail = document.getElementById("email").value;
    let userName = document.getElementById("name").value;

    // show the hidden invoice controls
    document.getElementById("downloadPdf").style.display = "block";
    document.getElementById("pdfPreviewer").style.display = "block";

    // create and populate the invoice
    let invoice = new Invoice(cart);
    invoice.addCompanyHeader("Cameron's Customs");
    invoice.addInvoiceDetails(
      "Order #" + Math.floor(Math.random() * 100000000)
    );
    invoice.shippingTo(userEmail, userName);
    invoice.addOrderedProducts();
    invoice.printTotal();

    // display invoice
    document.getElementById("pdf-preview").src = invoice.getPdfUrl();

    document
      .getElementById("downloadPdf")
      .addEventListener("click", function () {
        invoice.downloadPdf();
      });

    // reset item quantities and displays (if the user wants to place another order)
    shirt.quantity = 0;
    pencil.quantity = 0;
    mousepad.quantity = 0;
    cartCount = 0;
    document.getElementById("cartDisplay").innerText = cartCount;
  });

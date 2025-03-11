# Midterm N320

This project includes:

- Node Server
- WebFile class that simplifies resource acquisition
- nodemon for easier development
- mime-types (npm package) for easier mime-type determination

The more important aspect of the project is:

## Invoice Generation

The shop page includes:

- Table of available products and price
  - Button to add to cart
- Inputs for email and name
- Button to generate invoice
  - Button is hidden until there is at least 1 item in cart
- CartDisplay counter to show number of items

* Pdf Download Button and Pdf Preview Area
  - Both are hidden until an invoice is actually generated

Worth noting:

- The pdf will not generate without an email and name. Instead, app.js will send an alert without clearing your cart.
- When you click "Get Invoice", your cart is passed to the Invoice object, and then it is cleared from js. This way, a user can theoretically make 2 orders without leaving the page.

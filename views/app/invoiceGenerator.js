import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

class Invoice {
  pdfDoc;
  position = {
    x: 10,
    y: 20,
  };
  margin = {
    x: 10,
    y: 20,
  };
  domRef = "";
  items = [];

  defaultFontSize = 12;
  defaultFontColor = "#000000";

  constructor(items) {
    this.pdfDoc = new jsPDF();
    this.items = items;
  }

  downloadPdf() {
    this.pdfDoc.save("invoice.pdf");
  }

  getPdfUrl() {
    return this.pdfDoc.output("bloburl");
  }

  addCompanyHeader(text, color = "#000000") {
    this.pdfDoc.setTextColor(color);
    this.pdfDoc.setFontSize(24);
    this.pdfDoc.setFont("times", "bold");
    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.position.y += 12;

    // reset font
    this.pdfDoc.setTextColor(this.defaultFontColor);
    this.pdfDoc.setFontSize(this.defaultFontSize);
    this.pdfDoc.setFont("times", "normal");
  }

  addInvoiceDetails(text, color = "#000000") {
    this.pdfDoc.setTextColor(color);
    this.pdfDoc.setFontSize(18);
    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.position.y += 9;
    this.pdfDoc.text(
      "Ordered on: " + new Date().toDateString(),
      this.position.x,
      this.position.y
    );
    this.position.y += 9;

    // reset font
    this.pdfDoc.setTextColor(this.defaultFontColor);
    this.pdfDoc.setFontSize(this.defaultFontSize);
  }

  shippingTo(email, name, color = "#000000") {
    this.pdfDoc.setTextColor(color);
    this.pdfDoc.setFontSize(14);

    this.pdfDoc.text("Shipping to:", this.position.x, this.position.y);
    this.position.y += 7;
    this.pdfDoc.setFontSize(this.defaultFontSize);
    this.pdfDoc.text(name, this.position.x + 4, this.position.y);
    this.position.y += 7;
    this.pdfDoc.text(email, this.position.x + 4, this.position.y);
    this.position.y += 7;
  }

  addOrderedProducts() {
    // add space before the table starts
    this.position.y += 10;

    // create table format
    this.pdfDoc.rect(
      this.position.x,
      this.position.y,
      140,
      this.items.length * 9
    );
    this.pdfDoc.rect(80, this.position.y, 40, this.items.length * 9);
    this.pdfDoc.line(
      105,
      this.position.y,
      105,
      this.position.y + this.items.length * 9
    );

    // header row
    this.pdfDoc.setFont("times", "bold");
    this.pdfDoc.text("Item Name", 12, this.position.y - 2);
    this.pdfDoc.text("Price", 85, this.position.y - 2);
    this.pdfDoc.text("Quantity", 104, this.position.y - 2);
    this.pdfDoc.text("Total Price", 125, this.position.y - 2);
    this.pdfDoc.setFont("times", "normal");

    // item rows
    for (let i = 0; i < this.items.length; i++) {
      this.position.y += 8;
      this.pdfDoc.text(this.items[i].name, 12, this.position.y);
      this.pdfDoc.text("$" + this.items[i].price, 85, this.position.y);
      this.pdfDoc.text(`${this.items[i].quantity}`, 110, this.position.y);
      this.pdfDoc.text(
        "$" + (this.items[i].price * this.items[i].quantity).toFixed(2),
        125,
        this.position.y
      );

      // unless its the last row, draw a row divider
      if (i !== this.items.length - 1) {
        this.pdfDoc.line(
          this.position.x,
          this.position.y + 2,
          this.position.x + 140,
          this.position.y + 2
        );
      }
    }
  }

  printTotal() {
    let tax = 0;
    let total = 0;

    // calc tax
    for (let i = 0; i < this.items.length; i++) {
      tax += 0.07 * this.items[i].price * this.items[i].quantity;
      total += this.items[i].price * this.items[i].quantity + tax;
    }

    this.position.y += 20;
    this.pdfDoc.text(
      "Tax: $" + tax.toFixed(2),
      this.position.x,
      this.position.y
    );
    this.position.y += 6;
    this.pdfDoc.text(
      "Total: $" + total.toFixed(2),
      this.position.x,
      this.position.y
    );
  }
}

export default Invoice;

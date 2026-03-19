const cds = require("@sap/cds");
class CatalogService extends cds.ApplicationService {
  async init() {
    const { Books } = this.entities;

    this.after("READ", "Books", (results) =>
      results.forEach((book) => {
        if (book.stock > 111) book.title += ` -- 11% discount!`;
      }),
    );

    this.on("submitOrder", async (req) => {
      console.log("here");
      let { book: id, quantity } = req.data;
      let affected = await UPDATE(Books, id).with`stock = stock - ${quantity}`
        .where`stock >= ${quantity}`;
      if (!affected) req.error`${quantity} exceeds stock for book #${id}`;
    });

    return super.init();
  }
}

module.exports = { CatalogService };

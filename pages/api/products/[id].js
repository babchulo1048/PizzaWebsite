// import dbConnect from "../../../util/mongo";
import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  //   const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    // if (!token || token !== process.env.token) {
    //   return res.status(401).json("Not authenticated!");
    // }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  if (method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

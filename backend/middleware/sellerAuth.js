import jwt from "jsonwebtoken";

const sellerAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.SELLER_EMAIL + process.env.SELLER_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized Login again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default sellerAuth;
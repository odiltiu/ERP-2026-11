import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Avtorizatsiyadan o'tilmagan, token mavjud emas",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "najot_talim_secret_key_2026"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Yaroqsiz token yoki muddati tugagan",
    });
  }
};

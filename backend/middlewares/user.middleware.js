import jwt from "jsonwebtoken";

// user auth middleware
const authUser = async (req, res, next) => {
  try {

    const {token} = req.headers;
    console.log(token);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized User",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // from the decoded token we can get the email and password
    // and then we can check if they match the admin email and password
    // to make sure that the user is an admin
    req.body.userId = decoded.id;

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { authUser }
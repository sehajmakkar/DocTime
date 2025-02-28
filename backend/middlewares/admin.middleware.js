import jwt from "jsonwebtoken";

// admin auth middleware
const authAdmin = async (req, res, next) => {
  try {

    const {atoken} = req.headers;
    if (!atoken) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    
    // from the decoded token we can get the email and password
    // and then we can check if they match the admin email and password
    // to make sure that the user is an admin
    if(decoded !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized",
      });
    }

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { authAdmin }
import jwt from "jsonwebtoken";

// doctor auth middleware
const authDoctor = async (req, res, next) => {
  try {

    const dToken = req.headers.dtoken || req.headers['dtoken'] || req.headers.authorization;
    console.log(dToken);
    if (!dToken) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized User",
      });
    }

    const decoded = jwt.verify(dToken, process.env.JWT_SECRET);
    
    // from the decoded token we can get the email and password
    // and then we can check if they match the admin email and password
    // to make sure that the user is an admin
    req.body.docId = decoded.id;

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { authDoctor }
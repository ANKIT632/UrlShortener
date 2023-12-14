const { getUser } = require("../service/auth");


async function restrictToLoggedinUserOnly(req, res, next) {
  // for use in mobile application.
  const userUid = req.headers["authorization"];

  if (!userUid) return res.redirect("/login");

  
  const token=userUid.split('Bearer ')[1];  // [ " " , "token_value"]

  const user = getUser(token);


  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
     // for use in mobile application.
  const userUid = req.headers["authorization"];
  //Bearer means we use token based authorization
  const token=userUid?.split('Bearer ')[1];  // [ " " , "token_value"]

  const user = getUser(token);
  req.user = user;
  next(); 
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};

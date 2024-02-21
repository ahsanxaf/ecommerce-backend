const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDVjYTc0MDgxZmRlMDA3N2Q4MzEwZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA4NTEyMjY5fQ.12gue0Udp6BzL3BLp02h1eSZa82H6pGjhGokt2Gu5UQ"
  return token;

};

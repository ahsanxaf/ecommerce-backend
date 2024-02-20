const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  // if (req && req.cookies) {
  //   token = req.cookies['jwt'];
  // }
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDFjODE3Y2E3Njg3N2U5MDQwNzI2ZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA4NDMwMTY2fQ.wyLLkF4eFv3BkMzMYLb5akx65S0Tja_cGoj8HmGKk_E"
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDQ3ZmFiNjAxNWY2M2MxNWI4OTRlOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwODQzMTEyN30.z1Nn9qzt9ElkFflpmoR_qbCpaDQRpj1vdbqReB7zsNM"
  return token;

};

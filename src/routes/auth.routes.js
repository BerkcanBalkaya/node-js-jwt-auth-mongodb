import verifySignUp from "../middleware/index.js";
import * as controller from "../controllers/auth.controller.js";
// const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");
// module.exports = function (app)
export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
}
//TODO: Şu an app.post içerisindeki metotlarda callback metot bekliyordum ama sen bana object Undefined gönderiyorsun hatası alıyoruz yüksek ihtimal importlarla alakalı bir düzenleme gerekiyor.

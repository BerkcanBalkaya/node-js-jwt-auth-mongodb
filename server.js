const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const { count } = require("./app/models/role.model");
const app = express();
const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Başarılı bir şekilde MongoDB ile bağlantı gerçekleştirildi");
    initial();
  })
  .catch((err) => {
    console.log("Bağlantı hatası", err);
    process.exit();
  });
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to berkcan's application",
  });
});
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("Hata", err);
        }
        console.log("'user' rolü kolleksiyona eklendi.");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("Hata", err);
        }
        console.log("'moderator' rolü kolleksiyona eklendi.");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("Hata", err);
        }
        console.log("'admin' rolü kolleksiyona eklendi.");
      });
    }
  });
}

//TODO: Test etme aşamasında en son kullanıcıya özel get işlemi kısmen başarılı olmuştu (Sorular kısmında 8'e bak). Buradan test işlemlerine devam edilecek

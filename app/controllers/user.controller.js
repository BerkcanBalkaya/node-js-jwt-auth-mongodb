exports.allAccess = (req, res) => {
  res.status(200).send("Genel erişim");
};
exports.userBoard = (req, res) => {
  res.status(200).send("Kullanıcı erişimi");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin erişimi");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderatör erişimi");
};

export const allAccess = (req, res) => {
  res.status(200).send("Genel erişim");
};
export const userBoard = (req, res) => {
  res.status(200).send("Kullanıcı erişimi");
};
export const adminBoard = (req, res) => {
  res.status(200).send("Admin erişimi");
};
export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderatör erişimi");
};

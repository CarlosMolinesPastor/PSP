const fs = require("fs");

const lectura = (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
};
fs.readFile("./prueba.txt", lectura);

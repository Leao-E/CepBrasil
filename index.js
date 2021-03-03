const csvToSql = require('./src/csv-to-sql.js');
const path = require('path');

const inputPaths = {
   acre: [
      path.resolve('assets/data/acre/ac_1.csv'),
      path.resolve('assets/data/acre/ac_2.csv'),
      path.resolve('assets/data/acre/ac_3.csv'),
      path.resolve('assets/data/acre/ac_4.csv'),
      path.resolve('assets/data/acre/ac_5.csv'),
   ]
}

const outputPath = path.resolve('teste.sql');
csvToSql.call(inputPaths.acre[0], outputPath, rec => {
   const [cep, logradouro, complemento, bairro, idCidade, idEstado] = rec;
   return `("${cep}", "${logradouro}", "${complemento}", "${bairro}", ${Number.parseInt(idCidade)}, ${Number.parseInt(idEstado)}),\n`;
});
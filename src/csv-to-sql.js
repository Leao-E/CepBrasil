const parse = require('csv-parse');
const fs = require('fs');

async function makeSqlInsertData(inputFile, outputFile, appendCallback = rec => rec){
   const parser = fs.createReadStream(inputFile).pipe(parse({
      delimiter: ",",
      trim: true
   }));
   for await (const record of parser) {
      fs.appendFileSync(outputFile, appendCallback(record));
   }
}

function makeSqlInsertQuery(outputFile, dbName){
   const sqlQuery = `INSERT INTO ${dbName}\n(cep, logradouro, complemento, bairro, id_cidade, id_estado)\nVALUES\n`;

   fs.appendFileSync(outputFile, sqlQuery);
}

function build (inputFiles, outputFile, dbName){
   makeSqlInsertQuery(outputFile, dbName);

   inputFiles.forEach(inputFile => makeSqlInsertData(inputFile, outputFile, rec => {
      const [cep, logradouro, complemento, bairro, idCidade, idEstado] = rec;
      return `("${cep}", "${logradouro}", "${complemento}", "${bairro}", ${Number.parseInt(idCidade)}, ${Number.parseInt(idEstado)}),\n`;
   }));

}


exports.build = build;
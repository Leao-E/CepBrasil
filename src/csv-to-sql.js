const parse = require('csv-parse');
const fs = require('fs');

async function call(inputFile, outputFile, appendCallback = rec => rec){
   const parser = fs.createReadStream(inputFile).pipe(parse({
      delimiter: ",",
      trim: true
   }));
   for await (const record of parser) {
      fs.appendFile(outputFile, appendCallback(record), err => {
         if (err) throw err;
         console.log(`error appending to file: ${outputFile}; data: ${record}`);
      });
   }
}

exports.call = call;
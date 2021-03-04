const CsvToSql = require('./src/csv-to-sql.js');
const process = require('process');
const path = require('path');

const stateInitial = new Map([
   ['acre', 'ac'],
   ['alagoas', 'al'],
   ['amapa', 'ap'],
   ['amazonas', 'am'],
   ['bahia', 'ba'],
   ['ceara', 'ce'],
   ['distrito_federal', 'df'],
   ['espirito_santo', 'es'],
   ['goias', 'go'],
   ['mato_grosso', 'mt'],
   ['mato_grosso_do_sul', 'ms'],
   ['minas_gerais', 'mg'],
   ['para', 'pa'],
   ['paraiba', 'pb'],
   ['pernambuco', 'pe'],
   ['piaui', 'pi'],
   ['rio_grande_do_sul', 'rs'],
   ['rondonia', 'ro'],
   ['santa_catarina', 'sc'],
   ['sao_paulo', 'sp'],
   ['sergipe', 'se'],
]);

function start(state, outputFile, dbName) {
   const outputPath = path.resolve(`result/${outputFile ? outputFile : state}.sql`);

   const inputPaths = [
      path.resolve(`assets/data/${state}/${stateInitial.get(state)}_1.csv`),
      path.resolve(`assets/data/${state}/${stateInitial.get(state)}_2.csv`),
      path.resolve(`assets/data/${state}/${stateInitial.get(state)}_3.csv`),
      path.resolve(`assets/data/${state}/${stateInitial.get(state)}_4.csv`),
      path.resolve(`assets/data/${state}/${stateInitial.get(state)}_5.csv`),
   ]

   CsvToSql.build(inputPaths, outputPath, dbName ? dbName : 'states_cep');
}

const getArg = argName => {
   const rgxMatch = new RegExp(`--${argName}=.*`);
   const rgxReplace = new RegExp(`--${argName}=`);

   const value = process.argv.find(str => str.match(rgxMatch));
   return value ? value.replace(rgxReplace, '') : false;
}

const state = getArg('state');
const outputFile = getArg('outputFile');
const dbName = getArg('dbName');

start(state, outputFile, dbName);
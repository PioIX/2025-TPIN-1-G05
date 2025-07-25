﻿//Sección MySQL del código
const mySql = require("mysql2/promise");

/**
 * Objeto con la configuración de la base de datos MySQL a utilizar.
 */


const SQL_CONFIGURATION_DATA =
{
	host: process.env.MYSQL_HOST ||"10.1.5.205" ,
	user: process.env.MYSQL_USERNAME || "2025-5INF-G05" ,
	password: process.env.MYSQL_PASSWORD || "houses", 
	database: process.env.MYSQL_DB || "2025-5INF-G05",	
	port: 3306,
	charset: 'UTF8_GENERAL_CI'
}

/**
 * Realiza una query a la base de datos MySQL indicada en el archivo "mysql.js".
 * @param {String} queryString Query que se desea realizar. Textual como se utilizaría en el MySQL Workbench.
 * @returns Respuesta de la base de datos. Suele ser un vector de objetos.
 */
exports.realizarQuery = async function (queryString)
{
	let returnObject;
	let connection;
	try
	{
		connection = await mySql.createConnection(SQL_CONFIGURATION_DATA);
		returnObject = await connection.execute(queryString);
	}
	catch(err)
	{
		console.log(err);
	}
	finally
	{
		if(connection && connection.end) connection.end();
	}
	return returnObject[0];
}
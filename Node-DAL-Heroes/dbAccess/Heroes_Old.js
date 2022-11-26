//const express = require('express');
//const hero = express();
//const PORT = 3000;

/*
hero.get('/', function (req, res) {
  res.send('Hello World!');
});
hero.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);*/

const express = require('express');
const hero = express();
const port = 3000;

// First Of All run command - npm i express pg
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PgDB',
  password: 'anil',
  port: 5432,
});

hero.get('/', function (req, res) {
  res.send('Hi Hello!');
});

hero.listen(port, (error) =>{
  if(!error)
      console.log("Server is Successfully Running, and App is listening on port "+ port)
  else 
      console.log("Error occurred, server can't start", error);
  }
);

const getHeroes = (request, response) => {
    pool.query('SELECT "Id" as id, "Name" as name FROM "Heroes" order by "Id" ASC;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getHeroById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT "Id" as id, "Name" as name FROM "Heroes" where "Id"=$1;`, [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rowCount > 0 ? results.rows[0] : {id:number=0, name:string=''})
    })
  }

    const updateHero=(request, response) => {
    const { id, name }=request.body;

    pool.query('UPDATE "Heroes" SET "Name"=$2 WHERE "Id"=$1;', [id, name], (error, results) => {
    if(error){
      throw error
    }
     response.status(200).json(`A hero updated with id: ${id}`);
   })
  }

  const addHero=(request, response) => {
    const { name } = request.body;

    pool.query('INSERT INTO "Heroes"("Name") VALUES ($1);', [name], (error, results) => {
      if(error){
        throw error;
      }
      response.status(201).json(`New hero added with name: ${name}`);
    }
    )
  }

  const deleteHero=(request,response) => {
    let id = parseInt(request.params.id);
    pool.query('DELETE FROM "Heroes" WHERE "Id"=$1;', [id], (error, results) => {
      if(error){
        throw error;
      }
      response.status(200).json(`A hero deleted with Id: ${id}`)
    })
  }

  const searchHero=(request, response) => {
    let name = request.query.name;
    
    pool.query(`SELECT "Id" as id, "Name" as name FROM "Heroes" where "Name" like '%${name}%';`, 
    (error, results) => { 
      if(error) { throw error }
    response.status(200).json(results.rows);
    })
  }

  module.exports = {
    getHeroes,
    getHeroById,
    updateHero,
    addHero,
    deleteHero,
    searchHero,
  }
  


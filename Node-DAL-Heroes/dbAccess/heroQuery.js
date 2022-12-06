// First Of All run command - npm i express pg
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PgDB',
  password: 'anil',
  port: 5432,
});

const getHeroes = (request, response) => {
    pool.query('SELECT "Id", "Name" FROM "Heroes" order by "Id" ASC;', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getHeroById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT "Id", "Name" FROM "Heroes" where "Id"=$1;`, [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rowCount > 0 ? results.rows[0] : {id:number=0, name:string=''})
    })
  }

    const updateHero=(request, response) => {
    const { Id, Name }=request.body;
    
    pool.query('UPDATE "Heroes" SET "Name"=$2 WHERE "Id"=$1;', [Id, Name], (error, results) => {
    if(error){
      throw error
    }
     response.status(200).json(`A hero updated with id: ${Id}`);
   })
  }

  const addHero=(request, response) => {
    const { Name } = request.body;

    pool.query('INSERT INTO "Heroes"("Name") VALUES ($1);', [Name], (error, results) => {
      if(error){
        throw error;
      }
      response.status(201).json(`New hero added with name: ${Name}`);
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

  const searchHeroes=(request, response) => {
    let sub = request.params.sub;
    let term = request.params.term;

    //response.send(sub);
    
    pool.query(`SELECT "Id", "Name" FROM "Heroes" where "Name" like '%${term}%';`, 
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
    searchHeroes,
  }

  //done
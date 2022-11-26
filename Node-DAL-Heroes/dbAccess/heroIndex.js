const express = require('express')

// npm install body-parser --save
const bodyParser = require('body-parser')
const app = express()
const dbQuery = require('./heroQuery')
const port = 3000

////////////////// cross-origin-resource sharing /////////////////////
// npm install cors --save
// CORS or cross-origin-resource sharing is the process of making an HTTP-request to a top-level domain 
// that is different to the domain, the browser is currently at. because angular and node will be on 
// different domains 
const cors = require('cors')
var corsOptions = {
  origin: [ 'http://localhost:4200', 'http://localhost:803', 'http://192.168.43.205:803' ],  //added urls for local and iis server
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
//////////////////////////////////////////////////////////////////////

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
})

app.get('/api/heroes', dbQuery.getHeroes);
app.get('/api/heroes/:id', dbQuery.getHeroById);
app.put('/api/heroes/:id', dbQuery.updateHero);
app.post('/api/heroes', dbQuery.addHero);
app.delete('/api/heroes/:id', dbQuery.deleteHero);
app.get('/api/heroes/:name/:sub', dbQuery.searchHeroes);
//app.get('/api/searchheroes?:name', dbQuery.searchHero);

app.listen(port, () => {
  console.log(process.env.PORT);//`App running on port ${port}.`)
});

//node heroindex.js
// test 4

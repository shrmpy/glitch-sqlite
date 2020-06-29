const db = require('./db')
const express = require('express')

// database clean-up
process.on('exit', () => db.close())
process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))

const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
	response.sendFile(__dirname + '/views/index.html')
})

app.get("/favorites", (request, response) => {
  let favorites=[]
  let rows = db.findAll() // find all entries in the DB tables
	rows.forEach((fav) => {
		favorites.push([fav.broadcaster,fav.hls]) // adds their info to the array
	})
	response.send(favorites)
})

app.get("/reset", (request, response) => {
	db.reset()
	response.redirect("/")
})

const listener = app.listen(process.env.PORT, () => {
	console.log('Your app is listening on port ' + listener.address().port)
})

const fs = require('fs')
const Database = require('better-sqlite3')
const db = new Database(':memory:', { verbose: console.log })
// foreign key relationships
db.pragma('foreign_keys = ON')
// schema
const ddl = db.prepare(`CREATE TABLE IF NOT EXISTS Favorite (
        id integer NOT NULL PRIMARY KEY,
        broadcaster text NOT NULL UNIQUE,
        quality text,
        hls text
    );`
)
ddl.run()
// populate table with default data
console.log("DEBUG relative dir: ", process.cwd())
const dml = fs.readFileSync('./db/dml.sql', 'utf8')
db.exec(dml)


module.exports = {
	close: () => { return db.close() },
	findAll: () => {
		return db
			.prepare('SELECT * FROM Favorite')
			.all()
	},
}

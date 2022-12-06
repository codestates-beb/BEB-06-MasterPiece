const db = require("../db");

module.exports = {
	setting: async (req, res) => {
		const {address} = req.params;
		const {profile} = req.body;
		const query = `
            insert into profile(address, profile_url)
            values (?, ?);
		`;
		db.query(query, [address, profile], (err, rows) => {
			if (err) throw err;
			console.log(rows);
			res.send("ok");
		});
	},

	profile: async (req, res) => {
		const {address} = req.params;
		const query = `
            select address,
                   profile_url
            from profile
            where address = ?
		`
		db.query(query, [address], (err, rows) => {
			if (err) throw err;
			console.log(rows);
			res.send(rows);
		})
	}
}
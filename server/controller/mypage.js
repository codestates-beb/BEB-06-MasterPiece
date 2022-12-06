const db = require("../db");

module.exports = {
	setting: async (req, res) => {
		const {address} = req.params;
		const {profileUrl} = req.body;
		const query = `
            update profile
            set profile_url = ?
            where address = ?
		`;
		db.query(query, [profileUrl, address], (err, rows) => {
			if (err) throw err;
			console.log(rows);
			res.send("ok");
		});
	},

	profile: async (req, res) => {
		const {address} = req.params;
		const query = `
            select p.address,
                   p.profile_url     as profileUrl,
                   n.collection_name as collectionName,
                   n.nft_name        as nftName
            from profile p
                     left join nft_piece np on np.address = p.address
                     left join nft n on np.nft_id = n.id
            where p.address = ?
		`
		db.query(query, [address], (err, rows) => {
			if (err) throw err;
			console.log(rows);
			res.send(rows);
		})
	}
}
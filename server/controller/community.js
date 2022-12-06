const db = require("../db");

module.exports = {
	community: async (req, res) => {
		const query = `
            select a.id               as postId,
                   n.collection_name  as collectionName,
                   n.nft_name         as nftName,
                   a.title            as title,
                   a.address          as address,
                   a.agenda_type      as type,
                   a.create_date_time as createDateTime
            from dao_agenda a
                     left join nft n on n.id = a.nft_id
            where a.delete_yn = 0
              and n.delete_yn = 0
		`;
		db.query(query, (err, rows) => {
			if (err) throw err;
			return res.send(rows);
		});
	},

	agenda: async (req, res) => {
		const { postId } = req.params;
		const {
			collectionName,
			nftName,
			address,
			title,
			description,
			type,
			duration,
		} = req.body;
		let query = `
            select n.id
            from nft n
            where n.collection_name = ?
              and n.nft_name = ?
              and n.delete_yn = 0
		`;
		db.query(query, [collectionName, nftName], (err, rows) => {
			if (err) throw err;
			if (rows.length === 0) throw err;
			const nftId = rows[0].id;
			query = `
                insert into dao_agenda(id, nft_id, address, title, content, agenda_type, staking_duration)
                values (?, ?, ?, ?, ?, ?, ?)
			`;
			db.query(
				query,
				[postId, nftId, address, title, description, type, duration],
				(err, rows) => {
					if (err) throw err;
					console.log(rows);
					res.send("ok");
				}
			);
		});
	},

	description: async (req, res) => {
		const { postId } = req.params;
		const query = `
            select a.id                                                                       as postId,
                   n.collection_name                                                          as collectionName,
                   n.nft_name                                                                 as nftName,
                   a.title                                                                    as title,
                   a.content                                                                  as description,
                   a.agenda_type                                                              as type,
                   a.create_date_time                                                         as createDateTime,
                   p.piece_total_count                                                        as totalCount,
                   (select count(*) from dao_agenda_voting where agenda_id = ? and agree = 1) as agreeCount,
                   (select count(*) from dao_agenda_voting where agenda_id = ? and agree = 0) as disagreeCount
            from dao_agenda a
                     left join nft n on n.id = a.nft_id
                     left join nft_piece_minting p on p.nft_id = a.nft_id
            where a.id = ?
              and a.delete_yn = 0
              and n.delete_yn = 0
		`;
		db.query(query, [postId, postId, postId], (err, rows) => {
			if (err) throw err;
			res.send(rows);
		});
	},

	vote: async (req, res) => {
		const { postId } = req.params;
		const { vote, address } = req.body;
		const query = `
            insert into dao_agenda_voting (agenda_id, address, agree)
            values (?, ?, ?)
		`;
		db.query(query, [postId, address, vote], (err, rows) => {
			if (err) throw err;
			return res.send("ok");
		});
	},

	isVoted: async (req, res) => {
		const { postId, address } = req.params;
		const query = `
            select count(*) as voted
            from dao_agenda_voting
            where agenda_id = ?
              and address = ?
		`;
		db.query(query, [postId, address], (err, rows) => {
			if (err) throw err;
			if (rows[0].voted > 0) {
				return res.send("ok");
			}
			return res.send("no");
		});
	},

	result: async (req, res) => {
		const { postId } = req.params;
		const query = `
            select count(*)                              as total,
                   count(case when agree = 1 then 1 end) as agree,
                   count(case when agree = 0 then 1 end) as disagree
            from dao_agenda_voting
            where agenda_id = ?;
		`;
		db.query(query, [postId], (err, rows) => {
			if (err) throw err;
			res.send(rows);
		});

	}
}
	;

const db = require("../db");

module.exports = {
	find: async (req, res) => {
		const query = `
            select b.id                 as pieceMintingId,
                   b.contract_address   as contractAddress,
                   b.collection_name    as collectionName,
                   b.holder_address     as holderAddress,
                   b.nft_name           as name,
                   b.description        as description,
                   b.img_url            as imgUrl,
                   b.piece_total_count  as pieceTotalCount,
                   b.sale_end_date_time as saleEndDateTime,
                   b.status             as status,
                   b.price              as price,
                   count(*)             as uniqueOwner
            from (select p.id,
                         n.contract_address,
                         n.collection_name,
                         n.holder_address,
                         n.nft_name,
                         n.description,
                         n.img_url,
                         p.piece_total_count,
                         date_format(p.sale_end_date_time, '%y-%m-%dT00:00:00.000Z') as sale_end_date_time,
                         p.status,
                         p.price
                  from nft_piece_minting p
                           left join nft n on p.nft_id = n.id
                  where p.sale_end_date_time >= current_timestamp()
                    and p.status = 0
                    and p.delete_yn = 0
                    and n.delete_yn = 0) b
                     left join nft_piece a on b.id = a.nft_id`;
		db.query(query, (err, rows) => {
			if (err) throw err;
			console.log(rows);
			res.send(rows);
		});
	},

	mint: async (req, res) => {
		const {pieceMintingId, address, profile} = req.body;
		console.log(`${pieceMintingId}, ${address}`);
		let query = `
            select p.nft_id
            from nft_piece_minting p
            where p.id = ${pieceMintingId}`;
		await db.query(query, async (err, result) => {
			if (err) throw err;
			query = `
                insert into nft_piece (nft_id, address, profile_url)
                values (?, ?, ?)
			`;
			await db.query(query, [result[0].nft_id, address, profile], (err, result) => {
				if (err) throw err;
			})
		});
		query = `
            update profile
            set profile_url = ?
            where address = ?
		`
		await db.query(query, [profile, address], (err, result) => {
			if (err) throw err;
			res.send("ok");
		});
	}
}
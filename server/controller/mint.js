const db = require("../db");

module.exports = {
	findAll: async (req, res) => {
		const data = {};
		const query = `
            select count(*) as unique_owner,
                   b.contract_address,
                   b.holder_address,
                   b.name,
                   b.description,
                   b.img_url,
                   b.piece_total_count,
                   b.sale_end_date_time,
                   b.status,
                   b.price
            from (select p.seq,
                         n.contract_address,
                         n.holder_address,
                         m.name,
                         m.description,
                         m.img_url,
                         p.piece_total_count,
                         p.sale_end_date_time,
                         p.status,
                         p.price
                  from nft_piece_minting p
                           left join nft n on p.nft_seq = n.seq
                           left join nft_meta_data m on p.nft_seq = m.nft_seq
                           left join nft_tag t on p.nft_seq = t.nft_seq
                  where p.sale_end_date_time >= current_timestamp()
                    and p.status = 0
                    and p.delete_yn = 0
                    and n.delete_yn = 0
                    and m.delete_yn = 0
                    and t.delete_yn = 0) b
                     left join nft_piece_minting_address a on b.seq = a.nft_piece_minting_seq
		`;
		db.query(query, (err, rows) => {
			if (err) throw err;
			console.log(rows);
			res.send(rows);
		});
	}
}
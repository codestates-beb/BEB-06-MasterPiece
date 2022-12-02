const db = require("../db");

module.exports = {
	community: async (req, res) => {
		const query = `
            select c.id              as communityId,
                   n.collection_name as collectionName,
                   m.name            as nftName,
                   m.img_url         as imgUrl
            from community c
                     left join nft n on n.id = c.nft_id
                     left join nft_meta_data m on c.nft_id = m.nft_id
            where c.delete_yn = 0
              and n.delete_yn = 0
              and m.delete_yn = 0
		`;
		db.query(query, (err, rows) => {
			if (err) throw err;
			return res.send(rows);
		})
	},
	list: async (req, res) => {
		const communityId = req.params.communityId;
		const query = `
            select a.id               as postId,
                   n.collection_name  as collectionName,
                   n.contract_address as contractAddress,
                   m.name             as nftName,
                   m.description      as description,
                   m.img_url          as imgUrl,
                   a.address          as holderAddress,
                   a.title            as title,
                   a.agenda_type      as agendaType,
                   a.create_date_time as createDateTime
            from dao_agenda a
                     left join community c on c.nft_id = a.community_id
                     left join nft n on n.id = c.nft_id
                     left join nft_meta_data m on n.id = m.nft_id
            where a.community_id = ${communityId}
              and a.delete_yn = 0
              and n.delete_yn = 0
              and m.delete_yn = 0
		`;
		db.query(query, (err, rows) => {
			if (err) throw err;
			console.log(rows);
			res.send(rows);
		})
	},

	description: async (req, res) => {
		const {communityId, postId} = req.params;
		const query = `
            select a.id               as postId,
                   n.collection_name  as collectionName,
                   n.contract_address as contractAddress,
                   m.name             as nftName,
                   m.description      as description,
                   m.img_url          as imgUrl,
                   a.address          as holderAddress,
                   a.title            as title,
                   a.agenda_type      as agendaType,
                   a.create_date_time as createDateTime
            from dao_agenda a
                     left join community c on c.nft_id = a.community_id
                     left join nft n on n.id = c.nft_id
                     left join nft_meta_data m on n.id = m.nft_id
            where a.id = ${postId}
              and a.delete_yn = 0
              and n.delete_yn = 0
              and m.delete_yn = 0
		`;


	}
}
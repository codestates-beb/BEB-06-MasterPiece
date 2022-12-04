use masterpiece;
drop table if exists dao_agenda_voting;
drop table if exists dao_agenda;
drop table if exists nft_piece;
drop table if exists nft_piece_minting;
drop table if exists nft_tag;
drop table if exists nft_sales;
drop table if exists nft_meta_data;
drop table if exists nft;

create table nft
(
    id               int auto_increment not null primary key comment 'nft 아이디',
    contract_address char(42)           not null comment '컨트랙트 주소',
    holder_address   char(42)           not null comment '소유자 주소',
    collection_name  varchar(255)       not null comment '컨트랙트 이름',
    token_uri        varchar(255)       not null comment '토큰 URI',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시'
) comment 'nft';

create table nft_meta_data
(
    id               int auto_increment not null primary key comment 'nft meta_data 아이디',
    nft_id           int                not null comment 'nft 아이디',
    name             varchar(255)       not null comment 'nft 이름',
    description      varchar(400)       not null comment 'nft 이름',
    img_url          varchar(400)       not null comment 'img_url',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시'
) comment 'nft 메타 데이터';

create table nft_tag
(
    id               int auto_increment not null primary key comment 'nft 태그 아이디',
    nft_id           int                not null comment 'nft 아이디',
    title            varchar(255)       not null comment 'nft tag 제목',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp(),
    update_date_time timestamp          not null default current_timestamp(),
    constraint fk_nft_tag_to_nft_nft_seq foreign key (nft_id) references nft (id) on update cascade
) comment 'nft 태그 데이터';

create table nft_piece_minting
(
    id                 int auto_increment not null primary key comment 'nft 조각 판매 리스트 아이디',
    nft_id             int                not null comment 'nft 아이디',
    price              int                not null comment '판매 가격(단위: eth)',
    piece_total_count  int                not null comment 'erc-20(sbt) 개수',
    status             char(1)            not null comment '판매 상태',
    sale_end_date_time timestamp          not null,
    delete_yn          char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time   timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time   timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_nft_piece_minting_to_nft_nft_seq foreign key (nft_id) references nft (id) on update cascade
) comment '조각 민팅 리스트';

create table nft_sales
(
    id               int auto_increment not null primary key comment 'nft 판매 리스트 아이디',
    nft_id           int                not null comment 'nft 아이디',
    price            int                not null comment '판매 가격(단위: eth)',
    piece_count      int                not null comment 'erc-20(sbt) 개수',
    status           char(1)            not null comment '판매 상태',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_nft_sales_to_nft_nft_seq foreign key (nft_id) references nft (id) on update cascade
) comment 'nft 판매';

create table nft_piece
(
    id               int auto_increment not null primary key comment '조각 nft 아이디',
    nft_id           int                not null comment 'nft 아이디',
    address          char(42)           not null comment '소유자 주소',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_nft_piece_to_nft_nft_seq foreign key (nft_id) references nft (id) on update cascade
) comment 'nft 조각';

create table dao_agenda
(
    id               int auto_increment not null primary key comment '안건 아이디',
    nft_id           int                not null comment 'nft 일련번호',
    address          char(42)           not null comment '안건 제안자',
    title            varchar(255)       not null comment '안건 타이틀',
    content          text               not null comment '안건 내용',
    agenda_type      char(42)            not null comment '안건 타입 sell , staking',
    delete_yn        char(1) comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_dao_agenda_to_nft_nft_seq foreign key (nft_id) references nft (id) on update cascade
) comment 'DAO 안건';

create table dao_agenda_voting
(
    id               int auto_increment not null primary key comment '안건 투표 아이디',
    agenda_id        int                not null comment '안건 id',
    address          char(42)           not null comment '투표자',
    agree            char(1)            not null comment '찬성 여부 (1 찬성, 0 거절)',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_dao_agenda_voting_to_dao_agenda_agenda_seq foreign key (agenda_id) references dao_agenda (id) on update cascade
) comment 'DAO 안건 투표';

insert into nft(contract_address, holder_address, collection_name, token_uri)
values ('0x44f48Bf4AF34fF0Fd597a4404049B3dDA2F27cEe', '0x0fb66D9442c83440dCF805952905258BeD84C0ED',
        'The Crypto Punk NFT',
        'https://ipfs.io/ipns/k51qzi5uqu5dit3458jep4ckz4qw78z2zcw0itqabg8wyud92jzh79difai1u9');
insert into nft(contract_address, holder_address, collection_name, token_uri)
values ('0xfF0Fd597a440AF34DA2F27cEe4049B3d44f48Bf4', '0x0fb66D9442c83440dCF805952905258BeD84C0ED',
        'Bored Ape Yacht Club',
        'https://ipfs.io/ipns/k51qzi5uqu23ffwfsdfsfep4ckz4qw78z2zcw0itqabg8wyud92jzh79difai1u9');
insert into nft(contract_address, holder_address, collection_name, token_uri)
values ('0xfF0440AF34DA2Fd597aF27cEe4049B3d44f48Bf4', '0x0fb66D9442c83440dCF805952905258BeD84C0ED',
        'Crypto Punks',
        'https://ipfs.io/ipns/k51qzi5uqu23ffwfsdfsfep4ckz4qw78z2zcw0itqabg8wyud92jzh79difai1u9');
insert into nft(contract_address, holder_address, collection_name, token_uri)
values ('0xcEe4049B3dfF0440AF34DA2Fd597aF2744f48Bf4', '0x0fb66D9442c83440dCF805952905258BeD84C0ED',
        'Mutant Ape Yacht Club',
        'https://ipfs.io/ipns/k51qzi5uqu23ffwfsdfsfep4ckz4qw78z2zcw0itqabg8wyud92jzh79difai1u9');
insert into nft_meta_data (nft_id, name, description, img_url)
values (1, '#1173',
        'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art | Basel Miami, and The PBS NewsHour.',
        'https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000');
insert into nft_meta_data (nft_id, name, description, img_url)
values (1, '#1173',
        'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art | Basel Miami, and The PBS NewsHour.',
        'https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000');
insert into nft_meta_data (nft_id, name, description, img_url)
values (2, '#3152',
        'weird ape.',
        'https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000');
insert into nft_meta_data (nft_id, name, description, img_url)
values (3, '#1082',
        'yellow Crypto Punk.',
        'https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000');
insert into nft_meta_data (nft_id, name, description, img_url)
values (4, '#5082',
        'Mutant Ape Yacht Club',
        'https://img.seadn.io/files/e52f773e06875799d22df815799460e9.png?fit=max&w=1000');
insert into nft_tag(nft_id, title) value (1, 'VERIFIED');
insert into nft_piece_minting (nft_id, price, piece_total_count, status, sale_end_date_time)
values (1, 5, 100, 0, DATE_ADD(NOW(), INTERVAL 7 DAY));
insert into nft_piece (nft_id, address)
values (1, '0x0fb66D9442c83440dCF805952905258BeD84C0ED');

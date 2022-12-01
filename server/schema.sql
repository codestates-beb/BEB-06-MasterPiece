use masterpiece;
drop table if exists dao_agenda_voting;
drop table if exists dao_agenda;
drop table if exists nft_piece;
drop table if exists nft_piece_minting_address;
drop table if exists nft_piece_minting;
drop table if exists nft_tag;
drop table if exists nft_sales;
drop table if exists nft_meta_data;
drop table if exists nft;

create table nft
(
    seq              int auto_increment not null primary key comment 'nft 일련번호',
    contract_address char(42)           not null comment '컨트랙트 주소',
    collection_name  varchar(255)       not null comment '컨트랙트 이름',
    holder_address   char(42)           not null comment '소유자 주소',
    token_uri        varchar(255)       not null comment '토큰 URI',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시'
) comment 'nft';

create table nft_meta_data
(
    seq              int auto_increment not null primary key comment 'nft meta_data 일련번호',
    nft_seq          int                not null comment 'nft 일련번호',
    name             varchar(255)       not null comment 'nft 이름',
    description      varchar(400)       not null comment 'nft 이름',
    img_url          varchar(400)       not null comment 'img_url',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시'
) comment 'nft 메타 데이터';

create table nft_tag
(
    seq              int auto_increment not null primary key comment 'nft 태그 일련번호',
    nft_seq          int                not null comment 'nft 일련번호',
    title            varchar(255)       not null comment 'nft tag 제목',
    delete_yn        char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp(),
    update_date_time timestamp          not null default current_timestamp(),
    constraint fk_nft_tag_to_nft_nft_seq foreign key (nft_seq) references nft (seq) on update cascade
) comment 'nft 태그 데이터';

create table nft_piece_minting
(
    seq                int auto_increment not null primary key comment 'nft 조각 판매 리스트 일련번호',
    nft_seq            int                not null comment 'nft 일련번호',
    price              int                not null comment '판매 가격(단위: eth)',
    piece_total_count  int                not null comment 'erc-20(sbt) 개수',
    status             char(1)            not null comment '판매 상태',
    sale_end_date_time timestamp          not null,
    delete_yn          char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time   timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time   timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_nft_piece_minting_to_nft_nft_seq foreign key (nft_seq) references nft (seq) on update cascade
) comment '조각 민팅 리스트';

create table nft_piece_minting_address
(
    seq                   int auto_increment not null primary key comment 'nft 조각 민팅 입찰자 일련번호',
    nft_piece_minting_seq int                not null comment 'nft 조각 판매 일련번호',
    address               char(42) comment '입찰자 주소',
    delete_yn             char(1)            not null default 0 comment '데이터 삭제 여부',
    create_date_time      timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time      timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_nft_piece_minting_address_to_nft_piece_minting foreign key (nft_piece_minting_seq) references nft_piece_minting (seq) on update cascade
) comment '조각 민팅 참여자';


create table nft_sales
(
    seq              int auto_increment not null primary key comment 'nft 판매 리스트 일련번호',
    nft_seq          int                not null comment 'nft 일련번호',
    price            int                not null comment '판매 가격(단위: eth)',
    piece_count      int                not null comment 'erc-20(sbt) 개수',
    status           char(1)            not null comment '판매 상태',
    delete_yn        char(1) comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_nft_sales_to_nft_nft_seq foreign key (nft_seq) references nft (seq) on update cascade
) comment 'nft 판매';

create table nft_piece
(
    seq              int auto_increment not null primary key comment '조각 nft 일련번호',
    nft_seq          int                not null comment 'nft 일련번호',
    address          char(42)           not null comment '소유자 주소',
    delete_yn        char(1) comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_nft_piece_to_nft_nft_seq foreign key (nft_seq) references nft (seq) on update cascade
) comment 'nft 조각';

create table dao_agenda
(
    seq              int auto_increment not null primary key comment '안건 일련번호',
    nft_seq          int                not null comment 'nft 일련번호',
    address          char(42)           not null comment '안건 제안자',
    title            varchar(255)       not null comment '안건 타이틀',
    content          text               not null comment '안건 내용',
    agenda_type      char(1)            not null comment '안건 타입 sell , staking',
    delete_yn        char(1) comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_dao_agenda_to_nft_nft_seq foreign key (nft_seq) references nft (seq) on update cascade
) comment 'DAO 안건';

create table dao_agenda_voting
(
    seq              int auto_increment not null primary key comment '안건_투표 일련번호',
    agenda_seq       int                not null comment '안건 일련번호',
    address          char(42)           not null comment '투표자',
    agree            char(1)            not null comment '찬성 여부 (1 찬성, 0 거절)',
    delete_yn        char(1) comment '데이터 삭제 여부',
    create_date_time timestamp          not null default current_timestamp() comment '데이터 생성일시',
    update_date_time timestamp          not null default current_timestamp() comment '데이터 수정일시',
    constraint fk_dao_agenda_voting_to_dao_agenda_agenda_seq foreign key (agenda_seq) references dao_agenda (seq) on update cascade
) comment 'DAO 안건 투표';

create table payment_history
(
    id               bigint auto_increment
        primary key,
    trans_id         bigint                              not null,
    uid              varchar(100)                        null,
    transfer_amount  float                               null,
    transaction_date varchar(20)                         null,
    diamond_amount   float                               null,
    diamond_rate     float                               null,
    created          timestamp default CURRENT_TIMESTAMP not null,
    status           tinyint                             not null,
    message          varchar(500)                        null
);

create table settings
(
    id         int auto_increment
        primary key,
    `key`      varchar(50)                         not null,
    value      varchar(200)                        not null,
    name       varchar(200)                        not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint settings_pk
        unique (`key`)
);

create table token
(
    id         bigint auto_increment
        primary key,
    token      varchar(255)                        null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    status     tinyint   default 0                 not null,
    gen_type   varchar(50)                         null
);

create table users
(
    id            bigint auto_increment,
    username      varchar(255)                not null,
    password      varchar(255)                not null,
    role          varchar(50) default 'GUEST' not null,
    refresh_token varchar(200)                null,
    expired       datetime                    null,
    constraint userId
        unique (id)
);

drop schema cccat11 cascade;

create schema cccat11;

create table cccat11.product (
	id_product integer,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight numeric
);

insert into cccat11.product (id_product, description, price, width, height, length, weight) values (1, 'A', 1000, 100, 30, 10, 3);
insert into cccat11.product (id_product, description, price, width, height, length, weight) values (2, 'B', 5000, 50, 50, 50, 22);
insert into cccat11.product (id_product, description, price, width, height, length, weight) values (3, 'C', 30, 10, 10, 10, 0.9);

create table cccat11.coupon (
	code text,
	percentage numeric,
	expire_date timestamp
);

insert into cccat11.coupon (code, percentage, expire_date) values ('VALE20', 20, '2023-10-01T10:00:00');
insert into cccat11.coupon (code, percentage, expire_date) values ('VALE10', 10, '2022-10-01T10:00:00');

create table cccat11.order (
	id_order text,
	code text,
	cpf text,
	total numeric,
	freight numeric,
	sequence integer,
	date timestamp
);

create table cccat11.item (
	id_order text,
	id_product integer,
	price numeric,
	quantity integer
);

create table cccat11.user (
	email text,
	password text,
	salt text,
	password_type text
);

create table cccat11.zipcode (
	code text,
	lat numeric,
	long numeric
);

insert into cccat11.zipcode (code, lat, long) values ('22060030',-27.5945,-48.5477);
insert into cccat11.zipcode (code, lat, long) values ('88015600',-22.9129,-43.2003);

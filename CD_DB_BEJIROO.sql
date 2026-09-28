-- Gera��o de Modelo f�sico
-- Sql ANSI 2003 - brModelo.


/
CREATE TABLE ADMINISTRADOR (
id_administrador INTEGER PRIMARY KEY,
nm_administrador VARCHAR(100),
eml_administrador VARCHAR(100),
snh_administrador VARCHAR(100)
)
/
INSERT INTO ADMINISTRADOR (id_administrador, nm_administrador, eml_administrador, snh_administrador)
VALUES (1, 'Administrador', 'admin@admin', 'admin')
/
CREATE TABLE PEDIDO (
id_pedido INTEGER PRIMARY KEY,
dt_hr_entr_pedido DATETIME,
dt_hr_sai_pedido DATETIME,
dt_hr_cheg_pedido DATETIME,
id_carrinho_produto INTEGER,
id_status_pedido INTEGER
)
/
CREATE TABLE TIPO_PAGAMENTO (
id_tipo_pagamento INTEGER PRIMARY KEY,
nm_tipo_pagamento VARCHAR(30)
)
/
CREATE TABLE FORMA_PAGAMENTO (
id_forma_pagamento INTEGER PRIMARY KEY,
ds_forma_pagamento VARCHAR(200),
id_tipo_pagamento INTEGER,
FOREIGN KEY(id_tipo_pagamento) REFERENCES TIPO_PAGAMENTO (id_tipo_pagamento)
)
/
CREATE TABLE CATEGORIA_PRODUTO (
id_categoria_produto INTEGER PRIMARY KEY,
nm_categoria_produto VARCHAR(100)
)
/
CREATE TABLE STATUS_PRODUTO (
id_status_produto INTEGER PRIMARY KEY,
nm_status_produto VARCHAR(100)
)
/
CREATE TABLE TIPO_CUPOM (
id_tipo_cupom INTEGER PRIMARY KEY,
nm_tipo_cupom VARCHAR(100)
)
/
CREATE TABLE CUPOM (
id_cupom INTEGER PRIMARY KEY,
nm_cupom VARCHAR(100),
ds_cupom VARCHAR(200),
vl_cupom DECIMAL(10,2),
qt_cupom INTEGER,
id_tipo_cupom INTEGER,
FOREIGN KEY(id_tipo_cupom) REFERENCES TIPO_CUPOM (id_tipo_cupom)
)
/
CREATE TABLE CARRINHO_PRODUTO (
id_carrinho_produto INTEGER PRIMARY KEY,
vl_carrinho DECIMAL(10,2),
id_cupom INTEGER,
id_usuario INTEGER,
FOREIGN KEY(id_cupom) REFERENCES CUPOM (id_cupom)
)
/
CREATE TABLE PRODUTO (
id_produto INTEGER PRIMARY KEY,
nm_produto VARCHAR(100),
ds_produto VARCHAR(200),
tm_produto VARCHAR(10),
ps_produto VARCHAR(10),
vl_produto DECIMAL(10,2),
img_produto VARCHAR(255),
qt_produto INTEGER,
id_categoria_produto INTEGER,
id_status_produto INTEGER,
id_cupom INTEGER,
FOREIGN KEY(id_categoria_produto) REFERENCES CATEGORIA_PRODUTO (id_categoria_produto),
FOREIGN KEY(id_status_produto) REFERENCES STATUS_PRODUTO (id_status_produto),
FOREIGN KEY(id_cupom) REFERENCES CUPOM (id_cupom)
)
/
CREATE TABLE USUARIO (
id_usuario INTEGER PRIMARY KEY,
snh_usuario VARCHAR(100),
eml_usuario VARCHAR(100),
nm_usuario VARCHAR(100),
id_endereco INTEGER
)
/
INSERT INTO USUARIO (id_usuario, snh_usuario, eml_usuario, nm_usuario, id_endereco)
VALUES (1, 'ana123456', 'ana@email.com', 'Ana Silva', NULL)
/
INSERT INTO USUARIO (id_usuario, snh_usuario, eml_usuario, nm_usuario, id_endereco)
VALUES (2, 'carla123456', 'carla@email.com', 'Carla Mendes', NULL)
/
CREATE TABLE ENDERECO (
id_endereco INTEGER PRIMARY KEY,
log_endereco VARCHAR(100),
bair_endereco VARCHAR(100),
cid_endereco VARCHAR(100),
cep_endereco CHAR(8),
comp_endereco VARCHAR(200)
)
/
CREATE TABLE STATUS_PEDIDO (
id_status_pedido INTEGER PRIMARY KEY,
nm_status_pedido VARCHAR(100)
)
/
CREATE TABLE ITEM_CARRINHO_ITEM_CARRINHO (
id_item_carrinho INTEGER PRIMARY KEY,
qt_item_carrinho INTEGER,
id_produto INTEGER,
id_carrinho_produto INTEGER,
FOREIGN KEY(id_produto) REFERENCES PRODUTO (id_produto),
FOREIGN KEY(id_carrinho_produto) REFERENCES CARRINHO_PRODUTO (id_carrinho_produto)
)
/
ALTER TABLE PEDIDO ADD FOREIGN KEY(id_carrinho_produto) REFERENCES CARRINHO_PRODUTO (id_carrinho_produto)
ALTER TABLE PEDIDO ADD FOREIGN KEY(id_status_pedido) REFERENCES STATUS_PEDIDO (id_status_pedido)
ALTER TABLE CARRINHO_PRODUTO ADD FOREIGN KEY(id_usuario) REFERENCES USUARIO (id_usuario)
ALTER TABLE USUARIO ADD FOREIGN KEY(id_endereco) REFERENCES ENDERECO (id_endereco)

INSERT INTO CATEGORIA_PRODUTO (id_categoria_produto, nm_categoria_produto)
VALUES (1, 'Tortas')
/
INSERT INTO CATEGORIA_PRODUTO (id_categoria_produto, nm_categoria_produto)
VALUES (2, 'Bolos')
/
INSERT INTO CATEGORIA_PRODUTO (id_categoria_produto, nm_categoria_produto)
VALUES (3, 'Doces')
/
INSERT INTO CATEGORIA_PRODUTO (id_categoria_produto, nm_categoria_produto)
VALUES (4, 'Sobremesas')
/

INSERT INTO STATUS_PRODUTO (id_status_produto, nm_status_produto)
VALUES (1, 'Ativo')
/
INSERT INTO STATUS_PRODUTO (id_status_produto, nm_status_produto)
VALUES (2, 'Indisponivel')
/

INSERT INTO PRODUTO (
	id_produto,
	nm_produto,
	ds_produto,
	tm_produto,
	ps_produto,
	vl_produto,
	img_produto,
	qt_produto,
	id_categoria_produto,
	id_status_produto,
	id_cupom
)
VALUES (
	1,
	'Bolo de Cenoura Especial',
	'Bolo de cenoura com cobertura cremosa de chocolate.',
	'unidade',
	'1 kg',
	42.00,
	'bolo-cenoura.jpg',
	15,
	2,
	1,
	NULL
)
/
INSERT INTO PRODUTO (
	id_produto,
	nm_produto,
	ds_produto,
	tm_produto,
	ps_produto,
	vl_produto,
	img_produto,
	qt_produto,
	id_categoria_produto,
	id_status_produto,
	id_cupom
)
VALUES (
	2,
	'Torta de Chocolate',
	'Torta com massa de chocolate e recheio cremoso.',
	'fatia',
	'150 g',
	45.00,
	'torta-chocolate.jpg',
	10,
	1,
	1,
	NULL
)
/
INSERT INTO PRODUTO (
	id_produto,
	nm_produto,
	ds_produto,
	tm_produto,
	ps_produto,
	vl_produto,
	img_produto,
	qt_produto,
	id_categoria_produto,
	id_status_produto,
	id_cupom
)
VALUES (
	3,
	'Brownie com Brigadeiro',
	'Brownie macio finalizado com brigadeiro artesanal.',
	'unidade',
	'100 g',
	12.90,
	'brownie-brigadeiro.jpg',
	25,
	3,
	1,
	NULL
)
/
INSERT INTO PRODUTO (
	id_produto,
	nm_produto,
	ds_produto,
	tm_produto,
	ps_produto,
	vl_produto,
	img_produto,
	qt_produto,
	id_categoria_produto,
	id_status_produto,
	id_cupom
)
VALUES (
	4,
	'Brigadeiro Bejiroo',
	'Brigadeiro de chocolate com confeitos especiais.',
	'unidade',
	'30 g',
	8.00,
	'brigadeiro.jpg',
	40,
	3,
	1,
	NULL
)
/
INSERT INTO PRODUTO (
	id_produto,
	nm_produto,
	ds_produto,
	tm_produto,
	ps_produto,
	vl_produto,
	img_produto,
	qt_produto,
	id_categoria_produto,
	id_status_produto,
	id_cupom
)
VALUES (
	5,
	'Cheesecake de Frutas Vermelhas',
	'Cheesecake leve com calda de frutas vermelhas.',
	'fatia',
	'160 g',
	16.50,
	'cheesecake-frutas.jpg',
	12,
	4,
	1,
	NULL
)
/
INSERT INTO PRODUTO (
	id_produto,
	nm_produto,
	ds_produto,
	tm_produto,
	ps_produto,
	vl_produto,
	img_produto,
	qt_produto,
	id_categoria_produto,
	id_status_produto,
	id_cupom
)
VALUES (
	6,
	'Bolo de Laranja Caseiro',
	'Bolo fofinho de laranja com calda citrica.',
	'unidade',
	'1 kg',
	38.00,
	'bolo-laranja.jpg',
	8,
	2,
	1,
	NULL
)
/
INSERT INTO PRODUTO (
	id_produto,
	nm_produto,
	ds_produto,
	tm_produto,
	ps_produto,
	vl_produto,
	img_produto,
	qt_produto,
	id_categoria_produto,
	id_status_produto,
	id_cupom
)
VALUES (
	7,
	'Torta de Limao',
	'Torta de limao com creme suave e merengue tostado.',
	'fatia',
	'150 g',
	14.00,
	'torta-limao.jpg',
	14,
	1,
	1,
	NULL
)
/
INSERT INTO PRODUTO (
	id_produto,
	nm_produto,
	ds_produto,
	tm_produto,
	ps_produto,
	vl_produto,
	img_produto,
	qt_produto,
	id_categoria_produto,
	id_status_produto,
	id_cupom
)
VALUES (
	8,
	'Pudim de Leite',
	'Pudim cremoso de leite com calda de caramelo.',
	'fatia',
	'130 g',
	10.00,
	'pudim-leite.jpg',
	18,
	4,
	1,
	NULL
)
/
/
INSERT INTO PRODUTO (id_produto, nm_produto, ds_produto, tm_produto, ps_produto, vl_produto, img_produto, qt_produto, id_categoria_produto, id_status_produto, id_cupom)
VALUES (9, 'Trufa de Chocolate', 'Trufa cremosa de chocolate com cobertura de cacau.', 'unidade', '50 g', 6.50, 'trufa-chocolate.jpg', 30, 3, 1, NULL)
/
INSERT INTO PRODUTO (id_produto, nm_produto, ds_produto, tm_produto, ps_produto, vl_produto, img_produto, qt_produto, id_categoria_produto, id_status_produto, id_cupom)
VALUES (10, 'Trufa de Maracuja', 'Trufa de chocolate branco com recheio azedinho de maracuja.', 'unidade', '50 g', 7.00, 'trufa-maracuja.jpg', 25, 3, 1, NULL)
/
INSERT INTO PRODUTO (id_produto, nm_produto, ds_produto, tm_produto, ps_produto, vl_produto, img_produto, qt_produto, id_categoria_produto, id_status_produto, id_cupom)
VALUES (11, 'Beijinho de Coco', 'Doce macio de coco finalizado com coco ralado.', 'unidade', '30 g', 6.00, 'beijinho-coco.jpg', 35, 3, 1, NULL)
/
INSERT INTO PRODUTO (id_produto, nm_produto, ds_produto, tm_produto, ps_produto, vl_produto, img_produto, qt_produto, id_categoria_produto, id_status_produto, id_cupom)
VALUES (12, 'Cajuzinho de Amendoim', 'Doce de amendoim com toque de chocolate e acucar.', 'unidade', '30 g', 6.00, 'cajuzinho-amendoim.jpg', 28, 3, 1, NULL)
/
INSERT INTO PRODUTO (id_produto, nm_produto, ds_produto, tm_produto, ps_produto, vl_produto, img_produto, qt_produto, id_categoria_produto, id_status_produto, id_cupom)
VALUES (13, 'Cookie de Chocolate', 'Cookie crocante por fora e macio por dentro com gotas de chocolate.', 'unidade', '80 g', 9.00, 'cookie-chocolate.jpg', 20, 3, 1, NULL)
/
INSERT INTO PRODUTO (id_produto, nm_produto, ds_produto, tm_produto, ps_produto, vl_produto, img_produto, qt_produto, id_categoria_produto, id_status_produto, id_cupom)
VALUES (14, 'Cupcake Red Velvet', 'Cupcake red velvet com cobertura cremosa de cream cheese.', 'unidade', '120 g', 14.00, 'cupcake-red-velvet.jpg', 16, 2, 1, NULL)
/
INSERT INTO PRODUTO (id_produto, nm_produto, ds_produto, tm_produto, ps_produto, vl_produto, img_produto, qt_produto, id_categoria_produto, id_status_produto, id_cupom)
VALUES (15, 'Mousse de Maracuja', 'Mousse leve de maracuja com calda da fruta.', 'pote', '150 g', 12.00, 'mousse-maracuja.jpg', 18, 4, 1, NULL)
/
INSERT INTO PRODUTO (id_produto, nm_produto, ds_produto, tm_produto, ps_produto, vl_produto, img_produto, qt_produto, id_categoria_produto, id_status_produto, id_cupom)
VALUES (16, 'Pave de Chocolate', 'Pave cremoso de chocolate com biscoito e raspas de chocolate.', 'pote', '180 g', 13.00, 'pave-chocolate.jpg', 15, 4, 1, NULL)
/
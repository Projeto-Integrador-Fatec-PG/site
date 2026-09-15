-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.


/
CREATE TABLE ADMINISTRADOR (
id_administrador INTEGER PRIMARY KEY,
nm_administrador VARCHAR(100),
eml_administrador VARCHAR(100),
snh_administrador VARCHAR(100)
)
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
/
CREATE TABLE `tb_categoria` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`setor` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tb_produto` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`categoria_id` INT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`preco` DECIMAL(6,2) NOT NULL,
	`qtd_estoque` INT NOT NULL,
	`descricao` varchar(255) NOT NULL,
	`peso` DECIMAL(6,2) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tb_usuario` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha` varchar(8) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `tb_produto` ADD CONSTRAINT `tb_produto_fk0` FOREIGN KEY (`categoria_id`) REFERENCES `tb_categoria`(`id`);


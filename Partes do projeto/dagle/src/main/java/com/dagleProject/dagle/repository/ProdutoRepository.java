package com.dagleProject.dagle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dagleProject.dagle.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	public List<Produto> findAllByNomeContainingIgnoreCase(String nome);
	
	//teste
@Query(value = "SELECT * FROM dagle.produto where usuario_id = :idUsuario and categoria_id = :idCategoria", nativeQuery = true)
public List<Produto> buscarProdutoPorIdUsuarioIdCategoria(@Param("idUsuario") long idUsuario,@Param("idCategoria") long idCategoria);

@Modifying
@Query(value = "SELECT * FROM dagle.produto where usuario_id = :idUsuario", nativeQuery = true)
public List<Produto> buscarProdutoPorIdUsuario(@Param("idUsuario") long idUsuario);

}

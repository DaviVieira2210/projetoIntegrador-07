import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]

  produto: Produto = new Produto()
  listaProdutos: Produto[]
  
  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(){
    if(environment.token == ''){
      //alert('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])
    }
    this.findAllCategorias()
    this.findAllProdutos()
  }
  
  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategorias = resp
    })
  }

  cadastrar(){ 
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
      alert('Categoria cadastrado com sucesso!')
      this.findAllCategorias()
      this.categoria = new Categoria()
    })
  }

  findAllProdutos(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }

  cadastrarProduto(){
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
      this.produto = resp
      alert('Produto cadastrado com sucesso!')
      this.findAllProdutos()
      this.produto = new Produto()
      this.router.navigate(['/estoque'])
    })
  }

}

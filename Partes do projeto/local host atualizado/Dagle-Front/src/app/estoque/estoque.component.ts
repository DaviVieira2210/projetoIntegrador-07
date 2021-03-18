import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number
  nomeCat: string

  produto: Produto = new Produto()
  listaProdutos: Produto[]
  nomePost: string

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse =  true

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }
    this.getAllCategorias()
    console.log(this.idUser)
  }

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  getAllCategoriaDoUsuario(){
    this.produtoService.getAllCategoriaDoUsuario(this.idUser,this.idCategoria).subscribe((resp:  Produto[])=>{
      this.listaProdutos = resp
    })
  }

  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    } ) 
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  findByNomeProduto(){
    if(this.nomePost == ''){
      this.getAllProdutos()
    } else {
      this.produtoService.getByNomeProduto(this.nomePost).subscribe((resp: Produto[]) =>{
        this.user.produto = resp
      })
    }
  }

  findByNomeCategoria(){
    if(this.nomeCat == ''){
      this.getAllCategorias()
    } else {
      this.categoriaService.getByNomeCategoria(this.nomeCat).subscribe((resp: Categoria[]) =>{
        this.listaCategoria = resp
      })
    }
  }

}
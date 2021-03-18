import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
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
    public auth: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      this.alertas.showAlertDanger('Você precisa estar logado para acessar essa página!')
      this.router.navigate(['/login'])
    }
    this.getAllProdutosDoUsuario()
    this.getAllCategorias()
  }

  @ViewChild('nav', {static: true}) minhaNavbar:ElementRef;

  @HostListener('window:scroll') onWindowScroll() {
    if (window.scrollY > 100.0) { 
      this.minhaNavbar.nativeElement.style.backgroundColor = '#0471eeb6';
      this.minhaNavbar.nativeElement.style.height = '9.5%'
      this.minhaNavbar.nativeElement.style.justifyContent = 'space-between';
      this.minhaNavbar.nativeElement.style.transition = '0.5s'
    } else {
      this.minhaNavbar.nativeElement.style.backgroundColor = 'transparent';
      this.minhaNavbar.nativeElement.style.height = '11%'
      this.minhaNavbar.nativeElement.style.justifyContent = 'space-between';
      this.minhaNavbar.nativeElement.style.transition = '0.5s'
      this.minhaNavbar.nativeElement.classList.remove("background-color");
    }
  }

  sair(){
    this.router.navigate(['/home'])
    environment.token = ''
    environment.nome = ''
    environment.email = ''
    environment.id = 0
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

  getAllProdutosDoUsuario(){
    this.produtoService.getAllProdutosDoUsuario(this.idUser).subscribe((resp:Produto[])=>{
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
    this.auth.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  findByNomeProduto(){
      if(this.nomePost == ''){
        this.getAllProdutosDoUsuario()
      } else {
        this.produtoService.getByNomeProduto(this.nomePost).subscribe((resp: Produto[]) =>{
          this.listaProdutos = resp
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

  participar(){
    this.alertas.showAlertInfo('E-mail cadastrado com sucesso!')
    }

}
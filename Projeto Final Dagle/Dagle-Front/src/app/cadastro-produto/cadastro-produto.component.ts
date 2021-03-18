import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
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
  idCategoria: number

  produto: Produto = new Produto()
  listaProdutos: Produto[]

  user: User = new User()
  idUser = environment.id
  
  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    public auth: AuthService,
    private alertas: AlertasService
    
  ) {}

  ngOnInit(){
    if(environment.token == ''){
      this.alertas.showAlertDanger('Você precisa estar logado para acessar essa página!')
      this.router.navigate(['/login'])
    }
    
    this.getAllProdutos()
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
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategorias = resp
    })
  }

  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  cadastrar(){ 
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
      this.alertas.showAlertInfo('Categoria cadastrado com sucesso!')
      this.findAllCategorias()
      this.categoria = new Categoria()
    })
  }

  cadastrarProduto(){
    this.categoria.id = this.idCategoria
   this.produto.categoria = this.categoria

   this.user.id = this.idUser
   this.produto.usuario = this.user

   this.produtoService.postProdutos(this.produto).subscribe((resp: Produto) => {
     this.produto = resp
     this.alertas.showAlertInfo('Produto cadastrado com sucesso!')
     this.produto = new Produto()
     this.router.navigate(['/estoque'])
     this.getAllProdutos()
   })
  }

  participar(){
  this.alertas.showAlertInfo('E-mail cadastrado com sucesso!')
  }

}

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]



  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private alertas: AlertasService,
    public auth: AuthService
    
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      this.alertas.showAlertDanger('Você precisa estar logado para acessar essa página!')
      this.router.navigate(['/login'])
    }
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

  cadastrar(){ 
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
      this.alertas.showAlertInfo('Categoria cadastrada com sucesso!')
      this.categoria = new Categoria()
      this.getAllCategorias()
    })
  }

  participar(){
    this.alertas.showAlertInfo('E-mail cadastrado com sucesso!')
    }

}

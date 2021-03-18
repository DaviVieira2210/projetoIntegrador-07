import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = new Categoria()
  idTema: number


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private alertas: AlertasService,
    public auth: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.alertas.showAlertDanger('Você precisa estar logado para acessar essa página!')
      this.router.navigate(['/login'])
    }

    this.idTema = this.route.snapshot.params['id']
    this. findByIdCategoria(this.idTema)
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

  findByIdCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
      this.categoria = resp

    })
  }

  apagar(){
    this.categoriaService.deleteCategoria(this.idTema).subscribe(()=>{
      this.alertas.showAlertInfo('Categoria apagado com sucesso!')
      this.router.navigate(['/categoria'])
    })
  }

  participar(){
    this.alertas.showAlertInfo('E-mail cadastrado com sucesso!')
    }

}

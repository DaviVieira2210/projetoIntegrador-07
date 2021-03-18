import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { AlertasService } from 'src/app/service/alertas.service';
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
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      //alert('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])
    }

    this.idTema = this.route.snapshot.params['id']
    this. findByIdCategoria(this.idTema)
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

}

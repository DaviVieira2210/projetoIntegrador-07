import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  produto: Produto = new Produto()
  idPost: number

  categoria: Categoria = new Categoria()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdProduto(this.idPost)
  }

  findByIdProduto(id: number){
    this.produtoService.getByIdProdutos(id).subscribe((resp: Produto)=>{
      this.produto = resp
    })
  }

  apagar(){
    this.produtoService.deleteProduto(this.idPost).subscribe(()=>{
      this.alertas.showAlertInfo('Produto apagado com sucesso!')
      this.router.navigate(['/estoque'])
    })
  }

}

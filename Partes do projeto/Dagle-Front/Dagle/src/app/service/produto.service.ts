import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
   private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>('http://localhost:8080/produtos', this.token)
  }
  
  getAllCategoriaDoUsuario(idUsuario: number, idCategoria: number): Observable<Produto[]>{
    return this.http.get<Produto[]>(`http://localhost:8080/produtos/all/${idUsuario}/${idCategoria}`, this.token)
  }

  getAllProdutosUsuario(idUsuario: number): Observable<Produto[]>{
    return this.http.get<Produto[]>(`http://localhost:8080/produtos/all/${idUsuario}`, this.token)
  }

  getByIdProdutos(id: number): Observable<Produto>{
    return this.http.get<Produto>(`http://localhost:8080/produtos/${id}`, this.token)
  }

  getByNomeProduto(nome: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`http://localhost:8080/produtos/nome/${nome}`, this.token)
  }

  postProdutos(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('http://localhost:8080/produtos', produto, this.token ) 

  }
  putProdutos(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('http://localhost:8080/produtos', produto, this.token)
  }

  deleteProduto(id: number){
    return this.http.delete(`http://localhost:8080/produtos/${id}`, this.token)
  }



}

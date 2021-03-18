import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://dagle-project.herokuapp.com/usuarios/logar',userLogin)

  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>('https://dagle-project.herokuapp.com/usuarios/cadastrar',user)

  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://dagle-project.herokuapp.com/usuarios/${id}`)
  }


  menuLogado(){
    let ok = false

      if(environment.email != ''){
        ok = true
      }

      return ok
  }

  menuDeslogado(){
    let ok = false

      if(environment.email == ''){
        ok = true
      }

      return ok
  }

  adm(){
    let ok = false

    if(environment.tipo == 'adm'){
      ok = true
    }

    return ok
  }
}

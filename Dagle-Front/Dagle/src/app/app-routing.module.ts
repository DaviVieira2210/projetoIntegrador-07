import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContatoComponent } from './contato/contato.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ServicosComponent } from './servicos/servicos.component';

const routes: Routes = [

  {path:'',redirectTo:'login',pathMatch:'full'},

{path:'login',component:LoginComponent},
{path:'cadastrar',component:CadastrarComponent},

{path:'home',component:HomeComponent},
{path:'categoria',component:CategoriaComponent},
{path:'contato',component:ContatoComponent},
{path:'serviços',component:ServicosComponent},
{path: 'cadastro-produto', component: CadastroProdutoComponent},
{path: 'estoque', component: EstoqueComponent},
{path: 'categoria-edit/:id', component: CategoriaEditComponent},
{path: 'categoria-delete/:id', component: CategoriaDeleteComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

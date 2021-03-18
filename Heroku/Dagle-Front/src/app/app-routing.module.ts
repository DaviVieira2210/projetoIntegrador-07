import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContatoComponent } from './contato/contato.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ServicosComponent } from './servicos/servicos.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';

const routes: Routes = [

  {path:'',redirectTo:'home',pathMatch:'full'},

    {path:'login',component:LoginComponent},
    {path:'cadastrar',component:CadastrarComponent},

    {path:'home',component:HomeComponent},
    {path:'sobre-nos', component: SobreNosComponent},
    {path:'serviços',component:ServicosComponent},
    {path:'contato',component:ContatoComponent},

    {path:'estoque', component: EstoqueComponent},
    {path:'categoria',component:CategoriaComponent},
    {path:'cadastro-produto', component: CadastroProdutoComponent},
    {path:'pagamentos', component: PagamentoComponent},
    
    
    {path: 'categoria-edit/:id', component: CategoriaEditComponent},
    {path: 'categoria-delete/:id', component: CategoriaDeleteComponent},
    
    {path: 'produto-edit/:id', component: ProdutoEditComponent},
    {path: 'produto-delete/:id', component: ProdutoDeleteComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

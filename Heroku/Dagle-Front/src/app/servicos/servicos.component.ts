import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import {render} from 'creditcardpayments/creditCardPayments';


@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { 
  }

  ngOnInit() {
    window.scroll(0,0)
  }

  @ViewChild('nav', {static: true}) minhaNavbar:ElementRef;

  @HostListener('window:scroll') onWindowScroll() {
    if (window.scrollY > 100.0) { 
      this.minhaNavbar.nativeElement.style.backgroundColor = '#1d82f562';
      this.minhaNavbar.nativeElement.style.height = '9.5%'
      this.minhaNavbar.nativeElement.style.justifyContent = 'space-between';
      this.minhaNavbar.nativeElement.style.transition = '0.5s'
    } 
    else {
      this.minhaNavbar.nativeElement.style.backgroundColor = '#1d82f562';
      this.minhaNavbar.nativeElement.style.height = '11%'
      this.minhaNavbar.nativeElement.style.justifyContent = 'space-between';
      this.minhaNavbar.nativeElement.style.transition = '0.5s'
      
    }
  }

  sair(){
    this.router.navigate(['/home'])
    environment.token = ''
    environment.nome = ''
    environment.email = ''
    environment.id = 0
  }

  participar(){
    this.alertas.showAlertInfo('mensagem enviada com sucesso!')
    }

}

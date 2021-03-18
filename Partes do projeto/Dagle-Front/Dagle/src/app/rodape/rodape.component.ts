import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {

  constructor(
    private alertas: AlertasService 
  ) { }

  ngOnInit(){
  }

  participar(){
  this.alertas.showAlertInfo('mensagem enviada com sucesso!')
  }

}

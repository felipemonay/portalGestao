import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProdutosService } from './lista-produtos.service';
import { Produtos } from './lista-produtos.model';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  produtos: Produtos[];

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    ) { }

  ngOnInit() {

    this.routeActiveSrv.data.subscribe(data => {
      this.produtos = data.produtos;
      console.log('produtos', this.produtos);
    });

    window.scrollTo(0, 0);
    }

    onSubmit(proximaRota: string) {
    this.navigateTo(proximaRota);
  }

  navigateTo(route: string, parm: any = '') {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

  // FILTRO
  // getProdutos(ev: any): void {
  //   const val = ev.target.value;
  //   if (val && val.trim() != '') {
  //       this.atividades = this.atividades.filter((item) => {
  //     return (
  //       (item.numero.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //       (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
  //     );
  //   })
  //   } else {
  //   this._loadAtividades();
  //   }

}

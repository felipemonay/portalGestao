import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-dashboard2',
  templateUrl: './admin-dashboard2.component.html',
  styleUrls: ['./admin-dashboard2.component.scss']
})
export class AdminDashboard2Component implements OnInit {

  dtOptions: any = {};

  dadosJanela = {
    'descricao': 'Janela 1 de Capção: 01/09/2019 - 28/09/2019',
    'dataInicio': '01/09/2019',
    'dataFim': '28/09/2019',
    'dataAtual': '06/09/2019',
    'dadosMeta': {
      'duracao':      { 'total': 28,  'realizado': 5,  'faltantes': 23,  'completude': '17.89' },
      'matricula':    { 'total': 8,   'realizado': 5,  'faltantes': 3,  'completude': '62.5' },
      'rematricula':  { 'total': 20,  'realizado': 5,  'faltantes': 15,  'completude': '15.0' },
      'total':        { 'total': 28,  'realizado': 10,  'faltantes': 18,  'completude': '35.71' }
    }
  };

  dadosPeriodos = [
    {
      'descricao': 'Semana 1',
      'dataInicio': '01/09/2019',
      'dataFim': '07/09/2019',
      'dataAtual': '06/09/2019',
      'executado': true,
      'atual': true,
      'dadosMeta': {
        'duracao':     { 'total': 7,  'realizado': 5,  'faltantes': 2,  'completude': '71.42' },
        'matricula':   { 'total': 5,  'realizado': 2,  'faltantes': 3,  'completude': '40.00' },
        'rematricula': { 'total': 5,  'realizado': 5,  'faltantes': 0,  'completude': '100.00' },
        'total':       { 'total': 7,  'realizado': 5,  'faltantes': 2,  'completude': '71.42' }
      }
    },{
      'descricao': 'Semana 2',
      'dataInicio': '08/09/2019',
      'dataFim': '14/09/2019',
      'dataAtual': '06/09/2019',
      'executado': false,
      'atual': false,
      'dadosMeta': {
        'duracao':     { 'total': 7,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'matricula':   { 'total': 2,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'rematricula': { 'total': 5,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'total':       { 'total': 7,  'realizado': 0,  'faltantes': 23,  'completude': '0' }
      }
    },{
      'descricao': 'Semana 3',
      'dataInicio': '15/09/2019',
      'dataFim': '21/09/2019',
      'dataAtual': '06/09/2019',
      'executado': false,
      'atual': false,
      'dadosMeta': {
        'duracao':     { 'total': 7,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'matricula':   { 'total': 2,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'rematricula': { 'total': 5,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'total':       { 'total': 7,  'realizado': 0,  'faltantes': 23,  'completude': '0' }
      }
    },{
      'descricao': 'Semana 4',
      'dataInicio': '22/09/2019',
      'dataFim': '28/09/2019',
      'dataAtual': '06/09/2019',
      'executado': false,
      'atual': false,
      'dadosMeta': {
        'duracao':     { 'total': 7,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'matricula':   { 'total': 2,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'rematricula': { 'total': 5,  'realizado': 0,  'faltantes': 23,  'completude': '0' },
        'total':       { 'total': 7,  'realizado': 0,  'faltantes': 23,  'completude': '0' }
      }
    }
  ];
  
  dadosTurmas =[
    {
      'curso': 'Educacao Infantil', 
      'serie': 'G3', 
      'turno': 'Manha', 
      'turma': 'M1MA', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Educacao Infantil', 
      'serie': 'G3', 
      'turno': 'Manha', 
      'turma': 'M1MB', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Educacao Infantil', 
      'serie': 'G3', 
      'turno': 'Tarde', 
      'turma': 'M1T1', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Educacao Infantil', 
      'serie': 'G4', 
      'turno': 'Manha', 
      'turma': 'M1MA', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Educacao Infantil', 
      'serie': 'G4', 
      'turno': 'Manha', 
      'turma': 'M1MB', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Educacao Infantil', 
      'serie': 'G4', 
      'turno': 'Tarde', 
      'turma': 'M1T1', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Educacao Infantil', 
      'serie': 'G5', 
      'turno': 'Manha', 
      'turma': 'M1MA', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Educacao Infantil', 
      'serie': 'G5', 
      'turno': 'Manha', 
      'turma': 'M1MB', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Educacao Infantil', 
      'serie': 'G5', 
      'turno': 'Tarde', 
      'turma': 'M1T1', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Ensino Fundamental 1', 
      'serie': '1º Série', 
      'turno': 'Manha', 
      'turma': 'F1MA', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Ensino Fundamental 1', 
      'serie': '1º Série', 
      'turno': 'Manha', 
      'turma': 'F1MB', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    },{
      'curso': 'Ensino Fundamental 1', 
      'serie': '1º Série', 
      'turno': 'Tarde', 
      'turma': 'F1TA', 
      'capacidade': 22,
      'vagas': 2,
      'taxaOcupacao': '90.90',
      'dadosMetas': {
        'total':        {'meta': 24,  'realizado': 20,  'percentual': '83'},
        'matriculas':   {'meta': 5,   'realizado': 5,   'percentual': '100'},
        'rematriculas': {'meta': 19,  'realizado': 15,  'percentual': '79'}
      }
    }
  ];


  title = '';
  type = 'SteppedAreaChart';
  data = [
     ['Semana 1',116,120],
     ['Semana 2',58,60],
     ['Semana 3',57,0],
     ['Semana 4',57,0]
  ];
  columnNames = ['Janela', 'Meta','Realizado'];
  options = { 
     vAxis:{
        title:'Número de Matriculas'
     }  
  };
  
  constructor() { }

  ngOnInit() {
     // Actualiza la barra latera y el footer
    // AdminLTE.init();
    console.log('Dash:', this.dadosJanela);

    this.dtOptions = {
      // pagingType: 'full_numbers',
      // pageLength: 10
      language:
      {
        'sEmptyTable': 'Nenhum registro encontrado',
        'sInfo': 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
        'sInfoEmpty': 'Mostrando 0 até 0 de 0 registros',
        'sInfoFiltered': '(Filtrados de _MAX_ registros)',
        'sInfoPostFix': '',
        'sInfoThousands': '.',
        'sLengthMenu': '_MENU_ resultados por página',
        'sLoadingRecords': 'Carregando...',
        'sProcessing': 'Processando...',
        'sZeroRecords': 'Nenhum registro encontrado',
        'sSearch': 'Pesquisar',
        'oPaginate': {
            'sNext': 'Próximo',
            'sPrevious': 'Anterior',
            'sFirst': 'Primeiro',
            'sLast': 'Último'
        },
        'oAria': {
            'sSortAscending': ': Ordenar colunas de forma ascendente',
            'sSortDescending': ': Ordenar colunas de forma descendente'
        }
    },
      responsive: true
    };
    // this.http.get('data/data.json')
    // .subscribe(turmas => {
    //   this.dadosTurmas = turmas;
    //   // Calling the DT trigger to manually render the table
    //   this.dtTrigger.next();
    // });
  }

}

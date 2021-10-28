import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  lista_os: OS[] = [];

  displayedColumns: string[] = ['cliente', 'tecnico', 'abertura', /*'fechamento',*/ 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.lista_os);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
  ) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(x => {
        if(x.status != "ENCERRADO"){ //se as OS for diferente de ENCERRADO
          this.lista_os.push(x)
        }
      })

      this.listarTecnico();
      this.listarCliente();
      //console.log(this.os)
      this.dataSource = new MatTableDataSource<OS>(this.lista_os);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['os/create'])
  }

  //PEGAR NOME DOS TECNICOS NA TABELA TECNICO PARA LISTA NA OS
  listarTecnico(): void {
    this.lista_os.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome
      })
    })
  }

  //PEGAR NOME DOS CLIENTES NA TABELA CLIENTE PARA LISTA NA OS
  listarCliente(): void {
    this.lista_os.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome
      })
    })
  }

  prioridade(x: any) {
    if (x == 'BAIXA') {
      return 'baixa'
    } else if (x == 'MEDIA') {
      return 'media'
    } else {
      return 'alta'
    }
  }
}


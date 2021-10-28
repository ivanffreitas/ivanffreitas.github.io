import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl: String = environment.baseUrl;

  constructor(
    private http : HttpClient,
    private snack: MatSnackBar) { }

    //RECEBER TODOS OS TECNICOS BACK-END
  findAll():Observable<Cliente[]> {
    const url = this.baseUrl + "/clientes";
    return this.http.get<Cliente[]>(url);
  }

  //RECEBER CLIENTE BACK-END POR ID
  findById(id: any): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.get<Cliente>(url);
  }

  //PASSANDO DADOS DE UM NOVO CLIENTE PARA O BACK-END
  create(cliente: Cliente):Observable<Cliente> {
    const url = this.baseUrl + "/clientes";
    return this.http.post<Cliente>(url, cliente);
  }

  //ATUALIZAR DADOS DO CLIENTE
  update(cliente: Cliente): Observable<Cliente> {
    const url = this.baseUrl + "/clientes/" + cliente.id;
    //A LINHA ACIMA PODE SER SUBISTITUIDA POR 
    //const url2 = `${this.baseUrl}/tecnicos/${+ tecnico.id}`;
    return this.http.put<Cliente>(url, cliente);
  }

  //DELETAR CLIENTE
  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg : String): void{
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}

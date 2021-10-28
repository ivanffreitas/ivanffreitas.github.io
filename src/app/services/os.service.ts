import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OS } from '../models/os';

@Injectable({
  providedIn: 'root'
})
export class OsService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

  //RECEBER TODAS OS DO BACK-END
  findAll(): Observable<OS[]> {
    const url = this.baseUrl + "/os";
    return this.http.get<OS[]>(url);
  }
  //RECEBER OS BACK-END POR ID
  findById(id: any): Observable<OS> {
    const url = `${this.baseUrl}/os/${id}`;
    return this.http.get<OS>(url);
  }
  //PASSANDO DADOS DE UMA NOVA OS PARA O BACK-END
  create(os: OS): Observable<OS> {
    const url = this.baseUrl + "/os";
    return this.http.post<OS>(url, os);
  }

  //ATUALIZAR DADAS OS
  update(os: OS): Observable<OS> {
    const url = this.baseUrl + "/os";
    //A LINHA ACIMA PODE SER SUBISTITUIDA POR 
    //const url2 = `${this.baseUrl}/os`;
    return this.http.put<OS>(url, os);
  }
  //DELETAR OS
  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/os/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}

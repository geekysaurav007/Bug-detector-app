import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class IssueService {
  url='http://localhost:4000';
  headers!:HttpHeaders;

  constructor(private http:HttpClient,) { 
    
  }


  getIssues(){
   return this.http.get<any>(`${this.url}/issues`).pipe(map((res: any) => {
      return res;
    }))
   
  }
  getIssueById(id:any){
    return this.http.get(`${this.url}/issues/${id}`)

  }
  addIssue(title:string,responsible:string,description:string,severity:string){
    const issue={
      title:title,
      responsible:responsible,
      description:description,
      severity:severity
    };
    return this.http.post(`${this.url}/issues/add`,issue);
  }
  updateIssue(id:number,title:string,responsible:string,description:string,severity:string,status:string){
    const issue={
      title:title,
      responsible:responsible,
      description:description,
      severity:severity,
      status:status
    };
    return this.http.post(`${this.url}/issues/update/${id}`,issue);
  }
  deleteIssue(id:any){
    return this.http.get(`${this.url}/issues/delete/${id}`);

  }
}


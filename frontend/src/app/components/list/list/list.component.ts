import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/issue.service'; 
import { Router } from '@angular/router';
import { Issue } from 'src/app/issue.model';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  issues!:any[];
  displaycoloumn=['title','responsible',"description","severity",'status','action'];

  constructor(private issueservice:IssueService,private router:Router) { }

  ngOnInit(): void {
    this.fetchIssues();
    
  }
  fetchIssues(){
    this.issueservice.getIssues().subscribe((data:Issue[])=>{
      this.issues=data;
      console.log("data requested"+this.issues);
    })
  }
  editIssue(id:any){
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id:any){
    this.issueservice.deleteIssue(id).subscribe(()=>{
      alert("data deleted successfully");
      this.fetchIssues();
    })

  }
 

}

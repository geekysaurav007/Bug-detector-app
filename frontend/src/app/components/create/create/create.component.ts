
import { Component, OnInit } from '@angular/core';
import{FormGroup,Validators,FormBuilder}from '@angular/forms'
import { Router } from '@angular/router';
import { IssueService } from 'src/app/issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createform:FormGroup;

  constructor(private issue:IssueService,private router:Router,private fb:FormBuilder) {
    this.createform=this.fb.group({
      title:['',Validators.required],
      responsible:'',
      description:'',
      severity:['']
    })
    
   }
   addIssue(title:string,responsible:string,description:string,severity:string){
    this.issue.addIssue(title,responsible,description,severity).subscribe(()=>{
      
    })
    this.router.navigate(['/list'])
   }

  ngOnInit(): void {
    
  }

}

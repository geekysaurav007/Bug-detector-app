import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from 'src/app/issue.service';
import{FormBuilder,FormGroup,Validators} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { Issue } from 'src/app/issue.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!:number;
  issue:any={};
  updateform!:FormGroup

  constructor(private issueservice:IssueService,private router:Router,private fb:FormBuilder,private snackbar:MatSnackBarModule,private route:ActivatedRoute) { 
   this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id']
      
      this.issueservice.getIssueById(this.id).subscribe(res=>{
        this.issue=res;
        this.updateform.get('title')?.setValue(this.issue.title);
        this.updateform.get('responsible')?.setValue(this.issue.responsible);
        this.updateform.get('description')?.setValue(this.issue.description);
        this.updateform.get('severity')?.setValue(this.issue.severity);
        this.updateform.get('status')?.setValue(this.issue.status);
        
      })

    })
  }
  createForm():any{
    this.updateform=this.fb.group({
      title:['',Validators.required],
      responsible:'',
      description:'',
      severity:[''],
      status:''
    })
  }
  updateIssue(title:string,responsible:string,description:string,severity:string,status:string)
  {
    this.issueservice.updateIssue(this.id,title,responsible,description,severity,status).subscribe(()=>{
      alert('updated successfully');
      this.updateform.reset();
      this.router.navigate(['/list'])
    })

  }

}

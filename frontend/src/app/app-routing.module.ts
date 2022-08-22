import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create/create.component';
import { EditComponent } from './components/edit/edit/edit.component';
import { ListComponent } from './components/list/list/list.component';

const routes: Routes = [
  {path:"create",component:CreateComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'list',component:ListComponent},
  {path:'',redirectTo:'list',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

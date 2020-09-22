import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannerComponent } from '../app/components/planner/planner.component';
import { CtrlPointsComponent } from '../app/components/ctrl-points/ctrl-points.component';
import { StatusComponent } from '../app/components/status/status.component';
 

const routes: Routes = [
  {
    path:'',redirectTo:'planner',pathMatch:'full'
  },
  {
    path:'planner',component:PlannerComponent
  },
  {
    path:'ctrl-points',component:CtrlPointsComponent
  },
  {
    path:'status',component:StatusComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

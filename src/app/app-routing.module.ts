import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';




const routes: Routes = [  
  { path: '', component: LoginComponent },  
  { path: 'dashboard', component: DashboardComponent  , canActivate : [AuthGuard]   },  
  { path: 'verifyotp', component: VerifyotpComponent  , canActivate : [AuthGuard] },    
  
  //{ path: '**', component: PageNotFoundComponent }
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

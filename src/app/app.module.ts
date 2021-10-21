import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthIterceptor } from './auth-iterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    VerifyotpComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule, 
    ToastrModule.forRoot(), // ToastrModule added
  ],
  // providers: [AuthGuard], 
  providers: [AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthIterceptor,
      multi: true
    }
  ],   
  bootstrap: [AppComponent]
})
export class AppModule { }

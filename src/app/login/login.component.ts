import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errormessage:string='';
  isloading:boolean=true;
  loginform:FormGroup=new FormGroup
  ({
    email:new FormControl(null,Validators.email),
    password:new FormControl(null,Validators.required),
  })

  login()
  {
     this.spinner.show();
    this.isloading=false;
    this._AuthService.login(this.loginform.value).subscribe({
      next:(res)=>{
        if(res.message=='success')
        {
          localStorage.setItem('tokenUser',res.token);
           this.isloading=true;
           this._router.navigate(['home'])
           this._AuthService.CuurentUser();
           this.spinner.hide();
           this.toastr.success(res.message, 'Login ',{timeOut: 5000,});
        }
        else
        {
          console.log(res)
         this.errormessage =res.message;
         this.isloading=true;
         this.spinner.hide();
         this.toastr.error(res.message, 'Error ',{timeOut: 5000,});

        }
      }
    })
  }
  constructor(private _AuthService:AuthService ,private _router:Router ,private spinner: NgxSpinnerService,private toastr: ToastrService) { }

  ngOnInit(): void
  {

  }

}


// fff@maii.com
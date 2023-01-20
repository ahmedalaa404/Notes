import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
FormGroup

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errormessage:string='';
  isloading=true;

  RegisterForm:FormGroup=new FormGroup({
    first_name:new FormControl(null,Validators.required),
    last_name:new FormControl(null,Validators.required),
    age:new FormControl(null,Validators.required),
    email:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
  })



  constructor(private _AuthService:AuthService,private _router:Router,private spinner: NgxSpinnerService,private toastr: ToastrService) { }





    register()
    {
      this.spinner.show();
      this.isloading=false;
      console.log('aaa')
      this._AuthService.RegisterForm(this.RegisterForm.value).subscribe
      (
        {
          next:(res)=>
          {
            if(res.message=='success')
            {
              this.spinner.hide();
              this.toastr.success(res.message, 'Login ',{timeOut: 5000,});
              this._router.navigate(['login'])
              this.isloading=true;
            }
            else
            {
              this.spinner.hide();
              this.toastr.error(res.message, 'Error ',{timeOut: 5000,});
              this.errormessage=res.message;
              this.isloading=true;
            }
          },
        })
    }
  ngOnInit(): void 
  {
  }

}

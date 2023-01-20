
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  signup:boolean=false;
  islogin:boolean=true;
  constructor(private _AuthService:AuthService) { }


  logout()
  {
    this._AuthService.logout();
  }
  ngOnInit(): void 
  {


    this._AuthService.currentData.subscribe(()=>{
      if(this._AuthService.currentData.getValue()!=null)
      {
        this.signup=true;
        this.islogin=true
      }
      else
      {
        this.signup=false;
        this.islogin=false

      }
    }
    )
  }

}
function logout() {
  throw new Error('Function not implemented.');
}


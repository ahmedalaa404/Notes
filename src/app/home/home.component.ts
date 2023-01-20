import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { NoteService } from '../note.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  noteForm:FormGroup=new FormGroup
  ({
    title:new FormControl(null,Validators.required),
    desc:new FormControl(null,Validators.required)
  })





  arrayofNotes:any[]=[];




  id:string=this._AuthService.currentData.getValue()._id;
  token:any=localStorage.getItem('tokenUser')



  updateform:FormGroup=new FormGroup
  ({
    title:new FormControl(null,Validators.required),
    desc:new FormControl(null,Validators.required)
  })

  currentNoteId:any;
  spinner: any;
  edite(e:any)
  {
    this.currentNoteId=e;
  }
updateNote()
{
 let fullobj=
        {
          "title":this.updateform.value.title,
          "desc":this.updateform.value.desc,
          "NoteID":this.currentNoteId,
          "token":this.token
        }
        this._NoteService.updateNote(fullobj).subscribe({
          next:(response)=>
          {
            console.log(response);
            (document.getElementById('cansle-update')as HTMLElement).click();

            this.getallnotes();
          }
        })
}



  addNote()
  {
    let fullobj={
    title:this.noteForm.value?.['title'],
    desc:this.noteForm.value?.['desc'],
    citizenID:this.id,
    token:this.token
    }
    this._NoteService.addNote(fullobj).subscribe({
      next:(response)=>{
        this.getallnotes();
        (document.getElementById('cansle')  as HTMLElement).click();
        this._ToastrService.success('Added successfully','Success message')
      }
    })
    console.log(fullobj)
  }

        idNoteDelete:any;
        delete(e:any)
        { 
          this.idNoteDelete=e;
        }

        deleteNote()
        {
          let data=
          {
            body:
            {
              "NoteID":this.idNoteDelete,
              "token":this.token
            }
          }
          this._NoteService.deleteNote(data).subscribe({
            next:(res)=>{
              console.log(res);
             (document.getElementById('closeDelete') as HTMLElement).click();
             this.getallnotes();
             this._ToastrService.success('Success message','Deleted successfully')
          }
          })
        }

  getallnotes()
  {
    let fullobj={
    "token":this.token,
    "userID":this.id,
    }
    this._NoteService.getnotes(fullobj).subscribe({
      next:(response)=>
      {
        this.arrayofNotes=response.Notes;
        console.log( this.arrayofNotes);
      }
    })
  }
  constructor(private _NoteService:NoteService,private _AuthService:AuthService,private _ToastrService:ToastrService) { }

  ngOnInit(): void
   {
    this.getallnotes();
   }

}

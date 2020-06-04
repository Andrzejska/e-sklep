import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  private errorMessage: string = null;

  private email: string = null;
  private password: string = null;

  constructor(
    private authenticationService: AuthenticationService, private router: Router
  ) { }

  ngOnInit() {
    this.authenticationService.eventAuthError$.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  isError(): boolean {
    return this.errorMessage != null;
  }

  private async loginUser() {
    var url = "http://localhost:3000/api/" + this.email + '/' + this.password;
    var response = await getData(url);
    console.log(await response);
    //  this.authenticationService.LogIn(this.email, this.password);
    this.router.navigate(['components/home']);
  }



}
const getData = async function (url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
    }).then(async (response) => {
      console.log(response);
      return await response;
    })
  } catch (error) {
    console.log(error);
  }
};


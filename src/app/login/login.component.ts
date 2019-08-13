import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  submit(): void {
    const username = this.loginForm.get("username").value;
    const password = this.loginForm.get("password").value;

    this.loginService
      .login(username, password)
      .then(response => {
        localStorage.setItem("token", response.token);
        this.router.navigate(["dashboard"]);
      })
      .catch(error => {
        alert(error.error.message);
      });
  }

  ngOnInit() {}
}

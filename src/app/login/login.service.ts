import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Endpoint } from "../endpoint";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  endpoint = new Endpoint();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<any> {
    return this.http
      .post(this.endpoint.auth("login"), {
        username: username,
        password: password
      })
      .toPromise();
  }
}

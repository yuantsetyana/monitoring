import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { LoginModule } from "./login/login.module";
import { HttpClientModule } from "@angular/common/http";
import { DashboardModule } from "./dashboard/dashboard.module";
import { MqttService } from "ngx-mqtt";

const routes: Routes = [{ path: "**", redirectTo: "login", pathMatch: "full" }];
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgbModule,
        LoginModule,
        DashboardModule
    ],
    providers: [MqttService],
    bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule, Injector } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
    NgbTabsetModule,
    NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { FormsModule } from "@angular/forms";

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: "smartkwh.online",
    port: 3000,
    protocol: "ws",
    username: "fakhri",
    password: "1234"
};

const route: Routes = [{ path: "dashboard", component: DashboardComponent }];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        NgbPaginationModule,
        NgbTabsetModule,
        RouterModule.forChild(route),
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
    ]
})
export class DashboardModule {}

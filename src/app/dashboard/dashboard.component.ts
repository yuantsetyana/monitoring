import { Component, OnInit, OnDestroy } from "@angular/core";
import { MqttService, IMqttMessage } from "ngx-mqtt";
import { Subscription } from "rxjs";
import { Observable } from "rxjs";
import { DashboardService } from "./dashboard.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public message: string;
    public data = [];
    public block = [];
    public selectedBlock: any;
    public listHistory = [];
    itemsPerPage: number;
    totalItems: any;
    page = 1;
    previousPage: any;
    maxSize = 6;

    constructor(
        private _mqttService: MqttService,
        private _dashboardService: DashboardService,
        private router: Router
    ) {
        this.subscription = this._mqttService
            .observe("push")
            .subscribe((message: IMqttMessage) => {
                this.message = message.payload.toString();
                if (this.message.length > 0) {
                    const newMessage = this.message.replace(/\?/g, "/");
                    const arrMessage = newMessage.split("/");
                    const newPayload = {
                        blok_id: arrMessage[0] ? arrMessage[0] : 0,
                        tanggal: arrMessage[1] ? arrMessage[1] : 0,
                        waktu: arrMessage[2] ? arrMessage[2] : 0,
                        va: arrMessage[3] ? arrMessage[3] : 0,
                        vb: arrMessage[4] ? arrMessage[4] : 0,
                        vc: arrMessage[5] ? arrMessage[5] : 0,
                        vab: arrMessage[6] ? arrMessage[6] : 0,
                        vbc: arrMessage[7] ? arrMessage[7] : 0,
                        vca: arrMessage[8] ? arrMessage[8] : 0,
                        ia: arrMessage[9] ? arrMessage[9] : 0,
                        ib: arrMessage[10] ? arrMessage[10] : 0,
                        ic: arrMessage[11] ? arrMessage[11] : 0,
                        pa: arrMessage[12] ? arrMessage[12] : 0,
                        pb: arrMessage[13] ? arrMessage[13] : 0,
                        pc: arrMessage[14] ? arrMessage[14] : 0,
                        pt: arrMessage[15] ? arrMessage[15] : 0,
                        pfa: arrMessage[16] ? arrMessage[16] : 0,
                        pfb: arrMessage[17] ? arrMessage[17] : 0,
                        pfc: arrMessage[18] ? arrMessage[18] : 0,
                        ep: arrMessage[19] ? arrMessage[19] : 0,
                        eq: arrMessage[20] ? arrMessage[20] : 0
                    };
                    this.data.unshift(newPayload);
                }
            });
    }

    ngOnInit() {
        this.loadBlock();
    }

    loadData(page: number) {
        if (page) {
            this.loadHistory(page);
        }
    }

    loadHistory(page: number) {
        this._dashboardService
            .loadHistory(page, this.selectedBlock, 20)
            .then(response => {
                this.listHistory = response.data;
                this.itemsPerPage = response.per_page;
                this.totalItems = response.total;
                console.log(this.totalItems);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        console.log(this.selectedBlock);
    }

    loadBlock() {
        this._dashboardService
            .loadBlock()
            .then(response => {
                this.block = response;
                console.log(response);
            })
            .catch(error => {
                this.block = [];
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    logout() {
        this.router.navigate(["login"]);
    }
}

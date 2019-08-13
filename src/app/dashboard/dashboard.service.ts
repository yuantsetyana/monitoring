import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Endpoint } from "../endpoint";

@Injectable({
    providedIn: "root"
})
export class DashboardService {
    private endpoint = new Endpoint();
    constructor(private http: HttpClient) {}

    loadHistory(page: number, blokId: number, size: number): Promise<any> {
        const httpParams = new HttpParams()
            .set("blokId", blokId.toString())
            .set("page", page.toString())
            .set("size", size.toString());

        return this.http
            .get(this.endpoint.history(), { params: httpParams })
            .toPromise();
    }

    loadBlock(): Promise<any> {
        return this.http.get(this.endpoint.block()).toPromise();
    }
}

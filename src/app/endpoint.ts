export class Endpoint {
    baseUrl = "http://api.smartkwh.online";

    auth(action: string): string {
        return this.baseUrl + "/api/auth/" + action;
    }

    history(): string {
        return this.baseUrl + "/history";
    }

    block(): string {
        return this.baseUrl + "/block";
    }
}

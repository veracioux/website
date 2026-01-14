import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";

@Injectable()
export class AgentService {
  constructor(private httpService: HttpService) {}

  prompt() {
    // TODO
    return of("Hello from AgentService");
  }
}

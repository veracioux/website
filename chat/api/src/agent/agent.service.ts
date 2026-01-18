import { Injectable } from "@nestjs/common";
import { of } from "rxjs";

@Injectable()
export class AgentService {
  constructor() {}

  prompt() {
    // TODO
    return of("Hello from AgentService");
  }
}

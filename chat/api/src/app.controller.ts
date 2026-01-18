import { TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("App")
@Controller()
export class AppController {
  constructor() {}

  @TypedRoute.Get("status")
  status() {
    return { status: "ok" };
  }
}

import { application } from "./application/server";

(async() => {
  await application.init();
})();
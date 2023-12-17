import { application } from "./application/server";

(async() => {
  try {
    await application.init();  
  } catch (error) {
    console.error(error);
  }
})();
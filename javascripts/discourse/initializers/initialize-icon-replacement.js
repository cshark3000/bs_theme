import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  api.replaceIcon("bell", "bs-bell");
});

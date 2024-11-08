import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  api.replaceIcon("d-tracking", "bs-bell");
  api.replaceIcon("d-watching-first", "bs-bell-one");
  api.replaceIcon("d-watching", "bs-bell-explanation");
  api.replaceIcon("d-muted", "bs-bell-slash");
  api.replaceIcon("d-regular", "bs-far-bell");
});

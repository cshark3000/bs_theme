import { apiInitializer } from "discourse/lib/api";
import CustomHeaderLinks from "../components/custom-header-links";
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: `custom-header-links`,
  initialize(container) {
    withPluginApi("1.29.0",  (api) => {
      renderCustomHeaderLinks(api);
    });
  },
};

 function renderCustomHeaderLinks(api) {
  const user = api.getCurrentUser();
  const username = user ? user.username : null;
  api.renderInOutlet("before-header-panel", <template>
    <CustomHeaderLinks @username={{username}}/>
  </template>);
}

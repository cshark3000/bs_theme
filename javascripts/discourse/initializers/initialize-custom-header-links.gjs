import { apiInitializer } from "discourse/lib/api";
import CustomHeaderLinks from "../components/custom-header-links";
import { withPluginApi } from "discourse/lib/plugin-api";
// export default apiInitializer("1.14.0", (api) => {
//   api.renderInOutlet("before-header-panel", CustomHeaderLinks);
// });

export default {
  name: `custom-header-links`,
  initialize(container) {
    withPluginApi("1.29.0", (api) => {
      renderCustomHeaderLinks(api);
    });
  },
};

function renderCustomHeaderLinks(api) {
  const user = api.getCurrentUser();
  console.log(user);
  api.renderInOutlet("before-header-panel", <template>
    <CustomHeaderLinks @email={{user.email}}/>
  </template>);
}

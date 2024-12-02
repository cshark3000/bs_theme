import { apiInitializer } from "discourse/lib/api";
import CustomHeaderLinks from "../components/custom-header-links";
import { withPluginApi } from "discourse/lib/plugin-api";
// export default apiInitializer("1.14.0", (api) => {
//   api.renderInOutlet("before-header-panel", CustomHeaderLinks);
// });

export default {
  name: `custom-header-links`,
  initialize(container) {
    withPluginApi("1.29.0",  (api) => {
     // const userStatus = Promise.resolve(getUserInfo(api));
     // console.log(userStatus);
      renderCustomHeaderLinks(api);
    });
  },
};

// async function getUserInfo(api){
//   const user = api.getCurrentUser();
//   //const email = await fetch(`https://forum.brokensun.com/u/${this.args.username}/emails.json`).then(res=>res.json()).then(data=>data.email);
//   const email = await fetch(
//    `https://discourse.theme-creator.io/u/${user.username}/emails.json`
//  )
//    .then((res) => res.json())
//    .then((data) => data.email);
//    //console.log(email)
//  const userStatus =  await fetch(
//    `https://brokensun.com/local/api/check_status.php?email=${email}&key=JgEp4cwld3t0wAGi`
//  )
//    .then((res) => res.json())
//    .then((data) => data.checked_status);

// //console.log(userStatus);
// return userStatus;
// }

 function renderCustomHeaderLinks(api) {
  const user = api.getCurrentUser();
  const username = user ? user.username : null;
  api.renderInOutlet("before-header-panel", <template>
    <CustomHeaderLinks @username={{username}}/>
  </template>);
}

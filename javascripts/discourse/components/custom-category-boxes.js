import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class extends Component {
  @service router;
  @service site;

  get classNames() {
    const classNames = ["custom-category-boxes-container"];

    if (this.noneSelected) {
      classNames.push("none-selected");
    }

    return classNames.join(" ");
  }

  get shouldRenderHeadings() {
    let isCategoryPage = this.router.currentRoute.name.includes("category");
    let hasCategoriesSet = false;

    if (!isCategoryPage && hasCategoriesSet) {
      return true;
    } else {
      return false;
    }
  }

  get noneSelected() {
    return this.router.currentRoute.name.includes("None");
  }
}

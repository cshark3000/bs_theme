import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

const websiteLink = {
  text: "Сайт",
  title: "website",
  url: "https://brokensun.com",
  target: "blank",
  hide_on_scroll: "keep",
  locale: "ru",
  view: "vdm",
};

const signupLink =  {
  text: "РЕГИСТРАЦИЯ",
  title: "signup",
  status: "Регистрация",
  url: "https://forum.brokensun.com/signup",
  target: "blank",
  hide_on_scroll: "keep",
  locale: "ru",
  view: "vdm",
};

const mainLinks = [
  {
    text: "ИГРАТЬ",
    title: "game",
    status: "Играть",
    url: "https://client.brokensun.com",
    target: "blank",
    hide_on_scroll: "keep",
    locale: "ru",
    view: "vdm",
  },
  {
    text: "ХОЧУ НА ЗБТ",
    title: "cbt",
    status: "Хочу на ЗБТ",
    url: "https://brokensun.com/ru/pre-registration/new_request/",
    target: "blank",
    hide_on_scroll: "keep",
    locale: "ru",
    view: "vdm",
  },
  {
    text: "ХОЧУ НА ЗБТ",
    title: "cbt",
    status: "Регистрация",
    url: "https://brokensun.com/ru/pre-registration/new_request/",
    target: "blank",
    hide_on_scroll: "keep",
    locale: "ru",
    view: "vdm",
  },
  {
    text: "СТАТУС ЗАЯВКИ",
    title: "checking",
    status: "Статус Заявки",
    url: "https://brokensun.com/ru/checking/",
    target: "blank",
    hide_on_scroll: "keep",
    locale: "ru",
    view: "vdm",
  },
];

export default class CustomHeaderLinks extends Component {
  @tracked userStatus = null;

  get mainLink() {
    let mainLink;
    if (!this.args.username) {
      mainLink = signupLink;
    } else {
      mainLink = mainLinks.filter((link) => link.status === this.userStatus)[0];
    }

    return mainLink;
  }

  @action
  async getUserStatus() {
    console.log(2);
    let userStatus;
    if (this.args.username) {
      console.log(3)
      const email = await fetch(
          // `https://discourse.theme-creator.io/u/${this.args.username}/emails.json`
        `https://forum.brokensun.com/u/${this.args.username}/emails.json`
      )
        .then((res) => res.json())
        .then((data) => data.email);
      userStatus = await fetch(
        `https://brokensun.com/local/api/check_status.php?email=${email}&key=JgEp4cwld3t0wAGi`
      )
        .then((res) => res.json())
        .then((data) => data.checked_status);
      this.userStatus = userStatus;
    } else {
      console.log(4)
      userStatus = "Регистрация";
      this.userStatus = "Регистрация";
    }

    return userStatus;
  }

  get links() {
    return [this.mainLink, websiteLink].reduce((result, link) => {
      const linkText = link.text;
      const linkTitle = link.title;
      const linkHref = link.url;
      const target = link.target;
      const hideOnScroll = link.hide_on_scroll;
      const locale = link.locale;
      const device = link.view;

      const linkClass = `${linkTitle}-custom-header-links`; // legacy name

      const anchorAttributes = {
        title: linkTitle,
        href: linkHref,
        target: target === "self" ? "" : "_blank",
      };

      result.push({
        device: `headerLink--${device}`,
        hideOnScroll: `headerLink--${hideOnScroll}`,
        locale: locale ? `headerLink--${locale}` : null,
        linkClass,
        anchorAttributes,
        linkText,
      });
      return result;
    }, []);
  }
}

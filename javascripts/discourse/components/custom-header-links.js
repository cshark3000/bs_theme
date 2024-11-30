import Component from "@glimmer/component";
import { apiInitializer } from "discourse/lib/api";

const websiteLink= {
  text:"Сайт",
  title:"website",
  url: "https://brokensun.com",
  target:"blank",
  hide_on_scroll:"keep",
  locale:"ru",
  view:"vdm"
};

const mainLinks = [
  {
    text:"ИГРАТЬ",
    title:"game",
    status:"Играть",
    url: "https://client.brokensun.com",
    target:"blank",
    hide_on_scroll:"keep",
    locale:"ru",
    view:"vdm"
  },
  {
    text:"Хочу на ЗБТ",
    title:"cbt",
    status: "Хочу на ЗБТ",
    url: "https://brokensun.com/ru/pre-registration/new_request/",
    target:"blank",
    hide_on_scroll:"keep",
    locale:"ru",
    view:"vdm"
  },
  {
    text:"РЕГИСТРАЦИЯ",
    title:"signup",
    status:"Регистрация",
    url: "https://forum.brokensun.com/sigup",
    target:"blank",
    hide_on_scroll:"keep",
    locale:"ru",
    view:"vdm"
  },
  {
    text:"СТАТУС ЗАЯВКИ",
    title:"checking",
    status:"Статус заявки",
    url: "https://brokensun.com/ru/checking/",
    target:"blank",
    hide_on_scroll:"keep",
    locale:"ru",
    view:"vdm"
  },

];

export default class CustomHeaderLinks extends Component {
  get shouldShow() {
    return true;
  }

 get userEmail(){
  return this.fetchEmail();
}

async fetchEmail() {
  const email = await fetch(`https://forum.brokensun.com/u/${this.args.username}/emails.json`).then(res=>res.json()).then(data=>data.email);
 //const email = await fetch(`https://discourse.theme-creator.io/u/${this.args.username}/emails.json`).then(res=>res.json()).then(data=>data.email);
   return email;
}

  async fetchUserStatus() {
const email = await this.fetchEmail();
console.log(email);
    const status = await fetch(`https://brokensun.com/local/api/check_status.php?email=${email}&key=JgEp4cwld3t0wAGi`).then(res =>  res.json()).then(data =>data.checkedStatus);
    return status;
  }

  get mainLink(){
   return mainLinks.filter(link=>link.status===this.fetchUserStatus());
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

      if (!linkText || (locale && document.documentElement.lang !== locale)) {
        return result;
      }

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
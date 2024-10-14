declare module "*.module.scss" {
    const content: {[className: string]: string};
    export = content;
}


declare interface MainMenuItem {
    icon?: string[],
    name: string,
    rus: string,
    path: string,
    chuldren?: MainMenuItem[]
}
declare type MainMenuData = MainMenuItem[];

declare module '*.jpg';
declare module '*.svg';
declare module '*.jpeg';



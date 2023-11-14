import { greeting } from "my-lib/common";

greeting.where = "browser " + navigator.userAgent;

export * from "my-lib/common";

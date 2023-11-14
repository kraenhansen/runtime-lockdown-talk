import { greeting } from "my-lib/common";

greeting.where = "Node.js " + process.versions.node;

export * from "my-lib/common";

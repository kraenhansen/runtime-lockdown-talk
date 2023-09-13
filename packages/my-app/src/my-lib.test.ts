import { describe, expect, it } from "vitest";
import { greet } from "my-lib";

describe("my-lib", () => {
  it("works", () => {
    const greeting = greet();
    console.log({ greeting });
    expect(greeting).toContain("Hello from Node");
  });
});

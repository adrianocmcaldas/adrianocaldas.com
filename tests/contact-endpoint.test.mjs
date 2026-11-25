// The contact form's address: the MainServer platform function, never the AWS Lambda removed on 2026-11-24
// (a build that still called it would show the visitor an error on every submission).
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const platformFunction = "https://fn-z9apn7.general.cinteca.space/";
const removedLambda = /lambda-url\.[a-z0-9-]+\.on\.aws|u33x6xbn7dq2l5jn66hvv7ovc40bgiye/;

async function filesUnder(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
    if (entry.isDirectory()) found.push(...(await filesUnder(path)));
    else found.push(path);
  }
  return found;
}

test("the default contact address is the platform function", async () => {
  const source = await readFile(new URL("../app/contact-form.tsx", import.meta.url), "utf8");
  const declared = source.match(/const defaultContactEndpoint =\s*"([^"]+)"/);

  assert.ok(declared, "app/contact-form.tsx declares the contact function's address");
  assert.equal(declared[1], platformFunction);
});

test("no site source or build setting names the removed Lambda", async () => {
  const files = [
    ...(await filesUnder(new URL("../app/", import.meta.url))),
    new URL("../next.config.ts", import.meta.url),
  ];

  for (const file of files) {
    assert.doesNotMatch(await readFile(file, "utf8"), removedLambda, file.pathname);
  }
});

test("the build calls the platform function and not the removed Lambda", async () => {
  const files = (await filesUnder(new URL("../dist/", import.meta.url))).filter((file) =>
    /\.(?:m?js|html|txt|json)$/.test(file.pathname),
  );
  let mentions = 0;

  assert.ok(files.length > 0, "npm test builds dist/ first");
  for (const file of files) {
    const text = await readFile(file, "utf8");
    assert.doesNotMatch(text, removedLambda, file.pathname);
    if (text.includes(platformFunction)) mentions += 1;
  }
  assert.ok(mentions > 0, "the built client code holds the platform function's address");
});

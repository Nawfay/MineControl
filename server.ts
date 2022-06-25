//Deno.chdir("/home/nawaf/Documents/GitHub/mine/minecraft");
import {
  readableStreamFromReader,
  writableStreamFromWriter,
} from "https://deno.land/std/streams/conversion.ts";
import { mergeReadableStreams } from "https://deno.land/std@0.144.0/streams/merge.ts";
import { TextLineStream } from "https://deno.land/std@0.144.0/streams/mod.ts";

import { serve } from "https://deno.land/std@0.96.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.96.0/http/file_server.ts";
import { Sono } from "https://deno.land/x/sono@v1.1/mod.ts"

const server = serve({ port: 8080 });
const sono = new Sono();

const process = Deno.run({cmd: ["/usr/lib/jvm/java-1.17.0-openjdk-amd64/bin/java" ,"-jar", "paper.jar", "--nogui"], cwd: "./minecraft",stdout: "piped",
  stdin: "piped",});

const lines = process.stdout!.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

async function iterate() {
  console.log("called");

  for await (const line of lines) {
    sono.emit(line);
  }
}


for await (const req of server) {

    if (req.method === "GET" && req.url === "/") {
    const path = `${Deno.cwd()}/static/index.html`
    const content = await serveFile(req, path);
    req.respond(content)
  }
  else if (req.method === "GET" && req.url === "/ws") {
    sono.connect(req, () => {
      sono.emit("Your and isiot")
      iterate()
      sono.emit("Your and isiot")
      console.log("r");
      sono.emit("Your and isiot")
    });
  }
  else if (req.method === "GET" && req.url === "/favicon.ico") {
    // Do nothing in case of favicon request
    continue;
  }
  else if (req.url === "/main.js") {
    const path = `${Deno.cwd()}/static/main.js`

    const content = await serveFile(req, path);
    req.respond(content)
  }
  else if (req.method === "GET" && req.url === "/mod.js"){
    const path = `${Deno.cwd()}/sono/mod.js`;
    const content = await serveFile(req, path);
    req.respond(content)
  }
  else if (req.method === "GET" && req.url === "/src/server.ts"){
    const path = `${Deno.cwd()}/sono/src/server.ts`;
    const content = await serveFile(req, path);
    req.respond(content)
  }
  else if (req.method === "GET" && req.url === "/src/sonoClient.js"){
    const path = `${Deno.cwd()}/sono/src/sonoClient.js`;
    const content = await serveFile(req, path);
    req.respond(content)
  }
  else if (req.method === "GET" && req.url === "/src/sonoRTC.js"){
    const path = `${Deno.cwd()}/sono/src/sonoRTC.js`;
    const content = await serveFile(req, path);
    req.respond(content)
  }
}

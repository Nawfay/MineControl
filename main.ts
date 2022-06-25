//Deno.chdir("/home/nawaf/Documents/GitHub/mine/minecraft");

import { TextLineStream } from "https://deno.land/std@0.144.0/streams/mod.ts";

const process = Deno.run({cmd: ["/usr/lib/jvm/java-1.17.0-openjdk-amd64/bin/java" ,"-jar", "paper.jar", "--nogui"], cwd: "./minecraft",stdout: "piped",
  stdin: "piped",});
//const rawOutput = new TextDecoder().decode(await process.output())
//console.log(rawOutput);


const lines = process.stdout!.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());


for await (const line of lines) {
  console.log(line);
}

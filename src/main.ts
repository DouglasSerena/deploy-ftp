import core from "@actions/core";
import { deployFtp } from "./deploy-ftp";

async function main() {
  try {
    await deployFtp({
      host: core.getInput("server"),
      password: core.getInput("server"),
      user: core.getInput("server"),
      localDir: core.getInput("local-dir"),
      serverDir: core.getInput("server-dir"),
      port: Number.parseInt(core.getInput("port")),
      secure: core.getInput("secure"),
      ServerDirClear: core.getInput("server-dir-clear").toLowerCase() === "true",
      error: (error) => {
        console.log(error.name, error.message);
      },
    });
  } catch (error) {
    core.setFailed(error);
  }
}

main();

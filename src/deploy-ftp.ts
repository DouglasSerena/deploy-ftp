import { promisify } from "util";
import glob from "glob";
import path from "path";
import FPT from "ftp";
import fs from "fs";
const globPromisify = promisify(glob);

interface IConfigDeploy extends FPT.Options {
  host: string;
  user: string;
  password: string;
  localDir?: string;
  serverDir?: string;
  ServerDirClear?: boolean;
  error?: (error: Error) => void;
}

export async function deployFtp(config: IConfigDeploy) {
  return await new Deploy(config).publish();
}

export class Deploy extends FPT {
  constructor(private config: IConfigDeploy) {
    super();
    config.localDir = config.localDir || "./";
    config.serverDir = config.serverDir || "./";
  }

  async publish() {
    await this.connectAsync();

    const localDir = this.config.localDir;
    const serverDir = this.config.serverDir;
    const filesPath: string[] = await globPromisify(path.resolve(localDir, "**/*.*"));

    const files = filesPath.map((filePath) => ({
      name: path.basename(filePath),
      dir: path.relative(path.resolve(localDir), path.dirname(filePath)),
      absolute: filePath,
    }));

    if (this.config.ServerDirClear) {
      await this.deleteDirAsync(serverDir, true);
    }
    if (!(await this.existDirAsync(serverDir))) {
      await this.mkdirAsync(serverDir);
    }

    for await (let file of files) {
      let destDirPath = `${serverDir}/${file.dir}`;
      if (destDirPath.endsWith("/")) {
        destDirPath = destDirPath.substring(0, destDirPath.length - 1);
      }
      let destPath = `${destDirPath}/${file.name}`;
      if (!(await this.existDirAsync(destDirPath))) {
        await this.mkdirAsync(destDirPath);
      }

      await this.saveAsync(fs.createReadStream(file.absolute), destPath);
    }

    this.end();
  }

  connectAsync() {
    return new Promise((resolve) => {
      this.on("ready", (args) => {
        resolve(args);
      });
      super.connect(this.config);
    });
  }

  saveAsync(
    input: string | NodeJS.ReadableStream | Buffer,
    destPath: string,
    overwrite: boolean = true
  ) {
    return new Promise(async (resolve) => {
      if (overwrite) {
        if (await this.existFileAsync(destPath)) {
          await this.deleteAsync(destPath);
        }
      }

      super.put(input, destPath, (error) => {
        if (error) {
          this.config.error?.(error);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  mkdirAsync(pathDir: string, resucse: boolean = true) {
    return new Promise((resolve) => {
      super.mkdir(pathDir, resucse, (error) => {
        if (error) {
          this.config.error?.(error);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  async deleteAsync(path: string) {
    if (!(await this.existFileAsync(path))) {
      return false;
    }
    return await new Promise((resolve, reject) => {
      super.delete(path, (error) => {
        if (error) {
          this.config.error?.(error);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  async deleteDirAsync(path: string, resucse: boolean = false) {
    if (!(await this.existDirAsync(path))) {
      return false;
    }
    return await new Promise((resolve) => {
      super.rmdir(path, resucse, (error) => {
        if (error) {
          this.config.error?.(error);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  existFileAsync(pathFile: string) {
    return new Promise((resolve) => {
      this.get(pathFile, (error) => {
        if (error) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  existDirAsync(pathDir: string) {
    return new Promise((resolve) => {
      this.list(pathDir, (error) => {
        if (error) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}

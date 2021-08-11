var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "util", "glob", "path", "ftp", "fs"], function (require, exports, util_1, glob_1, path_1, ftp_1, fs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Deploy = exports.deployFtp = void 0;
    glob_1 = __importDefault(glob_1);
    path_1 = __importDefault(path_1);
    ftp_1 = __importDefault(ftp_1);
    fs_1 = __importDefault(fs_1);
    var globPromisify = util_1.promisify(glob_1.default);
    function deployFtp(config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Deploy(config).publish()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    exports.deployFtp = deployFtp;
    var Deploy = /** @class */ (function (_super) {
        __extends(Deploy, _super);
        function Deploy(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            config.localDir = config.localDir || "./";
            config.serverDir = config.serverDir || "./";
            return _this;
        }
        Deploy.prototype.publish = function () {
            var e_1, _a;
            return __awaiter(this, void 0, void 0, function () {
                var localDir, serverDir, filesPath, files, files_1, files_1_1, file, destDirPath, destPath, e_1_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.connectAsync()];
                        case 1:
                            _b.sent();
                            localDir = this.config.localDir;
                            serverDir = this.config.serverDir;
                            return [4 /*yield*/, globPromisify(path_1.default.resolve(localDir, "**/*.*"))];
                        case 2:
                            filesPath = _b.sent();
                            files = filesPath.map(function (filePath) { return ({
                                name: path_1.default.basename(filePath),
                                dir: path_1.default.relative(path_1.default.resolve(localDir), path_1.default.dirname(filePath)),
                                absolute: filePath,
                            }); });
                            if (!this.config.ServerDirClear) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.deleteDirAsync(serverDir, true)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [4 /*yield*/, this.existDirAsync(serverDir)];
                        case 5:
                            if (!!(_b.sent())) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.mkdirAsync(serverDir)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7:
                            _b.trys.push([7, 16, 17, 22]);
                            files_1 = __asyncValues(files);
                            _b.label = 8;
                        case 8: return [4 /*yield*/, files_1.next()];
                        case 9:
                            if (!(files_1_1 = _b.sent(), !files_1_1.done)) return [3 /*break*/, 15];
                            file = files_1_1.value;
                            destDirPath = serverDir + "/" + file.dir;
                            if (destDirPath.endsWith("/")) {
                                destDirPath = destDirPath.substring(0, destDirPath.length - 1);
                            }
                            destPath = destDirPath + "/" + file.name;
                            return [4 /*yield*/, this.existDirAsync(destDirPath)];
                        case 10:
                            if (!!(_b.sent())) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.mkdirAsync(destDirPath)];
                        case 11:
                            _b.sent();
                            _b.label = 12;
                        case 12: return [4 /*yield*/, this.saveAsync(fs_1.default.createReadStream(file.absolute), destPath)];
                        case 13:
                            _b.sent();
                            _b.label = 14;
                        case 14: return [3 /*break*/, 8];
                        case 15: return [3 /*break*/, 22];
                        case 16:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 22];
                        case 17:
                            _b.trys.push([17, , 20, 21]);
                            if (!(files_1_1 && !files_1_1.done && (_a = files_1.return))) return [3 /*break*/, 19];
                            return [4 /*yield*/, _a.call(files_1)];
                        case 18:
                            _b.sent();
                            _b.label = 19;
                        case 19: return [3 /*break*/, 21];
                        case 20:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 21: return [7 /*endfinally*/];
                        case 22:
                            this.end();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Deploy.prototype.connectAsync = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.on("ready", function (args) {
                    resolve(args);
                });
                _super.prototype.connect.call(_this, _this.config);
            });
        };
        Deploy.prototype.saveAsync = function (input, destPath, overwrite) {
            var _this = this;
            if (overwrite === void 0) { overwrite = true; }
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!overwrite) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.existFileAsync(destPath)];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.deleteAsync(destPath)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _super.prototype.put.call(this, input, destPath, function (error) {
                                var _a, _b;
                                if (error) {
                                    (_b = (_a = _this.config).error) === null || _b === void 0 ? void 0 : _b.call(_a, error);
                                    resolve(false);
                                }
                                resolve(true);
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        Deploy.prototype.mkdirAsync = function (pathDir, resucse) {
            var _this = this;
            if (resucse === void 0) { resucse = true; }
            return new Promise(function (resolve) {
                _super.prototype.mkdir.call(_this, pathDir, resucse, function (error) {
                    var _a, _b;
                    if (error) {
                        (_b = (_a = _this.config).error) === null || _b === void 0 ? void 0 : _b.call(_a, error);
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        };
        Deploy.prototype.deleteAsync = function (path) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.existFileAsync(path)];
                        case 1:
                            if (!(_a.sent())) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    _super.prototype.delete.call(_this, path, function (error) {
                                        var _a, _b;
                                        if (error) {
                                            (_b = (_a = _this.config).error) === null || _b === void 0 ? void 0 : _b.call(_a, error);
                                            resolve(false);
                                        }
                                        resolve(true);
                                    });
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Deploy.prototype.deleteDirAsync = function (path, resucse) {
            if (resucse === void 0) { resucse = false; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.existDirAsync(path)];
                        case 1:
                            if (!(_a.sent())) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, new Promise(function (resolve) {
                                    _super.prototype.rmdir.call(_this, path, resucse, function (error) {
                                        var _a, _b;
                                        if (error) {
                                            (_b = (_a = _this.config).error) === null || _b === void 0 ? void 0 : _b.call(_a, error);
                                            resolve(false);
                                        }
                                        resolve(true);
                                    });
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Deploy.prototype.existFileAsync = function (pathFile) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.get(pathFile, function (error) {
                    if (error) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        };
        Deploy.prototype.existDirAsync = function (pathDir) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.list(pathDir, function (error) {
                    if (error) {
                        resolve(false);
                    }
                    resolve(true);
                });
            });
        };
        return Deploy;
    }(ftp_1.default));
    exports.Deploy = Deploy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LWZ0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXBsb3ktZnRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtBLElBQU0sYUFBYSxHQUFHLGdCQUFTLENBQUMsY0FBSSxDQUFDLENBQUM7SUFZdEMsU0FBc0IsU0FBUyxDQUFDLE1BQXFCOzs7OzRCQUM1QyxxQkFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBQTs0QkFBekMsc0JBQU8sU0FBa0MsRUFBQzs7OztLQUMzQztJQUZELDhCQUVDO0lBRUQ7UUFBNEIsMEJBQUc7UUFDN0IsZ0JBQW9CLE1BQXFCO1lBQXpDLFlBQ0UsaUJBQU8sU0FHUjtZQUptQixZQUFNLEdBQU4sTUFBTSxDQUFlO1lBRXZDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7WUFDMUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQzs7UUFDOUMsQ0FBQztRQUVLLHdCQUFPLEdBQWI7Ozs7OztnQ0FDRSxxQkFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUE7OzRCQUF6QixTQUF5QixDQUFDOzRCQUVwQixRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7NEJBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQzs0QkFDWixxQkFBTSxhQUFhLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBQTs7NEJBQTNFLFNBQVMsR0FBYSxTQUFxRDs0QkFFM0UsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxDQUFDO2dDQUN6QyxJQUFJLEVBQUUsY0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0NBQzdCLEdBQUcsRUFBRSxjQUFJLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDbEUsUUFBUSxFQUFFLFFBQVE7NkJBQ25CLENBQUMsRUFKd0MsQ0FJeEMsQ0FBQyxDQUFDO2lDQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUExQix3QkFBMEI7NEJBQzVCLHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFBOzs0QkFBMUMsU0FBMEMsQ0FBQzs7Z0NBRXZDLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUE7O2lDQUFyQyxDQUFDLENBQUMsU0FBbUMsQ0FBQyxFQUF0Qyx3QkFBc0M7NEJBQ3hDLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUE7OzRCQUFoQyxTQUFnQyxDQUFDOzs7OzRCQUdaLFVBQUEsY0FBQSxLQUFLLENBQUE7Ozs7OzRCQUFiLElBQUksa0JBQUEsQ0FBQTs0QkFDYixXQUFXLEdBQU0sU0FBUyxTQUFJLElBQUksQ0FBQyxHQUFLLENBQUM7NEJBQzdDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQ0FDN0IsV0FBVyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7NkJBQ2hFOzRCQUNHLFFBQVEsR0FBTSxXQUFXLFNBQUksSUFBSSxDQUFDLElBQU0sQ0FBQzs0QkFDdkMscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBQTs7aUNBQXZDLENBQUMsQ0FBQyxTQUFxQyxDQUFDLEVBQXhDLHlCQUF3Qzs0QkFDMUMscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBQTs7NEJBQWxDLFNBQWtDLENBQUM7O2lDQUdyQyxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUE7OzRCQUFsRSxTQUFrRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBR3JFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7Ozs7U0FDWjtRQUVELDZCQUFZLEdBQVo7WUFBQSxpQkFPQztZQU5DLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUN6QixLQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLElBQUk7b0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsaUJBQU0sT0FBTyxhQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCwwQkFBUyxHQUFULFVBQ0UsS0FBOEMsRUFDOUMsUUFBZ0IsRUFDaEIsU0FBeUI7WUFIM0IsaUJBb0JDO1lBakJDLDBCQUFBLEVBQUEsZ0JBQXlCO1lBRXpCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPOzs7OztpQ0FDM0IsU0FBUyxFQUFULHdCQUFTOzRCQUNQLHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUE7O2lDQUFuQyxTQUFtQyxFQUFuQyx3QkFBbUM7NEJBQ3JDLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUE7OzRCQUFoQyxTQUFnQyxDQUFDOzs7NEJBSXJDLGlCQUFNLEdBQUcsWUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQUMsS0FBSzs7Z0NBQy9CLElBQUksS0FBSyxFQUFFO29DQUNULE1BQUEsTUFBQSxLQUFJLENBQUMsTUFBTSxFQUFDLEtBQUssbURBQUcsS0FBSyxDQUFDLENBQUM7b0NBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQ0FDaEI7Z0NBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNoQixDQUFDLENBQUMsQ0FBQzs7OztpQkFDSixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsMkJBQVUsR0FBVixVQUFXLE9BQWUsRUFBRSxPQUF1QjtZQUFuRCxpQkFVQztZQVYyQix3QkFBQSxFQUFBLGNBQXVCO1lBQ2pELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUN6QixpQkFBTSxLQUFLLGFBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUs7O29CQUNsQyxJQUFJLEtBQUssRUFBRTt3QkFDVCxNQUFBLE1BQUEsS0FBSSxDQUFDLE1BQU0sRUFBQyxLQUFLLG1EQUFHLEtBQUssQ0FBQyxDQUFDO3dCQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2hCO29CQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFSyw0QkFBVyxHQUFqQixVQUFrQixJQUFZOzs7OztnQ0FDdEIscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQTs7NEJBQXJDLElBQUksQ0FBQyxDQUFDLFNBQStCLENBQUMsRUFBRTtnQ0FDdEMsc0JBQU8sS0FBSyxFQUFDOzZCQUNkOzRCQUNNLHFCQUFNLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07b0NBQ3ZDLGlCQUFNLE1BQU0sYUFBQyxJQUFJLEVBQUUsVUFBQyxLQUFLOzt3Q0FDdkIsSUFBSSxLQUFLLEVBQUU7NENBQ1QsTUFBQSxNQUFBLEtBQUksQ0FBQyxNQUFNLEVBQUMsS0FBSyxtREFBRyxLQUFLLENBQUMsQ0FBQzs0Q0FDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lDQUNoQjt3Q0FDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ2hCLENBQUMsQ0FBQyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxFQUFBO2dDQVJGLHNCQUFPLFNBUUwsRUFBQzs7OztTQUNKO1FBRUssK0JBQWMsR0FBcEIsVUFBcUIsSUFBWSxFQUFFLE9BQXdCO1lBQXhCLHdCQUFBLEVBQUEsZUFBd0I7Ozs7O2dDQUNuRCxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFBOzs0QkFBcEMsSUFBSSxDQUFDLENBQUMsU0FBOEIsQ0FBQyxFQUFFO2dDQUNyQyxzQkFBTyxLQUFLLEVBQUM7NkJBQ2Q7NEJBQ00scUJBQU0sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO29DQUMvQixpQkFBTSxLQUFLLGFBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUs7O3dDQUMvQixJQUFJLEtBQUssRUFBRTs0Q0FDVCxNQUFBLE1BQUEsS0FBSSxDQUFDLE1BQU0sRUFBQyxLQUFLLG1EQUFHLEtBQUssQ0FBQyxDQUFDOzRDQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7eUNBQ2hCO3dDQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDaEIsQ0FBQyxDQUFDLENBQUM7Z0NBQ0wsQ0FBQyxDQUFDLEVBQUE7Z0NBUkYsc0JBQU8sU0FRTCxFQUFDOzs7O1NBQ0o7UUFFRCwrQkFBYyxHQUFkLFVBQWUsUUFBZ0I7WUFBL0IsaUJBU0M7WUFSQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztnQkFDekIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFLO29CQUN2QixJQUFJLEtBQUssRUFBRTt3QkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2hCO29CQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCw4QkFBYSxHQUFiLFVBQWMsT0FBZTtZQUE3QixpQkFTQztZQVJDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUN6QixLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQUs7b0JBQ3ZCLElBQUksS0FBSyxFQUFFO3dCQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDaEI7b0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNILGFBQUM7SUFBRCxDQUFDLEFBeklELENBQTRCLGFBQUcsR0F5STlCO0lBeklZLHdCQUFNIn0=
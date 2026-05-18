"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorFormatterInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let HttpErrorFormatterInterceptor = class HttpErrorFormatterInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.catchError)((err) => {
            const status = err?.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            const message = err?.response?.message ?? err?.message ?? 'Request failed';
            return (0, rxjs_1.throwError)(() => ({ statusCode: status, message }));
        }));
    }
};
exports.HttpErrorFormatterInterceptor = HttpErrorFormatterInterceptor;
exports.HttpErrorFormatterInterceptor = HttpErrorFormatterInterceptor = __decorate([
    (0, common_1.Injectable)()
], HttpErrorFormatterInterceptor);
//# sourceMappingURL=http-error-formatter.interceptor.js.map
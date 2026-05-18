"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
class SwaggerConfig {
    static apply(app) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Hospital Clock-In API')
            .setDescription('Attendance, HR, leave & payroll management')
            .setVersion('0.1.0')
            .build();
        const doc = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, doc);
    }
}
exports.SwaggerConfig = SwaggerConfig;
//# sourceMappingURL=swagger.config.js.map
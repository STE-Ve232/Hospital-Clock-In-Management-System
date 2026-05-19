import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static apply(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Hospital Clock-In API')
      .setDescription('Attendance, HR, leave & payroll management')
      .setVersion('0.1.0')
      .build();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = SwaggerModule.createDocument(app as any, config);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SwaggerModule.setup('api/docs', app as any, doc);
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { JobOffersModule } from './job-offers/job-offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    CompaniesModule,
    JobOffersModule
  ],
})
export class AppModule {}

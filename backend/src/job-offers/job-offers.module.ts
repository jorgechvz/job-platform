import { Module } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { JobOffersController } from './job-offers.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [JobOffersController],
  providers: [JobOffersService],
  exports: [JobOffersService],
})
export class JobOffersModule {}

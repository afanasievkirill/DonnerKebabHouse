import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from 'src/user/user.module';
import { LinkController } from './link.controller';
import { LinkEntity } from './link.entity';
import { LinkService } from './link.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinkEntity]),
    UserModule,
    SharedModule
  ],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule { }

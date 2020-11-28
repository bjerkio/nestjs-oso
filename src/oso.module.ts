import { DynamicModule, Module } from '@nestjs/common';
import { Options } from 'oso/dist/src/types';
import { OSO_MODULE_OPTIONS } from './oso.constants';
import { OsoService } from './oso.service';

export interface OsoModuleConfig {
  loadStr?: string;
  loadFile?: string;
  osoOptions?: Options;
}

@Module({
  providers: [OsoService],
})
export class OsoModule {
  constructor(private readonly oso: OsoService) {}

  static forRoot(options: OsoModuleConfig = {}): DynamicModule {
    return {
      module: OsoModule,
      providers: [
        {
          provide: OSO_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import { Options } from 'oso/dist/src/types';
import { OSO_MODULE_OPTIONS } from './oso.constants';
import { OsoService } from './oso.service';

export interface OsoModuleConfig {
  loadStr?: string;
  loadFile?: string; // Deprecated; to be removed in next major version
  loadFiles?: string[];
  osoOptions?: Options;
  isGlobal?: boolean; // If true, registers `OsoModule` as a global module.
}

@Module({
  providers: [OsoService],
  exports: [OsoService],
})
export class OsoModule {
  constructor(private readonly oso: OsoService) {}

  static forRoot(options: OsoModuleConfig = {}): DynamicModule {
    return {
      global: options.isGlobal,
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

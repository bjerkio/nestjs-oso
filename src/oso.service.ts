import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Oso } from 'oso';
import { OsoMetadataStorage } from './oso-metadata.storage';
import { OSO_MODULE_OPTIONS } from './oso.constants';
import { OsoModuleConfig } from './oso.module';

@Injectable()
export class OsoService extends Oso implements OnModuleInit {
  constructor(
    @Inject(OSO_MODULE_OPTIONS) private readonly options: OsoModuleConfig,
  ) {
    super(options.osoOptions);
  }
  async onModuleInit() {
    const providers = OsoMetadataStorage.getClasses();

    providers.forEach(m => {
      this.registerClass(m as any);
    });

    if (this.options.loadFile) {
      await this.loadFile(this.options.loadFile);
    }

    if (this.options.loadStr) {
      await this.loadStr(this.options.loadStr);
    }
  }
}

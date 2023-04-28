import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { OsoModule } from '../oso.module';
import { OSO_MODULE_OPTIONS } from '../oso.constants';

describe('OsoModule', () => {
  let testApp: INestApplication;

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      imports: [OsoModule.forRoot()],
    }).compile();

    testApp = mod.createNestApplication();
  });

  it('options should be applied', async () => {
    const options = {
      loadStr: '',
    };
    const optMod = await Test.createTestingModule({
      imports: [OsoModule.forRoot(options)],
    }).compile();
    const opts = optMod.get<any>(OSO_MODULE_OPTIONS);
    expect(opts).toBe(options);
  });

  it('should return a dynamic module', () => {
    const dynamicMod = OsoModule.forRoot();
    expect(dynamicMod.module).toBeInstanceOf(Function);
  });
});

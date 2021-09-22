import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { OsoModule } from '../oso.module';
import { OsoService } from '../oso.service';
import { OsoClass } from '../oso-class.decorator';
import { OsoMetadataStorage } from '../oso-metadata.storage';

describe('OsoService', () => {
  let testApp: INestApplication;

  @OsoClass()
  class TestClass {
    val: string;
  }

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      imports: [OsoModule.forRoot()],
    }).compile();

    testApp = mod.createNestApplication();
    await testApp.init();
  });

  it('should return a bool on isAllowed', async () => {
    const service = testApp.get<OsoService>(OsoService);
    jest.spyOn(service, 'isAllowed').mockImplementation(async () => true);
    expect(await service.isAllowed('', '', '')).toBe(true);
  });

  it('should register TestClass', () => {
    const classes = OsoMetadataStorage.getClasses();
    expect(classes).toContain(TestClass);
  });

  it('should load a file (deprecated)', async () => {
    const mod = await Test.createTestingModule({
      imports: [
        OsoModule.forRoot({
          loadFile: `${__dirname}/rule1.polar`,
        }),
      ],
    }).compile();

    const loadFileApp = mod.createNestApplication();
    const service = loadFileApp.get<OsoService>(OsoService);
    const func = jest
      .spyOn(service, 'loadFiles')
      .mockImplementation(async () => {});
    await loadFileApp.init();

    expect(func).toBeCalledTimes(1);
  });

  it('should load a file', async () => {
    const mod = await Test.createTestingModule({
      imports: [
        OsoModule.forRoot({
          loadFiles: [`${__dirname}/rule1.polar`],
        }),
      ],
    }).compile();

    const loadFileApp = mod.createNestApplication();
    const service = loadFileApp.get<OsoService>(OsoService);
    const func = jest
      .spyOn(service, 'loadFiles')
      .mockImplementation(async () => {});
    await loadFileApp.init();

    expect(func).toBeCalledTimes(1);
  });

  it('should load files', async () => {
    const mod = await Test.createTestingModule({
      imports: [
        OsoModule.forRoot({
          loadFiles: [`${__dirname}/rule1.polar`, `${__dirname}/rule2.polar`],
        }),
      ],
    }).compile();

    const loadFileApp = mod.createNestApplication();
    const service = loadFileApp.get<OsoService>(OsoService);
    const func = jest
      .spyOn(service, 'loadFiles')
      .mockImplementation(async () => {});
    await loadFileApp.init();

    expect(func).toBeCalledTimes(1);
  });

  it('should load a file using regex (deprecated)', async () => {
    const mod = await Test.createTestingModule({
      imports: [
        OsoModule.forRoot({
          loadFile: './**/*.polar',
        }),
      ],
    }).compile();

    const loadFileApp = mod.createNestApplication();
    const service = loadFileApp.get<OsoService>(OsoService);
    const func = jest
      .spyOn(service, 'loadFiles')
      .mockImplementation(async () => {});
    await loadFileApp.init();

    expect(func).toBeCalledTimes(1);
  });

  it('should load files using regex', async () => {
    const mod = await Test.createTestingModule({
      imports: [
        OsoModule.forRoot({
          loadFiles: ['./**/*.polar'],
        }),
      ],
    }).compile();

    const loadFileApp = mod.createNestApplication();
    const service = loadFileApp.get<OsoService>(OsoService);
    const func = jest
      .spyOn(service, 'loadFiles')
      .mockImplementation(async () => {});
    await loadFileApp.init();

    expect(func).toBeCalledTimes(1);
  });

  it('should load strings', async () => {
    const mod = await Test.createTestingModule({
      imports: [
        OsoModule.forRoot({
          loadStr: 'allow(_a, _b, _c);',
        }),
      ],
    }).compile();

    const loadFileApp = mod.createNestApplication();
    const service = loadFileApp.get<OsoService>(OsoService);
    const func = jest
      .spyOn(service, 'loadStr')
      .mockImplementation(async () => {});
    await loadFileApp.init();

    expect(func).toBeCalled();
  });
});

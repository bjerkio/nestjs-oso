export class OsoMetadataStorageHost {
  private classes = new Array<Function>();

  addClass(metadata: Function): void {
    this.classes.push(metadata);
  }

  getClasses(): Array<Function> {
    return this.classes;
  }
}

const globalRef = global as any;
export const OsoMetadataStorage: OsoMetadataStorageHost =
  globalRef.OsoMetadataStorage ||
  (globalRef.OsoMetadataStorage = new OsoMetadataStorageHost());

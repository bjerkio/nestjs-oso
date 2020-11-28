export class OsoMetadataStorageHost {
  private classes = new Array<Function>();

  addClass(metadata: Function) {
    this.classes.push(metadata);
  }

  getClasses() {
    return this.classes;
  }
}

const globalRef = global as any;
export const OsoMetadataStorage: OsoMetadataStorageHost =
  globalRef.OsoMetadataStorage ||
  (globalRef.OsoMetadataStorage = new OsoMetadataStorageHost());

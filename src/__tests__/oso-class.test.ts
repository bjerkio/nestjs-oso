import { OsoClass } from '../oso-class.decorator';
import { OsoMetadataStorage } from '../oso-metadata.storage';

describe('OsoClass', () => {
  @OsoClass()
  class User {
    id: string;
  }

  it('should be added to classes', () => {
    const classes = OsoMetadataStorage.getClasses();
    expect(classes).toContain(User);
  });
});

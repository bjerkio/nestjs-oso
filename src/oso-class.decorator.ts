import { OsoMetadataStorage } from './oso-metadata.storage';

export function OsoClass(): ClassDecorator {
  return target => {
    OsoMetadataStorage.addClass(target);
  };
}

import CertifiedEntity from './CertifiedEntity';

const CERTIFIED_ENTITY_NAME: string = 'Test';
let certifiedEntity: CertifiedEntity;

beforeAll(() => {
  certifiedEntity = new CertifiedEntity(CERTIFIED_ENTITY_NAME);
});

describe('test toString function', () => {
  it('should return the CertifiedEntity name', () => {
    expect(certifiedEntity.toString()).toBe(CERTIFIED_ENTITY_NAME);
  });
});

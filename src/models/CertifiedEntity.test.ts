import CertifiedEntity from './CertifiedEntity';

const CERTIFIED_ENTITY_NAME = 'Test';
const certifiedEntity = new CertifiedEntity(CERTIFIED_ENTITY_NAME);

describe('test toString function', () => {
  it('should return the CertifiedEntity name', () => {
    expect(certifiedEntity.toString()).toBe(CERTIFIED_ENTITY_NAME);
  });
});

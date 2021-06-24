import CertificationEntity from './CertificationEntity';
import Certificate from './Certificate';

let certificate: Certificate;
let certificationEntity: CertificationEntity;
const CERTIFICATION_NAME = 'CERTIFIER';
const CERTIFIED_NAME = 'CERTIFIED';
const DATA_TO_CERTIFY = 'DATA';

beforeAll(() => {
  certificationEntity = new CertificationEntity(CERTIFICATION_NAME);
  certificationEntity.generateKeys();
  const publicKey = certificationEntity.getPublicKey();

  certificate = new Certificate(publicKey, CERTIFICATION_NAME, CERTIFIED_NAME, DATA_TO_CERTIFY);
});

describe('test sign and verify functions', () => {
  it('should sign the data and verify it', () => {
    const privateKey = certificationEntity.getPrivateKey();
    certificate.sign(privateKey);
    expect(certificate.verify()).toBe(true);
  });
});

import express from 'express';
import CertificationEntity from './models/CertificationEntity';
import ServiceResponse from './models/ServiceResponse';
import SignatureRequest from './models/SignatureRequest';
import Certificate from './models/Certificate';

const app = express();
app.use(express.json());
const port = 5000;

// Generate key pair
app.get('/certification-entity/generate', (req, res) => {
  const certificationEntity = new CertificationEntity('');
  certificationEntity.generateKeys();

  res.status(200).send(new ServiceResponse(true, certificationEntity));
});

// Sign a new certificate
app.post('/certificate/sign', (req, res) => {
  const certificate: Certificate = Object.assign(
    new Certificate(null, null, null, null), req.body.certificate,
  );
  req.body.certificate = certificate;
  const signatureRequest: SignatureRequest = Object.assign(
    new SignatureRequest(null, null), req.body,
  );
  signatureRequest.sign();
  res.status(200).send(new ServiceResponse(true, signatureRequest));
});

// Validates a certificate
app.post('/certificate/validate', async (req, res) => {
  const certificate: Certificate = Object.assign(
    new Certificate(null, null, null, null), req.body,
  );

  const verificationAddress = certificate.getVerificationAddress();
  const isValidSignature = certificate.verify();
  let isValidPublicKey = true;

  if (isValidSignature && verificationAddress && verificationAddress.length > 0) {
    isValidPublicKey = await certificate.checkVerificationAddress();
  }

  res.status(200).send(new ServiceResponse(true, (isValidSignature && isValidPublicKey)));
});

app.get('/', (_, res) => {
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

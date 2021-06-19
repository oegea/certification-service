import Certificate from './Certificate';
/**
 * Data structure used in a http request to ask for a certificate sign
 */
class SignatureRequest {
    // Certificate to sign
    private certificate: Certificate;

    // Private key to sign the certificate
    private privateKey: string;

    /**
     * CTOR
     * @param certificate Certificate to sign
     * @param privateKey Private key used in the sign process
     */
    constructor(certificate: Certificate, privateKey: string) {
      this.certificate = certificate;
      this.privateKey = privateKey;
    }

    /**
     * Signs the certificate
     */
    public sign(): void {
      this.certificate.sign(this.privateKey);
    }
}

export default SignatureRequest;

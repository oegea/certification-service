/**
 * Entity that gets a certificate
 */
class CertifiedEntity {
    // Name of the person or organization that gets the certificate
    private name: string;

    /**
     * CTOR
     * @param name Name of the person or organization
     */
    constructor(name: string) {
      this.name = name;
    }

    /**
     * Gets an string that contains most important information
     * @returns Descriptive string
     */
    toString(): string {
      return this.name;
    }
}

export default CertifiedEntity;

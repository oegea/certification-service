/**
 * Data about a certificate
 */
class ServiceResponse {
    // Indicates if the request has been successfully processed or not
    private success: boolean;

    // Data of the response
    private data: any;

    /**
     * CTOR
     * @param success True if the request has been successfully processed
     * @param data Data to be included in the body of the response
     */
    constructor(success: boolean, data: any) {
      this.success = success;
      this.data = data;
    }
}

export default ServiceResponse;

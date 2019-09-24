export class DataParser {
    public CountryCode;
    public NationalCode;

    test() {
        console.log('helloW');
    }

    // method takes in Unit8Array from SNPShot data and converts to Country Code
    getCountryCode(bytes: Uint8Array) {
        // get bytes 2/3 ..bytes in reverse order due to data being returned in little endian format

        const byte1: number = bytes[2];
        const byte2: number = bytes[1];

        // transform byte1 and byte2 to binary form
        const firstBinary = byte1.toString(2);
        const secondBinary = byte2.toString(2);

        // concatonate two binary numbers togeather
        const twobytes = firstBinary + secondBinary;
        console.log(twobytes);

        // parse the concatonated binary numbers to an int of base 2(decimal)
        this.CountryCode = parseInt(twobytes, 2);
        console.log('Country Code is: ' + this.CountryCode);
        alert('Scanned tag country code: ' + this.CountryCode);
    }

    getNationalCode() {
        
    }
}

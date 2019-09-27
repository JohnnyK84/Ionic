import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { RfidTag } from '../models/rfidTag';
import { BtleServiceService } from './btle-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // get scanned data array from service
  rfidTags = this._btleSerivce.getTags();

  constructor(
    public bluetoothle: BluetoothLE,
    public plt: Platform,
    private _btleSerivce: BtleServiceService
    ) {
      this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);

      this.bluetoothle.initialize().subscribe(ble => {
        // if device bluetooth is disabled then enable
        if (ble.status === 'disabled') {
          this.enableBtle();
        }
        console.log('ble', ble.status); // logs 'enabled'
        // connect to device reader
        this.connectBtle();
      });
    });
  }

  // scan for device by service id
  scanBtle() {
    // params to scan for(service ID to filter out other devices)
    const params = {
      services: [
        // service id for SNPShot
        '46021000-43AF-49C1-A7BC-CEF71ABD0AD9'
      ]
    };

    // start scan using params above
    this.bluetoothle.startScan(params).subscribe(scanstatus => {
      console.log(scanstatus);
      // get info of scanned device and convert
      setTimeout(() => {
        const unit8arr = this.bluetoothle.encodedStringToBytes(scanstatus.advertisement.toString());
        console.log(unit8arr);
        // attempt to decode unit8 array..not working properly
        const bts = this.bluetoothle.bytesToString(unit8arr);
        console.log(bts);
        this.bluetoothle.stopScan();
        console.log('end');
        }, 3000);
      });
  }

  // connect to SNPShot by address
  async connectBtle() {
    const address = {address: 'F8:F0:05:E5:D9:9C'};

    this.bluetoothle.connect(address).subscribe(result => {
    console.log(result);
    // discover services..must be discovered before services can be used
    this.discover();
    });
  }

  // request permission from device for location services(needed to allow scanning)
  requestPermission() {
    this.bluetoothle.requestPermission().then(permission => {
      console.log(permission);
    });
  }

  // enable bluetooth on the device
  async enableBtle() {
    this.bluetoothle.enable();
  }

  // disable bluetooth on the device
  disableBtle() {
    this.bluetoothle.disable();
  }

  // display device information
  adaptInfo() {
    this.bluetoothle.getAdapterInfo().then(ainfo => {
      console.log(ainfo);
    });
  }

  // bond to SNPShot using service ID
  bond() {
    const params = {address: 'F8:F0:05:E5:D9:9C'};

    this.bluetoothle.bond(params).subscribe(dinfo => {
      console.log(dinfo);
    });
  }

  // unbond SNPShot
  unbond() {
    const params = {address: 'F8:F0:05:E5:D9:9C'};

    this.bluetoothle.unbond(params);
  }

  // reconnect to SNPShot using address (needed after having been already connected)
  async reconnect() {
    const address = {address: 'F8:F0:05:E5:D9:9C'};

    this.bluetoothle.reconnect(address).subscribe(result => {
      console.log(result);
    });
  }

  // method to discover device services (needed before you can access the devices services)
  discover() {
    const address = { address: 'F8:F0:05:E5:D9:9C' };
    this.bluetoothle.discover(address).then(device => {
      console.log(device);
    });
  }

  // scan RFID tag
  async scanTag() {
    // convert string to byte aray as value in params must be set as encoded byte array
    const instruct = new Uint8Array([0x01]); // instruction to tell device to read tag
    // Enocde the byte array to base64 encoded string of bytes
    const encoded = this.bluetoothle.bytesToEncodedString(instruct);

    // Set params of write instruction
    const params = {
      address: 'F8:F0:05:E5:D9:9C',
      service: '66021000-43AF-49C1-A7BC-CEF71ABD0AD9',
      characteristic: '66021004-43AF-49C1-A7BC-CEF71ABD0AD9',
      value: encoded
    };

    // write instruction to SNPShot device and pass in instruction params
    this.writeInstruct(params);

    // after 3.5 seconds show last scanned tag to user
    setTimeout(() => {
      this.getPayload1();
    }, 3500);
  }

  // write method for writing instructions or data to SNPShot
  async writeInstruct(params) {
    const response = await this.bluetoothle.write(params);
    // write instruction to SNPShot device and return response
    console.log(await response);
    // decode response value to Unit8Array
    const bytes2: Uint8Array = this.bluetoothle.encodedStringToBytes(await response.value);
    console.log(bytes2);
  }

  // Read payload 1 from SNPShot
  getPayload1() {
    let rfidTag: RfidTag = {
      countryCode: 0,
      nationalCode: 0
    };

    const params = {
      address: 'F8:F0:05:E5:D9:9C',
      service: '66021000-43AF-49C1-A7BC-CEF71ABD0AD9',
      characteristic: '66021001-43AF-49C1-A7BC-CEF71ABD0AD9',
    };

    this.bluetoothle.read(params).then(response => {
      console.log('Initial Read Response object:\n ' + response);
      // decode response.value into Unit8Array of bytes
      const stringToBytes: Uint8Array = this.bluetoothle.encodedStringToBytes(response.value);
      console.log('Returned value eoncoded to Uin8 Array:\n ' + stringToBytes);

      // set buffer for data view
      const buff = stringToBytes.buffer;
      // set views to convert Country code and National code from Uint8 values to required Uin16/Uint32 values
      const viewCountryCode = new DataView(buff);
      const viewNationalCode = new DataView(buff);

      rfidTag.countryCode =  viewCountryCode.getUint16(1, true);
      rfidTag.nationalCode = viewNationalCode.getUint32(3, true);

      alert('Country Code is: ' + rfidTag.countryCode);
      alert('National Code is:  ' + rfidTag.nationalCode);

      console.log('RFID Tag Value: ' + rfidTag);
      // add scanned RFID tag to array
      this._btleSerivce.addRfidTag(rfidTag);
      console.log(this.rfidTags);
    });
  }

  // Read payload 2 from SNPShot // no data here as no cartridges being read
  getPayload2() {
    const params = {
      address: 'F8:F0:05:E5:D9:9C',
      service: '66021000-43AF-49C1-A7BC-CEF71ABD0AD9',
      characteristic: '66021002-43AF-49C1-A7BC-CEF71ABD0AD9',
    };

    this.bluetoothle.read(params).then(response => {
      console.log(response);
      const stringToBytes = this.bluetoothle.encodedStringToBytes(response.value);
      console.log(stringToBytes);
    });
  }

  // method not being used
  displayAnimalId() {
    // convert string to byte aray as value in params must be set as encoded byte array
    const bytes = new Uint8Array([0x03]); // instruction to tell device to read tag
    // Enocde the byte array to base64 encoded string of bytes
    const encoded = this.bluetoothle.bytesToEncodedString(bytes);

    const params = {
      address: 'F8:F0:05:E5:D9:9C',
      service: '66021000-43AF-49C1-A7BC-CEF71ABD0AD9',
      characteristic: '66021004-43AF-49C1-A7BC-CEF71ABD0AD9',
      value: encoded
    };

    this.bluetoothle.write(params).then(response => {
      console.log(response);
      const bytes2: Uint8Array = this.bluetoothle.encodedStringToBytes(response.value);
      console.log(bytes2);
    });
  }
}

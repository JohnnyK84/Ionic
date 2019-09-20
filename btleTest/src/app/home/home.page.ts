import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BluetoothLE, ScanStatus } from '@ionic-native/bluetooth-le/ngx';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public scanstatus: ScanStatus;

  constructor(public bluetoothle: BluetoothLE, public plt: Platform) {
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);

      this.bluetoothle.initialize().subscribe(ble => {
        console.log('ble', ble.status); // logs 'enabled'
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

    // set timeout for scan to stop after 3 seconds

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

  // request permission from device for location services(needed to allow scanning)
  requestPermission() {
    this.bluetoothle.requestPermission().then(permission => {
      console.log(permission);
    });
  }

  enableBtle() {
    this.bluetoothle.enable();
  }

  disableBtle() {
    this.bluetoothle.disable();
  }

  adaptInfo() {
    this.bluetoothle.getAdapterInfo().then(ainfo => {
      console.log(ainfo);
    });
  }

  bond() {
    const params = {address: 'F8:F0:05:E5:D9:9C'};

    this.bluetoothle.bond(params).subscribe(dinfo => {
      console.log(dinfo);
    });
  }

  unbond() {
    const params = {address: 'F8:F0:05:E5:D9:9C'};

    this.bluetoothle.unbond(params);
  }

  readChar() {
    let result = '';

    const params = {
      address: 'F8:F0:05:E5:D9:9C',
      service: '66021000-43AF-49C1-A7BC-CEF71ABD0AD9',
      characteristic: '66021001-43AF-49C1-A7BC-CEF71ABD0AD9'
    };
    this.bluetoothle.read(params).then(response => {
      console.log(response);
      result = response.value;
      console.log(result);
      const unit8arr = this.bluetoothle.encodedStringToBytes(result);
      console.log(unit8arr);
    });
  }

  async connectBtle() {
    const address = {address: 'F8:F0:05:E5:D9:9C'};

    this.bluetoothle.connect(address).subscribe(result => {
    console.log(result);
  });
  }

  async reconnect() {
    const address = {address: 'F8:F0:05:E5:D9:9C'};

    this.bluetoothle.reconnect(address).subscribe(result => {
      console.log(result);
    });
  }

  // method to discover device services
  discover() {
    const address = {address: 'F8:F0:05:E5:D9:9C'};
    this.bluetoothle.discover(address).then(device => {
      console.log(device);
    });
  }

  // Scan ID
  scanTag() {
    const bytes = this.bluetoothle.stringToBytes('0x01');
    const encodedString = this.bluetoothle.bytesToEncodedString(bytes);

    const params = {
      address: 'F8:F0:05:E5:D9:9C',
      service: '66021000-43AF-49C1-A7BC-CEF71ABD0AD9',
      characteristic: '66021004-43AF-49C1-A7BC-CEF71ABD0AD9',
      value: encodedString,
      type: 'noResponse'
    };

    this.bluetoothle.write(params).then(response => {
      console.log(response);
    });
  }

  // display Scanned Id
  displayId() {
    const bytes = this.bluetoothle.stringToBytes('0x03');
    const encodedString = this.bluetoothle.bytesToEncodedString(bytes);

    const params = {
      address: 'F8:F0:05:E5:D9:9C',
      service: '66021000-43AF-49C1-A7BC-CEF71ABD0AD9',
      characteristic: '66021004-43AF-49C1-A7BC-CEF71ABD0AD9',
      value: encodedString,
      type: 'noResponse'
    };

    this.bluetoothle.write(params).then(response => {
      console.log(response);
    });
  }
}

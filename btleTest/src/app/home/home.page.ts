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

    // start scan using params above
    this.bluetoothle.startScan(params).subscribe(scanstatus => {
      console.log(scanstatus);
      // set timeout for scan
      setTimeout(() => {
        const r = this.bluetoothle.encodedStringToBytes(scanstatus.advertisement.toString());
        console.log(r);
        this.bluetoothle.stopScan();
        const s = this.bluetoothle.bytesToString(r);
        console.log(s);
      }, 3000);
      console.log('end');
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

}

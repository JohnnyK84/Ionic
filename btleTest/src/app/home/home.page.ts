import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BluetoothLE, AdapterInfo, ScanStatus } from '@ionic-native/bluetooth-le/ngx';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public ainfo: AdapterInfo;

  constructor(public bluetoothle: BluetoothLE, public plt: Platform) {
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);

      this.bluetoothle.initialize().subscribe(ble => {
        console.log('ble', ble.status) // logs 'enabled'
      });
    });
  }

  // scan for device by service id
  scanBtle() {
    // params to scan for(service ID to filter out other devices)
    const params = {
      services: [
        '46021000-43AF-49C1-A7BC-CEF71ABD0AD9'
      ]
    };
    // start scan using params above
    this.bluetoothle.startScan(params).subscribe(scanstatus => {
      console.log(scanstatus);
    });
  }

  startScanSuccess(scanstate: ScanStatus) {
    console.log(scanstate.advertisement);
    }

  startScanError() {
    console.log('error');
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
}

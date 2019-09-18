import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BluetoothLE, AdapterInfo } from '@ionic-native/bluetooth-le/ngx';
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
    
  checkBtle() {}

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

import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bluetoothSerial: BluetoothSerial) {

  }

  // connect to Gallagher Stick Reader
  connectBtClassic() {
    this.bluetoothSerial.connect("00:07:80:9F:BB:9D").subscribe(response => {
      console.log(response);
    });
  }

  // read from buffer
  readData() {
    this.bluetoothSerial.read().then(response => {
      console.log(response);
      alert('Stick Data:\n' + response);
    });
  }

  // scan and display connectable devices
  scanforDevices() {
      this.bluetoothSerial.discoverUnpaired().then(response => {
      console.log(response);
      // alert(response);
    });
  }
}

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
    this.bluetoothSerial.connect('00:07:80:9F:BB:9D').subscribe(response => {
      if (response === 'OK') {
        alert('Connected');
      }
    }, error => {
      alert('Not Connected' + error);
    });
  }

  // read from buffer
  readData() {
    this.bluetoothSerial.read().then(response => {
      console.log(response);
      // alert('Stick Data:\n' + response);
      let test = response.toString();
      console.log('response as string: ' + test);
    });
  }

  // scan and display connectable devices
  scanforDevices() {
      this.bluetoothSerial.discoverUnpaired().then(response => {
      console.log(response);
      alert(response);
    });
  }

  // subscribte to continually read from buffer
  subscribe() {
    this.bluetoothSerial.subscribe('').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  readUntil() {
    this.bluetoothSerial.readUntil(',').then(response => {
      console.log(response);
    });
  }

  subscribeRaw() {
    this.bluetoothSerial.subscribeRawData().subscribe(response => {
      console.log(response);
    });
  }
}

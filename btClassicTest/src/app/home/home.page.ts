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

  // subscribte to continually read from buffer \n or new line as delimiter
  subscribe() {
    this.bluetoothSerial.subscribe('\n').subscribe(response => {
      console.log(response);
      const responseString = response.toString();
      alert('Country Code: ' + responseString.substr(2, 3) +
        '\nNational Code: ' + responseString.substr(5, responseString.length));
    }, error => {
      console.log('Something went wrong: ' + error);
    });
  }

  readUntil() {
    this.bluetoothSerial.readUntil(',').then(response => {
      console.log(response);
    });
  }


  // subscribe to raw data stream (Uint8 array)
  subscribeRaw() {
    this.bluetoothSerial.subscribeRawData().subscribe(response => {
      console.log(response);
    });
  }
}

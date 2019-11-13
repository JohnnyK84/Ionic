import { Component, NgZone } from "@angular/core";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  scanCount: number = 0;
  tags = [];

  constructor(private bluetoothSerial: BluetoothSerial, private zone: NgZone) {}

  // connect to a Stick Reader
  // Gallagher Addresss: 00:07:80:9F:BB:9D
  // RS420 Address: 00:04:3E:6A:0D:69
  connectBtClassic() {
    this.bluetoothSerial.connect("00:04:3E:6A:0D:69").subscribe(
      response => {
        if (response === "OK") {
          alert("Connected");
        }
      },
      error => {
        alert("Not Connected" + error);
      }
    );
  }

  // read from buffer
  readData() {
    this.bluetoothSerial.read().then(response => {
      console.log(response);
      // alert('Stick Data:\n' + response);
      let test = response.toString();
      console.log("response as string: " + test);
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
    // after 5 seconds stop
    this.scanCount = 0;
    this.bluetoothSerial.subscribe("\n").subscribe(
      response => {
        if (this.tags.length === 0) {
          this.tags.push(response);
          console.log("First Tag Loaded");
        }
        let i = 0;
        console.log(response);
        this.zone.run(() => {
          this.scanCount++;
        });
        if (this.tags.includes(response)) {
          console.log("Match!! ", response);
        } else {
          console.log("No Match!! ", response);
          this.tags.push(response);
        }
        console.log(this.tags);
        // const responseString = response.toString();
      },
      error => {
        console.log("Something went wrong: " + error);
      }
    );
  }

  readUntil() {
    this.bluetoothSerial.readUntil(",").then(response => {
      console.log(response);
    });
  }

  // subscribe to raw data stream (Uint8 array)
  subscribeRaw() {
    this.bluetoothSerial.subscribeRawData().subscribe(response => {
      const bytes = new Uint8Array(response);
      console.log(bytes);
    });
  }

  clearArray() {
    this.tags = [];
    console.log("Tag Array Clear: ", this.tags);
  }
}

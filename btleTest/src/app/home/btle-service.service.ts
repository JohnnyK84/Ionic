import { Injectable } from "@angular/core";
import { RfidTag } from "../models/rfidTag";
import { BatchTags } from "../models/batchTags";
import { ModalController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class BtleServiceService {
  rfidTag: RfidTag = new RfidTag(null, null);
  rfidTags: RfidTag[] = [];
  scannedTags: BatchTags = new BatchTags(null, null, null, null, null);

  public btIsConnected = false;

  // public tagsObservable = new Subject<BatchTags>();

  constructor(private _mdlCtrl: ModalController) {}

  getTags() {
    return this.scannedTags.tags;
  }

  getBatch() {
    return this.scannedTags;
  }

  getBtStatus() {
    return this.btIsConnected;
  }

  setBtStatus(state: boolean) {
    this.btIsConnected = state;
  }

  newBatch(id: number, location: string, description: string) {
    const newBatch = new BatchTags(
      id,
      this.rfidTags,
      new Date(),
      location,
      description
    );
    alert("Batch " + id + " Created");
    this.scannedTags = newBatch;
    console.log(this.scannedTags);

    this._mdlCtrl.dismiss(null, "Confirm");
  }

  // method to add new scanned tag to scannedTags
  addRfidTag(tag: RfidTag) {
    console.log("to be pushed:" + tag.countryCode);
    let copiedArr = [...this.scannedTags.tags];
    copiedArr.push(tag);
    console.log("copied Array" + copiedArr);
    this.scannedTags.tags = copiedArr;
  }
}

import { Injectable } from "@angular/core";
import { RfidTag } from "../models/rfidTag";
import { BatchTags } from "../models/batchTags";
import { ModalController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class BtleServiceService {
  rfidTag: RfidTag = new RfidTag(null, null);
  rfidTags: RfidTag[];
  scannedTags: BatchTags = new BatchTags(null, null, null, null, null);

  // public tagsObservable = new Subject<BatchTags>();

  constructor(private _mdlCtrl: ModalController) {}

  addRfidTag(tag: RfidTag) {
    console.log("to be pushed:" + tag);
    this.scannedTags.tags.push(tag);
  }

  getTags() {
    return this.scannedTags;
  }

  getBatch() {
    return this.scannedTags;
  }

  newBatch(id: number, location: string, description: string) {
    const newBatch = new BatchTags(
      id,
      this.rfidTags,
      new Date(),
      location,
      description
    );
    console.log(newBatch);
    alert("Batch " + id + " Created");
    this.scannedTags.id = id;
    this.scannedTags.description = description;
    this.scannedTags.location = location;

    this._mdlCtrl.dismiss();
  }
}

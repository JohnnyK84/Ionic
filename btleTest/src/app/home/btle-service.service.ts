import { Injectable } from "@angular/core";
import { RfidTag } from "../models/rfidTag";
import { BatchTags } from "../models/batchTags";
import { ModalController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class BtleServiceService {
  public rfidTag: RfidTag = {
    countryCode: 0,
    nationalCode: 0
  };

  rfidTags: RfidTag[] = [];

  public scannedTags: BatchTags = {
    id: 0,
    // tags: this.rfidTags,
    //date: null,
    location: "",
    description: ""
  };

  constructor(private _mdlCtrl: ModalController) {}

  addRfidTag(tag: RfidTag) {
    this.rfidTags.push(tag);
  }

  getTags() {
    return this.rfidTags;
  }

  getBatch() {
    return this.scannedTags;
  }

  newBatch(id: number, location: string, description: string) {
    const newBatch = new BatchTags(id, location, description);
    console.log(newBatch);
    alert("Batch " + id + " Created");
    this._mdlCtrl.dismiss();
  }
}

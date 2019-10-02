import { Injectable } from '@angular/core';
import { RfidTag } from '../models/rfidTag';
import { BatchTags } from '../models/batchTags';

@Injectable({
  providedIn: 'root'
})
export class BtleServiceService {

  public rfidTag: RfidTag = {
    countryCode: 0,
    nationalCode: 0
  };

  rfidTags: RfidTag[] = [];

  public scannedTags: BatchTags = {
     id: 0,
     tags: this.rfidTags,
     date: null,
     location: ''
  };

  constructor() { }

  addRfidTag(tag: RfidTag) {
    this.rfidTags.push(tag);
  }

  getTags() {
    return this.rfidTags;
  }

  getBatch() {
    return this.scannedTags;
  }
}

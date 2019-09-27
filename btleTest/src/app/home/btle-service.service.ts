import { Injectable } from '@angular/core';
import { RfidTag } from '../models/rfidTag';

@Injectable({
  providedIn: 'root'
})
export class BtleServiceService {

  public rfidTag: RfidTag = {
    countryCode: 0,
    nationalCode: 0
  };

  rfidTags: RfidTag[] = [];

  constructor() { }

  addRfidTag(tag: RfidTag) {
    this.rfidTags.push(tag);
  }

  getTags() {
    return this.rfidTags;
  }
}

import { RfidTag } from "./rfidTag";

export class BatchTags {
  constructor(
    public id: number,
    public tags: RfidTag[],
    public date: Date,
    public location: string,
    public description: string
  ) {}
}

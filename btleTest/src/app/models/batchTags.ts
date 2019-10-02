import { RfidTag } from './rfidTag';

export class BatchTags {
    id: number;
    tags: RfidTag[];
    date: Date;
    location: string;
}

export interface IAnnouncement extends Document {
  _id?: string;
  title: string;
  details: string;
  is_deleted: boolean;
  createdAt: string;
}

import { v4 as uuidv4 } from "uuid";

export default abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }

  updateTimestamps() {
    this.updatedAt = new Date();
  }

  softDelete() {
    this.deletedAt = new Date();
  }
}

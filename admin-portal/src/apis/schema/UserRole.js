export class UserRole {
    constructor(id, key, title, privilegeSet, createdAt, updatedAt, createdBy, updatedBy, status) {
      this.id = id;
      this.key = key;
      this.title = title;
      this.privilegeSet = privilegeSet;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.createdBy = createdBy;
      this.updatedBy = updatedBy;
      this.status = status;
    }
  }
  
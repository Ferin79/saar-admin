export interface User {
  id: number;
  email: string;
  provider: string;
  socialId: null;
  firstName: string;
  lastName: string;
  photo: Photo;
  role: Role;
  status: Role;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface Photo {
  id: string;
  path: string;
}

export interface Role {
  id: number;
  name: string;
  __entity: string;
}

export enum RoleEnum {
  admin = 1,
  user = 2,
}

export enum StatusEnum {
  active = 1,
  inactive = 2,
}

import { UpdateManagerAdminDto } from './update-manager-admin-dto';
import { UpdateManagerDto } from './update-manager-dto';

export interface IUpdate {
  managerId: string;
  manager: UpdateManagerDto;
}

export interface IUpdatePicture {
  managerId: string;
  picturePath: string;
  filename: string;
}

export interface IUpdateManagerAsAdmin {
  managerId: string;
  managerData: UpdateManagerAdminDto;
}

export interface IUpdatePasswordById {
  managerId: string;
  password: string;
}

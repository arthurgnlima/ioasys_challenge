import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateRoomDTO {
  name: string;
  admin_id: string;
  users: User[];
}

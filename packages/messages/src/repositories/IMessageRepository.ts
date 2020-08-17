import ICreateMessageDTO from '../dtos/ICreateMessageDTO';
import Message from '../infra/typeorm/schemas/Message';

export default interface IMesageRepository {
  create(data: ICreateMessageDTO): Promise<Message>;
}

export default interface ISocketProvider {
  emit(key: string, value: any): Promise<void>;
}

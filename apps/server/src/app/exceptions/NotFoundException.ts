import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(id: string, trace?: Error) {
    super(404, `Item with id ${id} not found`, trace);
  }
}

export default NotFoundException;

import HttpException from './HttpException';

class ForbiddenException extends HttpException {
  constructor() {
    super(400, `Forbidden`);
  }
}

export default ForbiddenException;

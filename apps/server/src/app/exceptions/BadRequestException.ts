import HttpException from './HttpException';

class BadRequestException extends HttpException {
  constructor(msg = 'Bad request', trace?: Error) {
    super(400, msg, trace);
  }
}

export default BadRequestException;

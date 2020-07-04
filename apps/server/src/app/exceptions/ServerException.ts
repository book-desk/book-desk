import HttpException from './HttpException';

class ServerException extends HttpException {
  constructor(trace?: Error) {
    super(500, `Server Error`, trace);
  }
}

export default ServerException;

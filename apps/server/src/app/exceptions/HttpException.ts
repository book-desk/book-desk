class HttpException extends Error {
  status: number;
  message: string;
  trace: Error;
  constructor(status: number, message: string, trace?: Error) {
    super(message);
    this.status = status;
    this.message = message;
    this.trace = trace;
  }
}

export default HttpException;

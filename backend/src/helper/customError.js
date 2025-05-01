class CustomError extends Error {
  name = "Custom Error";

  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export default CustomError;

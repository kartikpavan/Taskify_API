// A constructor method is a special method we invoke when we instanciate a class
// In our case we pass 2 arguments
// since we are inheriting / extending Error class we need to call super method
// which in-turn invokes the constructor of the parent class , so that we can have access to all methods and properties of parent class

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};

module.exports = { createCustomError, CustomAPIError };

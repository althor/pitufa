export class ApplicationError extends Error {
  constructor(
    message: string, // mensaje interno del error
    public statusCode: number, // codigo http de respuesta especifico
    public status: string // mensaje de respuesta especifico
  ) {
    super(message);
    this.name = "ApplicationError";
  }
}
    
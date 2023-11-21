import { 
  Catch,
  ArgumentsHost,
  Logger,
  ExceptionFilter
} from "@nestjs/common";
import { ValidationError } from "class-validator";


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  private readonly logger = new Logger(AllExceptionsFilter.name);


  catch( exception: any, host: ArgumentsHost ) {

    const ctx =  host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if(exception instanceof ValidationError) {
      const errors = response as ValidationError[];
      const formattedErrors = errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      }));
      response
     .status(400)
     .json({
       statusCode: 400,
       timestamp: new Date().toISOString(),
       path: request.url,
       errors: formattedErrors,
     });
    }

    /* if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;

      response.status(status).json({
        message,
        timestamp: new Date().toISOString(),
        path: request.url 
      });
    }
 */

  }
}

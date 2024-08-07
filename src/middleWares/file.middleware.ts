import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api-error";

class FileMiddleware {
  public isFileValid(
    param: string,
    config: { MAX_SIZE: number; MIME_TYPES: string[] },
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const file = req.files[param] as UploadedFile;
        if (!file) {
          throw new ApiError("File not found", 400);
        }
        if (file.size > config.MAX_SIZE) {
          throw new ApiError("Max file size is 5mb", 400);
        }
        if (!config.MIME_TYPES.includes(file.mimetype)) {
          throw new ApiError("File type error", 400);
        }
        next();
      } catch (e) {
        next(new ApiError(e.message, 400));
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();

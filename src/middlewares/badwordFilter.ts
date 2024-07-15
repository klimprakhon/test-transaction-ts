import { Request, Response, NextFunction } from "express";

const badwords = ["Bloody", "Hell", "Shit", "Fuck", "Damn", "Cunt", "Bitch"];

export const badwordFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filterText = (text: string) => {
    return badwords.reduce((acc, word) => {
      const regex = new RegExp(word, "gi");
      return acc.replace(regex, "***");
    }, text);
  };

  if (req.body.note) {
    req.body.note = filterText(req.body.note);
  }

  next();
};

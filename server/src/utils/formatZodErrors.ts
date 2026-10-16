import { ZodError } from "zod";

export const formatZodErrors = (error: ZodError) => {
  const formatted: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path.join(".") || "_root";
    if (!formatted[field]) {
      formatted[field] = issue.message;
    }
  }
  return formatted;
};

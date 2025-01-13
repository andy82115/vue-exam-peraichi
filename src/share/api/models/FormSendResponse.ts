import { z } from "zod";

const FormSendResponseSchema = z.object({
  createdAt: z.number().optional(),
  fullName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  question: z.string().optional(),
  expectFeedback: z.number().optional(),
  describe: z.string().optional(),
  images: z.array(z.string()).optional(),
  isPrivatePermission: z.boolean().optional(),
});

const ApiResponseSchema = z.object({
  args: z.object({}).optional(),
  data: z.string().optional(),
  files: z.object({}).optional(),
  form: z.object({}).optional(),
  headers: z.object({
    Accept: z.string().optional(),
    "Accept-Encoding": z.string().optional(),
    "Cache-Control": z.string().optional(),
    "Content-Length": z.string().optional(),
    "Content-Type": z.string().optional(),
    Host: z.string().optional(),
    "Postman-Token": z.string().optional(),
    "User-Agent": z.string().optional(),
    "X-Amzn-Trace-Id": z.string().optional(),
  }).optional(),
  json: FormSendResponseSchema.optional(),
  origin: z.string().optional(),
  url: z.string().optional(),
});

type ApiResponse = z.infer<typeof ApiResponseSchema>;

type FormSendResponse = z.infer<typeof FormSendResponseSchema>;

export {ApiResponseSchema};
export type { ApiResponse, FormSendResponse };

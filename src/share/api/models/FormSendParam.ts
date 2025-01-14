import { z } from 'zod';

const FormSendParamSchema = z.object({
  createdAt: z.string().datetime().optional(),
  fullName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  question: z.string().optional(),
  expectFeedback: z.string().datetime().optional(),
  describe: z.string().optional(),
  images: z.array(z.string()).optional(),
  isPrivatePermission: z.boolean().optional(),
  id: z.string().optional(),
});

type FormSendParam = z.infer<typeof FormSendParamSchema>;

export { FormSendParamSchema };
export type { FormSendParam };

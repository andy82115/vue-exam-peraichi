import { z } from "zod";
import { FormSendParamSchema, type FormSendParam } from "../../../share/api/models/FormSendParam";

// FormPresenterのために特化する型定義
const FormSendDataSchema = z.object(
  Object.fromEntries(
    Object.entries(FormSendParamSchema.shape).map(([key, schema]) => [
      key,
      z.object({
        value: schema,
        isRequired: z.boolean(),
      }),
    ])
  )
);

type FormSendData = z.infer<typeof FormSendDataSchema>;

const formSendDataToParam = (sendData: FormSendData): FormSendParam => {
    const parsedData = FormSendDataSchema.parse(sendData);

  const result: Record<string, any> = {};
  for (const key in parsedData) {
    result[key] = parsedData[key].value;
  }

  return FormSendParamSchema.parse(result);
}

export { formSendDataToParam }

export type { FormSendData };

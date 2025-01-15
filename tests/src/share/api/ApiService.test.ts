import { describe, it, expect } from "vitest";
import { FormApiService } from "../../../../src/share/api/ApiService";
import type { FormSendResponse } from "../../../../src/share/api/models/FormSendResponse";
import type { FormSendParam } from "../../../../src/share/api/models/FormSendParam";
import { config } from "dotenv";

config({ path: ".env" });

describe("FormApiService Integration Test", () => {
  const service = new FormApiService();

  // 実際にAPIの発送をチェックします。　必要の時、skipを消しって、テストします。
  it.skip("should send a form and return a valid response from the actual API", async () => {
    try {
      const params: FormSendParam = {
        id: "12323",
        createdAt: Date.now().toString(),
        fullName: "Andy Yeh",
        firstName: "Andy",
        lastName: "Yeh",
        email: "andy@example.com",
        question: "What is your question?",
        expectFeedback: Date.now().toString(),
        describe: "Description of the issue",
        images: ["image1.png", "image2.png"],
        isPrivatePermission: true,
      };

      const response = await service.formSend(params);

      function isFormSendResponse(response: any): response is FormSendResponse {
        return (
          response &&
          Array.isArray(response.images)
        );
      }

      const realResponse = response.json;

      expect(isFormSendResponse(realResponse)).toBe(true);
      expect(realResponse?.fullName ?? "").toBe("Andy Yeh");
    } catch (error) {
      console.error("Error during API request:", error);
      throw error;
    }
  });
});

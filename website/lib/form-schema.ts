import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchema = z.object({
  type: z.string().min(1, "Please select an item"),
  "slack-id": z.string({ error: "This field is required" }),
  message: z.string({ error: "This field is required" }),
});
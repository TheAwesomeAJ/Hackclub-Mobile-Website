"use client";
import * as z from "zod";
import { formSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Schema = z.infer<typeof formSchema>;

export function DraftForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema as any),
  });
  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    try {
      // TODO: implement form submission
      console.log(data);
      form.reset();
    } catch (error) {
      // TODO: handle error
    }
  });

  if (isSubmitSuccessful) {
    return (
      <div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="h-full py-6 px-3"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
          >
            <Check className="size-8" />
          </motion.div>
          <h2 className="text-center text-2xl text-pretty font-bold mb-2">
            Thank you for contacting us!
          </h2>
          <p className="text-center text-lg text-pretty text-muted-foreground">
            Keep an eye on your Slack DMs within Hack Club! Our HC Mobile Hub bot will reach out to you soon, and one of our team members will personally follow up within 24-48 hours. If you need immediate assistance, please use the button below—but only for urgent matters. We're here to help!
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 max-w-3xl mx-auto"
    >
      <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
        <h2 className="mt-4 mb-1 font-bold text-2xl tracking-tight col-span-full">
        Get in Touch
        </h2>
        <p className="tracking-wide text-muted-foreground mb-5 text-wrap text-sm col-span-full">
        We'd love to hear from you! Fill out the form below to reach out. We chat with everyone via Hack Club Slack, so make sure to include your Slack ID. If you skip it, we won’t be able to get back to you.
        </p>

        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => {
            const options = [
              { value: "bug", label: "Bug Report" },
              { value: "question", label: "Question" },
              { value: "feedback", label: "Feedback" },
            ];
            return (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 col-span-full"
              >
                <FieldLabel htmlFor="type">Message Type *</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          name="slack-id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full"
            >
              <FieldLabel htmlFor="slack-id">Slack ID *</FieldLabel>
              <Input
                {...field}
                id="slack-id"
                type="text"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your Slack ID"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full"
            >
              <FieldLabel htmlFor="message">Message *</FieldLabel>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                id="message"
                placeholder="Enter your message"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-end items-center w-full">
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

// Default export required by Next.js for pages
export default function Page() {
  return (
    <div className="min-h-screen flex -mt-20 items-center justify-center">
      <DraftForm />
    </div>
  );
}
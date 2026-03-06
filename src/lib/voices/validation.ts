import { z } from "zod";

export const submissionSchema = z.object({
  regionSlug: z.string().min(1),
  regionCycleWeekId: z.string().uuid(),
  name: z.string().trim().min(1, "Name is required").max(60),
  neighborhood: z.string().trim().min(2, "Neighborhood or area is required").max(80),
  response: z.string().trim().min(5, "Response must be at least 5 characters").max(500),
  consentPublic: z.boolean().optional().default(true),
  website: z.string().optional(),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

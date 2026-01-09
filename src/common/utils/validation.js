import { z } from "zod";

// Experience content schema
export const experienceContentSchema = z
  .string({
    required_error: "Please enter your experience",
    invalid_type_error: "Experience must be text",
  })
  .min(50, "Experience must be at least 50 characters")
  .max(2000, "Experience must not exceed 2000 characters")
  .transform((val) => val.trim());

// Full experience creation schema
export const createExperienceSchema = z.object({
  content: experienceContentSchema,
});

// Pagination query schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

/**
 * Validate experience content
 * @param {string} content - Content to validate
 * @returns {{ success: boolean, data?: string, error?: string }}
 */
export function validateExperience(content) {
  const result = experienceContentSchema.safeParse(content);

  if (!result.success) {
    const errorMessage =
      result.error.issues?.[0]?.message ||
      result.error.errors?.[0]?.message ||
      "Invalid experience";

    return {
      success: false,
      error: errorMessage,
    };
  }

  return { success: true, data: result.data };
}

export default {
  experienceContentSchema,
  createExperienceSchema,
  paginationSchema,
  validateExperience,
};

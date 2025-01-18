import z from 'zod';

// TODO: Add validation for the device schema
const userSchema = z.object({
  Name: z.string().min(1).max(255),
  State: z.enum(['Active', 'Inactive']).default('Active'),
  Battery: z.string().min(1).max(255),
  Storage: z.string().min(1).max(255),
  Price: z.string().min(1).max(255),
  MainCamera: z.string().min(1).max(255),
  FrontCamera: z.string().min(1).max(255),
  // optional fields
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export function validateDevice (input) {
  return userSchema.safeParse(input);
}

export function validatePartialDevice (input) {
  return userSchema.partial().safeParse(input);
}

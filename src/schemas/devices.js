import z from 'zod';

// TODO: Add validation for the device schema
const userSchema = z.object({

});

export function validateDevice (input) {
  return userSchema.safeParse(input);
}

export function validatePartialDevice (input) {
  return userSchema.partial().safeParse(input);
}

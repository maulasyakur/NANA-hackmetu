"use server"

import pool from '@/lib/pool';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character.' })
    .trim(),
});

type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function registerAdmin(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early with validation errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into the database
  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert into the database
    await pool.query(
      `INSERT INTO "public"."admin" ("email", "password")
       VALUES ($1, $2)`,
      [email, hashedPassword]
    );

    // Return success response
    return {
      errors: {
        password: ['Registration success!'],
      },
    };
  } catch (err: any) {
    if (err.code === '23505') { // Unique violation error code
      // Return error for duplicate email
      return {
        errors: {
          email: ['Email already exists in the database'],
        },
      };
    }

    // Return a generic error for other unexpected errors
    return {
      errors: {
        password: ['An unexpected error occurred. Please try again later.'],
      },
    };
  }
}

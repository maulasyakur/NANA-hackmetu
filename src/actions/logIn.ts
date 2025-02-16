"use server"

import pool from '@/lib/pool'
import bcrypt from 'bcryptjs'
import { signIn } from 'next-auth/react'
import { number, z } from 'zod'

const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .trim(),
})

type FormState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
    }
  }
  | undefined

export async function login(state: FormState, formData: FormData): Promise<{ errors: { email?: string[], password?: string[] } }> {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Prepare data for insertion into the database
  const { email, password } = validatedFields.data;

  try {
    // Insert into the database
    const result = await pool.query(
      `SELECT password FROM "public"."admin" WHERE email = $1`,
      [email]
    );

    // Check if the email exists
    if (result.rows.length === 0) {
      return {
        errors: {
          email: ["Email isn't registered."],
        },
      };
    }

    // Extract the hashed password from the database
    const hashedPassword = result.rows[0].password;

    // Compare provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return {
        errors: {
          password: ["Password is invalid."],
        },
      };
    }
    const userId = result.rows[0].password

    // const res = await signIn("credentials", {
    //   email,
    //   password,
    //   userId,
    //   redirect: false,
    // });

    // if (res?.error) {
    //   return {
    //     errors: {
    //       password: ['Error Signing In'],
    //     },
    //   };
    // }

    // Return success response
    return {
      errors: {
        password: ['Login success!'],
      },
    };
  } catch (err: any) {
    // Return a generic error for other unexpected errors
    return {
      errors: {
        password: [`An unexpected error occurred. Please try again later. ${err}`],
      },
    };
  }
}
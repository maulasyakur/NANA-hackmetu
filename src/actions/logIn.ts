import { number, z } from 'zod'
 
export const SignupFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .trim(),
})
 
export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export async function login(state: FormState, formData: FormData) {
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
   
    // // 2. Prepare data for insertion into database
    // const { name, email, password } = validatedFields.data
    // // e.g. Hash the user's password before storing it
    // const hashedPassword = await bcrypt.hash(password, 10)
    
    // // 3. Insert the user into the database or call an Auth Library's API
    // const data = await db
    //     .insert(users)
    //     .values({
    //     name,
    //     email,
    //     password: hashedPassword,
    //     })
    //     .returning({ id: users.id })
    
    // const user = data[0]
    
    // if (!user) {
    //     return {
    //     message: 'An error occurred while creating your account.',
    //     }
    // }
  }
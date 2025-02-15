import { number, z } from 'zod'
 
export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: ' Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
        })
        .trim(),
    idNumber: z.number({
        required_error: "ID Number is required.",
        invalid_type_error: "ID Number is required.",
    })
        .refine((value) => {
            // Convert the number to a string and check its length
            return value.toString().length === 11;
        }, {
            message: 'ID number must be exactly 11 digits long.',
        }),
    city: z.string()
        .min(2, { message: 'Pick a region.' })
        .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        idNumber?: string[]
        city?: string[]
      }
      message?: string
    }
  | undefined

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      idNumber: formData.get('idNumber'),
      city: formData.get('city'),
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
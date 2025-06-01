'use server';
import postgres from 'postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const StudentFormSchema = z.object({
    id: z.string().optional(),
    firstname: z.string().min(1, { message: 'First name cannot be empty.' }),
    lastname: z.string().min(1, { message: 'Last name cannot be empty.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    grade: z.string().min(1, { message: 'Grade cannot be empty.' }),
    dateofbirth: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    phonenumber: z.string().nullable().optional(),
    enrollmentdate: z.string().nullable().optional(),
    parentscontact: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
    avatarurl: z.string().nullable().optional(),
});

const CreateStudent = StudentFormSchema.omit({ id: true });

export type StudentState = {
    errors?: {
        firstname?: string[];
        lastname?: string[];
        email?: string[];
        grade?: string[];
        dateofbirth?: string[];
        address?: string[];
        phonenumber?: string[];
        enrollmentdate?: string[];
        parentscontact?: string[];
        notes?: string[];
        avatarurl?: string[];
    };
    message?: string | null;
};

export async function createStudent(jsonData: any): Promise<StudentState> {
    const validatedFields = CreateStudent.safeParse({
        firstname: jsonData.firstname ?? null,
        lastname: jsonData.lastname ?? null,
        email: jsonData.email ?? null,
        grade: jsonData.grade ?? null,
        dateofbirth: jsonData.dateofbirth ?? null,
        address: jsonData.address ?? null,
        phonenumber: jsonData.phonenumber ?? null,
        enrollmentdate: jsonData.enrollmentdate ?? null,
        parentscontact: jsonData.parentscontact ?? null,
        notes: jsonData.notes ?? null,
        avatarurl: jsonData.avatarurl ?? null,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Could not create student.',
        };
    }

    const {
        firstname, lastname, email, grade, dateofbirth, address, phonenumber, enrollmentdate, parentscontact, notes, avatarurl,
    } = validatedFields.data;

    try {
        await sql`
            INSERT INTO students (
                firstname, lastname, email, grade, dateofbirth, address, phonenumber, enrollmentdate, parentscontact, notes, avatarurl
            ) VALUES (
                ${firstname}, ${lastname}, ${email}, ${grade}, ${dateofbirth ?? null}, ${address ?? null}, ${phonenumber ?? null}, ${enrollmentdate ?? null}, ${parentscontact ?? null}, ${notes ?? null}, ${avatarurl ?? null}
            )
        `;
        return { message: 'Student created successfully.' };
    } catch (error) {
        console.error('SQL Error:', error);
        return {
            message: 'Database error: Could not create student.',
        };
    }
}

export async function updateStudent(
    student: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        grade: string;
        dateofbirth?: string | null;
        address?: string | null;
        phonenumber?: string | null;
        enrollmentdate?: string | null;
        parentscontact?: string | null;
        notes?: string | null;
    }
) {
    const validatedFields = StudentFormSchema.safeParse(student);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Could not update student.',
        };
    }

    const { id, firstname, lastname, email, grade, dateofbirth, address, phonenumber, enrollmentdate, parentscontact, notes,
    } = validatedFields.data;


    try {
        await sql`
            UPDATE students SET
                firstname = ${firstname},
                lastname = ${lastname},
                email = ${email},
                grade = ${grade},
                dateofbirth = ${dateofbirth ?? null},
                address = ${address ?? null},
                phonenumber = ${phonenumber ?? null},
                enrollmentdate = ${enrollmentdate ?? null},
                parentscontact = ${parentscontact ?? null},
                notes = ${notes ?? null}
            WHERE id = ${id}
        `;
        revalidatePath('/dashboard/Students');
        return { success: true };
    } catch (error: any) { 
        return {
            message: 'Database error: Could not update student.',
            error: error?.message,
        };
    }
}

export async function deleteStudent(id: string) {
  try {
    const result = await sql`DELETE FROM students WHERE id = ${id}`;
    if (result.count === 0) {
      return { message: 'Student not found.' };
    }
    return { message: 'Student deleted successfully.' };
  } catch (error) {
    return {
      message: 'Database error: Could not delete student.',
      error: (error as Error).message,
    };
  }
}

//Teacher Actions
const TeacherFormSchema = z.object({
    id: z.string().optional(),
    firstname: z.string().min(1, { message: 'First name cannot be empty.' }),
    lastname: z.string().min(1, { message: 'Last name cannot be empty.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    subject: z.string().min(1, { message: 'Subject cannot be empty.' }),
    phonenumber: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    hiredate: z.string().nullable().optional(),
    qualification: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    avatarurl: z.string().nullable().optional(),
});

const CreateTeacher = TeacherFormSchema.omit({ id: true });
export type TeacherState = {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    subject?: string;
    phonenumber?: string | null;
    address?: string | null;
    hiredate?: string | null;
    qualification?: string | null;
    bio?: string | null;
    avatarurl?: string | null;
    errors?: {
        firstname?: string[];
        lastname?: string[];
        email?: string[];
        subject?: string[];
        phonenumber?: string[];
        address?: string[];
        hiredate?: string[];
        qualification?: string[];
        bio?: string[];
        avatarurl?: string[];
    };
    message?: string | null;
};

export async function createTeacher(jsonData: any): Promise<TeacherState> {
  console.log('Received data:', jsonData);
  const validation = CreateTeacher.safeParse({
    firstname: jsonData.firstname,
    lastname: jsonData.lastname,
    email: jsonData.email,
    subject: jsonData.subject,
    phonenumber: jsonData.phonenumber,
    address: jsonData.address,
    hiredate: jsonData.hiredate,
    qualification: jsonData.qualification,
    bio: jsonData.bio,
    avatarurl: jsonData.avatarurl,
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Could not create teacher.',
    };
  }

  const {
    firstname, lastname, email, subject, phonenumber, address, hiredate, qualification, bio, avatarurl,
  } = validation.data;

  try {
    await sql`
            INSERT INTO teachers (
                firstname, lastname, email, subject, phonenumber, address, hiredate, qualification, bio, avatarurl
            ) VALUES (
                ${firstname}, ${lastname}, ${email}, ${subject}, ${phonenumber ?? null}, ${address ?? null}, ${hiredate ?? null}, ${qualification ?? null}, ${bio ?? null}, ${avatarurl ?? null}
            )
        `;

    return { message: 'Teacher created successfully.' };
  } catch (error) {
    console.error('SQL Error:', error);
    return {
      message: 'Database error: Could not create teacher.',
      errors: {},
    };
  }
}

export async function updateTeacher(
  teacher: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    subject: string;
    phonenumber?: string | null;
    address?: string | null;
    hiredate?: string | null;
    qualification?: string | null;
    bio?: string | null;
  }
) {
  const validatedFields = TeacherFormSchema.safeParse(teacher);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Could not update teacher.',
    };
  }

  const { id, firstname, lastname, email, subject, phonenumber, address, hiredate, qualification, bio } = validatedFields.data;

  try {
    await sql`
      UPDATE teachers SET
        firstname = ${firstname},
        lastname = ${lastname},
        email = ${email},
        subject = ${subject},
        phonenumber = ${phonenumber ?? null},
        address = ${address ?? null},
        hiredate = ${hiredate ?? null},
        qualification = ${qualification ?? null},
        bio = ${bio ?? null}
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/Teachers');
    return { success: true };
  } catch (error: any) {
    return {
      message: 'Database error: Could not update teacher.',
      error: error?.message,
    };
  }
}

export async function deleteTeacher(id: string) {
  try {
    const result = await sql`DELETE FROM teachers WHERE id = ${id}`;
    if (result.count === 0) {
      return { message: 'Teacher not found.' };
    }
    return { message: 'Teacher deleted successfully.' };
  } catch (error) {
    return {
      message: 'Database error: Could not delete teacher.',
      error: (error as Error).message,
    };
  }
}
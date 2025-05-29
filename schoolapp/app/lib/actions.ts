'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { Student } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const StudentFormSchema = z.object({
    id: z.string().optional(),
    firstname: z.string({
        required_error: 'First name is required.',
    }).min(1, { message: 'First name cannot be empty.' }),
    lastname: z.string({
        required_error: 'Last name is required.',
    }).min(1, { message: 'Last name cannot be empty.' }),
    email: z.string({
        required_error: 'Email is required.',
    }).email({ message: 'Invalid email address.' }),
    grade: z.string({
        required_error: 'Grade is required.',
    }).min(1, { message: 'Grade cannot be empty.' }),
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

export async function createStudent(prevState: StudentState, formData: FormData) {

    const validatedFields = CreateStudent.safeParse({
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        grade: formData.get('grade'),
        dateofbirth: formData.get('dateofbirth') || null,
        address: formData.get('address') || null,
        phonenumber: formData.get('phonenumber') || null,
        enrollmentdate: formData.get('enrollmentdate') || null,
        parentscontact: formData.get('parentscontact') || null,
        notes: formData.get('notes') || null,
        avatarurl: formData.get('avatarurl') || null,
    });

    // If validation fails, return errors
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Could not create student.',
        };
    }

    const {
        firstname,
        lastname,
        email,
        grade,
        dateofbirth,
        address,
        phonenumber,
        enrollmentdate,
        parentscontact,
        notes,
        avatarurl,
    } = validatedFields.data;

    // Ensure no undefined values are passed to SQL (convert undefined to null)
    const safefirstname = firstname ?? null;
    const safelastname = lastname ?? null;
    const safeEmail = email ?? null;
    const safeGrade = grade ?? null;
    const safedateofbirth = dateofbirth ?? null;
    const safeAddress = address ?? null;
    const safephonenumber = phonenumber ?? null;
    const safeenrollmentdate = enrollmentdate ?? null;
    const safeparentscontact = parentscontact ?? null;
    const safeNotes = notes ?? null;
    const safeAvatarurl = avatarurl ?? null;

    try {
        await sql`
            INSERT INTO students (
                firstname, lastname, email, grade, dateofbirth, address, phonenumber, enrollmentdate, parentscontact, notes, avatarurl
            ) VALUES (
                ${safefirstname}, ${safelastname}, ${safeEmail}, ${safeGrade}, ${safedateofbirth}, ${safeAddress}, ${safephonenumber}, ${safeenrollmentdate}, ${safeparentscontact}, ${safeNotes}, ${safeAvatarurl}
            )
        `;
    } catch (error) {
        return {
            message: 'Database error: Could not create student.',
        };
    }

    revalidatePath('/dashboard/Students');
    redirect('/dashboard/Students');
}

const CreateTeacher = StudentFormSchema.omit({ id: true });

export type TeacherState = {
    errors?: {
        firstname?: string[];
        lastname?: string[];
        email?: string[];
        subject?: string[];
        phonenumber?: string[];
        address?: string[];
        hireDate?: string[];
        qualification?: string[];
        bio?: string[];
        avatarUrl?: string[];
    };
    message?: string | null;
};

export async function createTeacher(prevState: TeacherState, formData: FormData) {

    const TeacherFormSchema = z.object({
        firstname: z.string({
            required_error: 'First name is required.',
        }).min(1, { message: 'First name cannot be empty.' }),
        lastname: z.string({
            required_error: 'Last name is required.',
        }).min(1, { message: 'Last name cannot be empty.' }),
        email: z.string({
            required_error: 'Email is required.',
        }).email({ message: 'Invalid email address.' }),
        subject: z.string({
            required_error: 'Subject is required.',
        }).min(1, { message: 'Subject cannot be empty.' }),
        phonenumber: z.string().nullable().optional(),
        address: z.string().nullable().optional(),
        hiredate: z.string().nullable().optional(),
        qualification: z.string().nullable().optional(),
        bio: z.string().nullable().optional(),
        avatarurl: z.string().nullable().optional(),
    });

    const validatedFields = TeacherFormSchema.safeParse({
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        phonenumber: formData.get('phonenumber') || null,
        address: formData.get('address') || null,
        hiredate: formData.get('hiredate') || null,
        qualification: formData.get('qualification'),
        bio: formData.get('bio') || null,
        avatarurl: formData.get('avatarurl') || null,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Could not create teacher.',
        };
    }

    const {
        firstname,
        lastname,
        email,
        subject,
        phonenumber,
        address,
        hiredate,
        qualification,
        bio,
        avatarurl,
    } = validatedFields.data;

    const safefirstname = firstname ?? null;
    const safelastname = lastname ?? null;
    const safeemail = email ?? null;
    const safesubject = subject ?? null;
    const safephonenumber = phonenumber ?? null;
    const safeaddress = address ?? null;
    const safehiredate = hiredate ?? null;
    const safequalification = qualification ?? null;
    const safebio = bio ?? null;
    const safeavatarurl = avatarurl ?? null;

    try {
        await sql`
            INSERT INTO teachers (
                firstname, lastname, email, subject, phonenumber, address, hiredate, qualification, bio, avatarurl
            ) VALUES (
                ${safefirstname}, ${safelastname}, ${safeemail}, ${safesubject}, ${safephonenumber}, ${safeaddress}, ${safehiredate}, ${safequalification}, ${safebio}, ${safeavatarurl}
            )
        `;
    } catch (error) {
        return {
            message: 'Database error: Could not create teacher.',
        };
    }

    revalidatePath('/dashboard/Teachers');
    redirect('/dashboard/Teachers');
}

export async function updateStudent(prevState: StudentState, formData: FormData) {
    const validatedFields = StudentFormSchema.safeParse({
        id: formData.get('id'),
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        grade: formData.get('grade'),
        dateofbirth: formData.get('dateofbirth') || null,
        address: formData.get('address') || null,
        phonenumber: formData.get('phonenumber') || null,
        enrollmentdate: formData.get('enrollmentdate') || null,
        parentscontact: formData.get('parentscontact') || null,
        notes: formData.get('notes'),
        avatarUrl: formData.get('avatarUrl') || null,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Could not update student.',
        };
    }

    const {
        id,
        firstname,
        lastname,
        email,
        grade,
        dateofbirth,
        address,
        phonenumber,
        enrollmentdate,
        parentscontact,
        notes,
        avatarurl,
    } = validatedFields.data;

    const safeId = id ?? null;
    const safeFirstname = firstname ?? null;
    const safeLastname = lastname ?? null;
    const safeEmail = email ?? null;
    const safeGrade = grade ?? null;
    const safeDateofbirth = dateofbirth ?? null;
    const safeAddress = address ?? null;
    const safePhonenumber = phonenumber ?? null;
    const safeEnrollmentdate = enrollmentdate ?? null;
    const safeParentscontact = parentscontact ?? null;
    const safeNotes = notes ?? null;
    const safeAvatarurl = avatarurl ?? null;

    try {
        await sql`
            UPDATE students SET
                firstname = ${safeFirstname},
                lastname = ${safeLastname},
                email = ${safeEmail},
                grade = ${safeGrade},
                dateofbirth = ${safeDateofbirth},
                address = ${safeAddress},
                phonenumber = ${safePhonenumber},
                enrollmentdate = ${safeEnrollmentdate},
                parentscontact = ${safeParentscontact},
                notes = ${safeNotes},
                avatarurl = ${safeAvatarurl}
            WHERE id = ${safeId}
        `;
    } catch (error) {
        return {
            message: 'Database error: Could not update student.',
        };
    }

    revalidatePath('/dashboard/Students');
    redirect('/dashboard/Students');
}

export async function updateTeacher(prevState: TeacherState, formData: FormData) {
    const TeacherFormSchemaWithId = z.object({
        id: z.string(),
        firstname: z.string({
            required_error: 'First name is required.',
        }).min(1, { message: 'First name cannot be empty.' }),
        lastname: z.string({
            required_error: 'Last name is required.',
        }).min(1, { message: 'Last name cannot be empty.' }),
        email: z.string({
            required_error: 'Email is required.',
        }).email({ message: 'Invalid email address.' }),
        subject: z.string({
            required_error: 'Subject is required.',
        }).min(1, { message: 'Subject cannot be empty.' }),
        phonenumber: z.string().nullable().optional(),
        address: z.string().nullable().optional(),
        hiredate: z.string().nullable().optional(),
        qualification: z.string().nullable().optional(),
        bio: z.string().nullable().optional(),
        avatarurl: z.string().nullable().optional(),
    });

    const validatedFields = TeacherFormSchemaWithId.safeParse({
        id: formData.get('id'),
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        phonenumber: formData.get('phonenumber') || null,
        address: formData.get('address') || null,
        hiredate: formData.get('hiredate') || null,
        qualification: formData.get('qualification') || null,
        bio: formData.get('bio') || null,
        avatarurl: formData.get('avatarurl') || null,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Could not update teacher.',
        };
    }

    const {
        id,
        firstname,
        lastname,
        email,
        subject,
        phonenumber,
        address,
        hiredate,
        qualification,
        bio,
        avatarurl,
    } = validatedFields.data;
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
                bio = ${bio ?? null},
                avatarurl = ${avatarurl ?? null}
            WHERE id = ${id}
        `;
    } catch (error) {
        return {
            message: 'Database error: Could not update teacher.',
        };
    }

    revalidatePath('/dashboard/Teachers');
    redirect('/dashboard/Teachers');
}

export async function deleteStudent(id: string) {
    try {
        await sql`DELETE FROM students WHERE id = ${id}`;
    } catch (error) {
        return {
            message: 'Database error: Could not delete student.',
        };
    }
    revalidatePath('/dashboard/Students');
}

export async function deleteTeacher(id: string) {
    try {
        await sql`DELETE FROM teachers WHERE id = ${id}`;
    } catch (error) {
        return {
            message: 'Database error: Could not delete teacher.',
        };
    }
    revalidatePath('/dashboard/Teachers');
}
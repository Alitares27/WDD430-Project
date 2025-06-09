"use server";
import postgres from "postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const StudentFormSchema = z.object({
  id: z.string().optional(),
  firstname: z.string().min(1, { message: "First name cannot be empty." }),
  lastname: z.string().min(1, { message: "Last name cannot be empty." }),
  email: z.string().email({ message: "Invalid email address." }),
  grade: z.string().min(1, { message: "Grade cannot be empty." }),
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

export async function createStudent(jsonData: unknown): Promise<StudentState> {
  function isStudentInput(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === "object" && obj !== null;
  }

  if (!isStudentInput(jsonData)) {
    return {
      errors: {
        firstname: ["Invalid input data."],
      },
      message: "Invalid input data. Could not create student.",
    };
  }

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
      message: "Missing or invalid fields. Could not create student.",
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

  try {
    await sql`
            INSERT INTO students (
                firstname, lastname, email, grade, dateofbirth, address, phonenumber, enrollmentdate, parentscontact, notes, avatarurl
            ) VALUES (
                ${firstname}, ${lastname}, ${email}, ${grade}, ${dateofbirth ?? null
      }, ${address ?? null}, ${phonenumber ?? null}, ${enrollmentdate ?? null}, ${parentscontact ?? null
      }, ${notes ?? null}, ${avatarurl ?? null}
            )
        `;
    return { message: "Student created successfully." };
  } catch {
    return {
      message: "Database error: Could not create student.",
    };
  }
}

export async function updateStudent(student: {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  grade: string;
   dateofbirth?: string | null;
  address: string;
  phonenumber: string;
  enrollmentdate: string;
  parentscontact: string;
  notes?: string | null;
}) {
  const validatedFields = StudentFormSchema.safeParse(student);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Could not update student.",
    };
  }

  const {
    id,
    firstname,
    lastname,
    email,
    grade,
    dateofbirth = null,
    address,
    phonenumber,
    enrollmentdate,
    parentscontact,
    notes,
  } = validatedFields.data;

  const safeNotes = notes ?? null;

 try {
  await sql`
    UPDATE students SET
      firstname = ${firstname ?? null},
      lastname = ${lastname ?? null},
      email = ${email ?? null},
      grade = ${grade ?? null},
      dateofbirth = ${dateofbirth ?? null},
      address = ${address ?? null},
      phonenumber = ${phonenumber ?? null},
      enrollmentdate = ${enrollmentdate ?? null},
      parentscontact = ${parentscontact ?? null},
      notes = ${safeNotes ?? null}
    WHERE id = ${id ?? null}
  `;
  revalidatePath("/dashboard/Students");
  return { success: true };
} catch {
  return {
    message: "Database error: Could not update student.",
  };
}
}

export async function deleteStudent(id: string) {
  try {
    const result = await sql`DELETE FROM students WHERE id = ${id}`;
    if (result.count === 0) {
      return { message: "Student not found." };
    }
    return { message: "Student deleted successfully." };
  } catch {
    return {
      message: "Database error: Could not delete student.",
    };
  }
}

//Teacher Actions
const TeacherFormSchema = z.object({
  id: z.string().optional(),
  firstname: z.string().min(1, { message: "First name cannot be empty." }),
  lastname: z.string().min(1, { message: "Last name cannot be empty." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Subject cannot be empty." }),
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

export async function createTeacher(jsonData: unknown): Promise<TeacherState> {
  function isTeacherInput(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === "object" && obj !== null;
  }

  if (!isTeacherInput(jsonData)) {
    return {
      errors: {
        firstname: ["Invalid input data."],
      },
      message: "Invalid input data. Could not create teacher.",
    };
  }

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
      message: "Missing or invalid fields. Could not create teacher.",
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
  } = validation.data;

  try {
    await sql`
            INSERT INTO teachers (
                firstname, lastname, email, subject, phonenumber, address, hiredate, qualification, bio, avatarurl
            ) VALUES (
                ${firstname}, ${lastname}, ${email}, ${subject}, ${phonenumber ?? null
      }, ${address ?? null}, ${hiredate ?? null}, ${qualification ?? null}, ${bio ?? null
      }, ${avatarurl ?? null}
            )
        `;

    return { message: "Teacher created successfully." };
  } catch {
    return {
      message: "Database error: Could not create teacher.",
    };
  }
}

export async function updateTeacher(teacher: {
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
}) {
  const validatedFields = TeacherFormSchema.safeParse(teacher);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Could not update teacher.",
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
  } = validatedFields.data;

  try {
await sql`
  UPDATE teachers SET
    firstname = ${firstname ?? null},
    lastname = ${lastname ?? null},
    email = ${email ?? null},
    subject = ${subject ?? null},
    phonenumber = ${phonenumber ?? null},
    address = ${address ?? null},
    hiredate = ${hiredate ?? null},
    qualification = ${qualification ?? null},
    bio = ${bio ?? null}
  WHERE id = ${id ?? null}
    `;
    revalidatePath("/dashboard/Teachers");
    return { success: true };
  } catch {
    return {
      message: "Database error: Could not update teacher.",
    };
  }
}

export async function deleteTeacher(id: string) {
  try {
    const result = await sql`DELETE FROM teachers WHERE id = ${id}`;
    if (result.count === 0) {
      return { message: "Teacher not found." };
    }
    return { message: "Teacher deleted successfully." };
  } catch {
    return {
      message: "Database error: Could not delete teacher.",
    };
  }
}

// Course Actions
const CourseFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title cannot be empty." }),
  course_code: z.string().min(1, { message: "Course Code cannot be empty." }),
  description: z.string().min(1, { message: "brief description" }),
  credits: z.number().min(1, { message: "Credits must be at least 1." }),
  duration: z.string().min(1, { message: "Duration cannot be empty." }),
  difficulty_level: z
    .string()
    .min(1, { message: "Difficulty Level cannot be empty." }),
  teacher_email: z.string().email({ message: "Invalid email address." }),
});

const CreateCourse = CourseFormSchema.omit({ id: true });

export type CourseState = {
  id?: string;
  title?: string;
  course_code?: string;
  description?: string;
  credits?: number;
  duration?: string;
  difficulty_level?: string;
  teacher_email?: string;
  errors?: {
    title?: string[];
    course_code?: string[];
    description?: string[];
    credits?: string[];
    duration?: string[];
    difficulty_level?: string[];
    teacher_email?: string[];
  };
  message?: string | null;
};

export async function createCourse(jsonData: unknown): Promise<CourseState> {
  function isCourseInput(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === "object" && obj !== null;
  }

  if (!isCourseInput(jsonData)) {
    return {
      errors: {
        title: ["Invalid input data."],
      },
      message: "Invalid input data. Could not create course.",
    };
  }

  const validation = CreateCourse.safeParse({
    title: jsonData.title,
    course_code: jsonData.course_code,
    description: jsonData.description,
    credits: jsonData.credits,
    duration: jsonData.duration,
    difficulty_level: jsonData.difficulty_level,
    teacher_email: jsonData.teacher_email,
  });

  if (!validation.success) {
    console.log("Validation errors:", validation.error.flatten().fieldErrors);
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Could not create course.",
    };
  }

  const {
    title,
    course_code,
    description,
    credits,
    duration,
    difficulty_level,
    teacher_email,
  } = validation.data;

  try {
    await sql`
      INSERT INTO courses (
        title, course_code, description, credits, duration, difficulty_level, teacher_email
      ) VALUES (
        ${title}, ${course_code}, ${description}, ${credits}, ${duration}, ${difficulty_level}, ${teacher_email}
      )
    `;

    return { message: "Course created successfully." };
  } catch (error) {
    console.error("Database error:", error);
    return {
      message: "Database error: Could not create course.",
    };
  }
}

export async function updateCourse(course: {
  id: string;
  title: string;
  course_code: string;
  description: string;
  credits: number;
  duration: string;
  difficulty_level: string;
  teacher_email: string;
}) {
  const validatedFields = CourseFormSchema.safeParse(course);

  if (!validatedFields.success) {
    console.error(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Could not update course.",
    };
  }

  const {
    id,
    title,
    course_code,
    description,
    credits,
    duration,
    difficulty_level,
    teacher_email,
  } = validatedFields.data;

  try {
    const result = await sql`
      UPDATE courses SET
        title = ${title},
        course_code = ${course_code},
        description = ${description},
        credits = ${credits},
        duration = ${duration},
        difficulty_level = ${difficulty_level},
        teacher_email = ${teacher_email}
      WHERE id = ${id}
      RETURNING *
    `;
    revalidatePath("/dashboard/Courses");
    if (result.length === 0) {
      console.error("No course found with id:", id);
      return null;
    }
    return result[0];
  } catch (error) {
    console.error("SQL error:", error);
    return null;
  }
}

export async function deleteCourse(id: string) {
  try {
    const result = await sql`DELETE FROM courses WHERE id = ${id}`;
    if (result.count === 0) {
      return { message: "Course not found." };
    }
    return { message: "Course deleted successfully." };
  } catch {
    return {
      message: "Database error: Could not delete course.",
    };
  }
}

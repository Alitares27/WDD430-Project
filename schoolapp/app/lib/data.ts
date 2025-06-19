import postgres from "postgres";
import { Student, Teacher, Course, Users } from "./definitions";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
import { Pool } from 'pg';

export async function getStudents() {
  try {
    const students = await sql`
      SELECT
        id,
        firstname,
        lastname,
        email,
        grade,
        dateofbirth,
        address,
        phonenumber,
        avatarurl,
        enrollmentdate,
        parentscontact,
        notes
      FROM students
      ORDER BY lastname, firstname
    `;
    return students;
  } catch (error) {
    console.error('Error en getStudents:', error);
    throw error;
  }
}

export async function getStudentById(id: string) {
  const result = await sql`
    SELECT *
    FROM students
    WHERE id = ${id}
  `;
  return result[0] || null;
}

export async function getTeachers() {
  try {
    const teachers = await sql<Teacher[]>`
      SELECT *
      FROM teachers
      ORDER BY firstName ASC
    `;

    return teachers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all teachers.');
  }
}

export async function getCourses() {
  try {
    const courses = await sql<Course[]>`
      SELECT id, title, course_code, description, credits, duration, difficulty_level, teacher_email
      FROM courses
      ORDER BY title ASC
    `;
    return courses;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch courses.');
  }
}

export async function getCourseById(id: string) {
  const courses = await sql`SELECT * FROM courses WHERE id = ${id}`;
  return courses[0] || null; 
}

export async function getUsers() {
  try {
    const users = await sql<Users[]>`
      SELECT *
      FROM users
      ORDER BY first_name ASC
    `;

    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getUserByEmail(email: string) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
}

interface Enrollment {
  enrollment_id: string;
  enrollment_date: string;
  completion_status: string;
  notes: string | null;
  student_id: string;
  student_first_name: string;
  student_last_name: string;
  student_email: string;
  course_id: string;
  course_title: string;
  course_code: string;
  course_description: string;
  course_credits: number;
  course_duration: string;
  course_difficulty_level: string;
  teacher_first_name: string;
  teacher_last_name: string;
  teacher_email: string;
  teacher_subject: string;
}

export async function getEnrollments(): Promise<Enrollment[]> {
  try {
    const enrollments = await sql<Enrollment[]>`
       SELECT
          e.enrollment_id,
          e.enrollment_date,
          e.completion_status,
          e.notes,
          s.user_id AS student_id,
          s.first_name AS student_first_name,
          s.last_name AS student_last_name,
          s.email AS student_email,
          c.id AS course_id,
          c.title AS course_title,
          c.course_code,
          c.description AS course_description,
          c.credits AS course_credits,
          c.duration AS course_duration,
          c.difficulty_level AS course_difficulty_level,
          t.firstName AS teacher_first_name,
          t.lastName AS teacher_last_name,
          t.email AS teacher_email,
          t.subject AS teacher_subject
      FROM
          enrollments AS e
      JOIN
          users AS s ON e.student_id = s.user_id
      JOIN
          courses AS c ON e.course_id = c.id
      JOIN
          teachers AS t ON e.teacher_id = t.id;
    `;

    return enrollments;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all enrollments.');
  }
}

export async function getStudentsByTeacherId(teacherId: string) {
  try {
    const students = await sql`
      SELECT DISTINCT
        s.id,
        s.firstname,
        s.lastname,
        s.email,
        s.grade,
        s.dateofbirth,
        s.address,
        s.phonenumber,
        s.avatarurl,
        s.enrollmentdate,
        s.parentscontact,
        s.notes
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      WHERE e.teacher_id = ${teacherId}
      ORDER BY s.lastname, s.firstname
    `;
    return students;
  } catch (error) {
    console.error('Error en getStudentsByTeacherId:', error);
    throw error;
  }
}
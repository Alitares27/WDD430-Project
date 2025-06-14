import postgres from "postgres";
import { Student, Teacher, Course, Users } from "./definitions";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getStudents() {
  try {
    const students = await sql<Student[]>`
      SELECT *
      FROM students
      ORDER BY firstName ASC
    `;

    return students;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all students.');
  }
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

export async function getAttendance() {
  try {
    const attendance = await sql`
      SELECT *
      FROM attendance
      ORDER BY session_date DESC
    `;

    return attendance;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all attendance records.');
  }
}

export async function getAssignments() {
  try {
    const assignments = await sql`
      SELECT *
      FROM assignments
      ORDER BY created_at DESC
    `;

    return assignments;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all assignments.');
  }
}

export async function getGrades() {
  try {
    const grades = await sql`
      SELECT *
      FROM grades
      ORDER BY graded_at DESC
    `;

    return grades;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all grades.');
  }
}

export async function getEnrollments() {
  try {
    const enrollments = await sql`
       SELECT
          s.first_name AS student_first_name,
          s.last_name AS student_last_name,
          e.completion_status,
          c.title AS course_title,
          c.credits AS course_credits,
          t.firstName AS teacher_first_name,
          t.lastName AS teacher_last_name,
           e.enrollment_date
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
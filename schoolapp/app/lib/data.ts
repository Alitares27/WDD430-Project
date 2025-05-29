import postgres from "postgres";
import { Student, Teacher } from "./definitions";
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
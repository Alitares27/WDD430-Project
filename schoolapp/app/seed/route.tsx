
import postgres from 'postgres';
import { Students, Teachers } from '../lib/placeholder-data'; 


const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: {
    rejectUnauthorized: false, 
  },
});

async function seedStudents() {
  try {
    
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS students (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        grade VARCHAR(255) NOT NULL,
        dateOfBirth DATE, 
        address TEXT,
        phoneNumber VARCHAR(50),
        avatarUrl TEXT,
        enrollmentDate DATE,
        parentsContact TEXT,
        notes TEXT,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Created "students" table');

    const insertedStudents = await Promise.all(
      Students.map(async (student) => sql`
        INSERT INTO students (firstname, lastname, email, grade, dateofbirth, address, phonenumber, enrollmentdate, parentscontact, notes)
        VALUES (
          ${student.firstName},
          ${student.lastName},
          ${student.email},
          ${student.grade},
          ${student.dateOfBirth || null}, 
          ${student.address || null},
          ${student.phoneNumber || null},
          ${student.enrollmentDate || null},
          ${student.parentsContact || null},
          ${student.notes || null}
        )
        ON CONFLICT (email) DO NOTHING; 
      `),
    );

    console.log(`Seeded ${insertedStudents.length} students`);
    return insertedStudents;
  } catch (error) {
    console.error('Error seeding students:', error);
    throw error; 
  }
}

async function seedTeachers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
      CREATE TABLE IF NOT EXISTS teachers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        subject VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(50),
        address TEXT,
        hireDate DATE, 
        qualification VARCHAR(255),
        bio TEXT,
        avatarUrl TEXT,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Created "teachers" table');

    const insertedTeachers = await Promise.all(
      Teachers.map(async (teacher) => sql`
        INSERT INTO teachers (firstName, lastName, email, subject, phoneNumber, address, hireDate, qualification, bio, avatarUrl)
        VALUES (
          ${teacher.firstName},
          ${teacher.lastName},
          ${teacher.email},
          ${teacher.subject},
          ${teacher.phoneNumber || null},
          ${teacher.address || null},
          ${teacher.hireDate || null},
          ${teacher.qualification || null},
          ${teacher.bio || null},
          ${teacher.avatarUrl || null}
        )
        ON CONFLICT (email) DO NOTHING; 
      `),
    );

    console.log(`Seeded ${insertedTeachers.length} teachers`);
    return insertedTeachers;
  } catch (error) {
    console.error('Error seeding teachers:', error);
    throw error; 
  }
}

export async function GET() {
  try {
    
    await Promise.all([
      seedStudents(),
      seedTeachers(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Database seeding failed:', error);
    const errorMessage = (error instanceof Error && error.message) ? error.message : 'Unknown seeding error';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}


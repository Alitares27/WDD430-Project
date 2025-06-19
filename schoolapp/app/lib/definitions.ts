export type Student = {
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
  avatarurl?: string | null;
};

export type Teacher = {
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
    avatarurl?: string | null;
};

export type Course = {
    id: string;
    title: string;
    course_code: string;
    description: string;
    credits: number;
    duration: string;
    difficulty_level: string;
    teacher_email: string;
};

export type Users = {
    user_id: string;
    username: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    is_email_confirmed: boolean;
    last_login_at?: Date | null;
    created_at: Date;
    updated_at: Date;
};

export type attendance = {
    attendance_id: string;
    student_id: string;
    id: string;
    session_date: Date;
    status: 'present' | 'absent' | 'late' | 'excused';
    attended_at: Date;
    created_at: Date;
    updated_at: Date;
};

export type assignment = {
    assignment_id: string;
    id: string;
    assignment_name: string;
    description: string;
    due_date: Date;
    max_score: number;
    created_at: Date;
    updated_at: Date;
};

export type grades = {
    grade_id: string;
    student_id: string;
    id: string;
    score: number;
    grade_letter: string;
    assignment_id: string;
    feedback?: string | null;
    graded_by_user_id: string;
    graded_at: Date;
    created_at: Date;
    updated_at: Date;
};
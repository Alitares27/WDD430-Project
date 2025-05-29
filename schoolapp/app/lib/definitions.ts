export type Student = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: string;
    dateofbirth?: string | null;
    address?: string | null;
    phonenumber?: string | null;
    enrollmentdate?: string | null;
    parentscontact?: string | null;
    notes?: string | null;
    avatarurll?: string | null;
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
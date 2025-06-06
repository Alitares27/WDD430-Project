const Teachers = [
    {
        id: 't001',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        subject: 'Mathematics',
        phoneNumber: '555-1001',
        address: '123 Main St, City',
        hireDate: '2018-09-01',
        qualification: 'PhD in Mathematics',
        bio: 'Alice has over 10 years of experience teaching mathematics at various levels.',
        avatarUrl: '',
    },
    {
        id: 't002',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        subject: 'Physics',
        phoneNumber: '555-1002',
        address: '456 Oak Ave, City',
        hireDate: '2017-08-15',
        qualification: 'MSc in Physics',
        bio: 'Bob is passionate about making physics fun and accessible for all students.',
        avatarUrl: '',
    },
    {
        id: 't003',
        firstName: 'Carol',
        lastName: 'Williams',
        email: 'carol.w@example.com',
        subject: 'Literature',
        phoneNumber: '555-1003',
        address: '789 Pine Rd, City',
        hireDate: '2019-01-10',
        qualification: 'MA in Literature',
        bio: 'Carol specializes in modern literature and creative writing.',
        avatarUrl: '',
    },
    {
        id: 't004',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.b@example.com',
        subject: 'Chemistry',
        phoneNumber: '555-1004',
        address: '321 Maple St, City',
        hireDate: '2020-02-20',
        qualification: 'PhD in Chemistry',
        bio: 'David has published several papers in organic chemistry.',
        avatarUrl: '',
    },
    {
        id: 't005',
        firstName: 'Eve',
        lastName: 'Miller',
        email: 'eve.m@example.com',
        subject: 'History',
        phoneNumber: '555-1005',
        address: '654 Elm St, City',
        hireDate: '2016-05-05',
        qualification: 'MA in History',
        bio: 'Eve brings history to life with engaging stories and projects.',
        avatarUrl: '',
    },
    {
        id: 't006',
        firstName: 'Frank',
        lastName: 'Davis',
        email: 'frank.davis@example.com',
        subject: 'Biology',
        phoneNumber: '555-1006',
        address: '987 Cedar St, City',
        hireDate: '2021-03-15',
        qualification: 'PhD in Biology',
        bio: 'Frank is dedicated to fostering a love for science in his students.',
        avatarUrl: '',
    },
];

const Students = [
    {
        id: 's001',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        grade: '10mo Grado',
        dateOfBirth: '2006-03-15',
        address: 'Calle 123, Ciudad',
        phoneNumber: '555-1234',
        enrollmentDate: '2021-08-20',
        parentsContact: 'María Pérez, 555-5678',
        notes: 'Good student',
    },
    {
        id: 's002',
        firstName: 'Ana',
        lastName: 'Gómez',
        email: 'ana.gomez@example.com',
        grade: '9no Grado',
        dateOfBirth: '2007-07-22',
        address: 'Avenida 45, Ciudad',
        phoneNumber: '555-2345',
        enrollmentDate: '2022-08-20',
        parentsContact: 'Carlos Gómez, 555-6789',
        notes: '',
    },
    {
        id: 's003',
        firstName: 'Carlos',
        lastName: 'Díaz',
        email: 'carlos.diaz@example.com',
        grade: '10mo Grado',
        dateOfBirth: '2006-11-10',
        address: 'Calle 56, Ciudad',
        phoneNumber: '555-3456',
        enrollmentDate: '2021-08-20',
        parentsContact: 'Laura Díaz, 555-7890',
        notes: '',
    },
    {
        id: 's004',
        firstName: 'María',
        lastName: 'López',
        email: 'maria.lopez@example.com',
        grade: '8vo Grado',
        dateOfBirth: '2008-02-05',
        address: 'Calle 78, Ciudad',
        phoneNumber: '555-4567',
        enrollmentDate: '2023-08-20',
        parentsContact: 'Pedro López, 555-8901',
        notes: '',
    },
    {
        id: 's005',
        firstName: 'Pedro',
        lastName: 'Sánchez',
        email: 'pedro.sanchez@example.com',
        grade: '11mo Grado',
        dateOfBirth: '2005-09-30',
        address: 'Avenida 90, Ciudad',
        phoneNumber: '555-5678',
        enrollmentDate: '2020-08-20',
        parentsContact: 'Ana Sánchez, 555-9012',
        notes: '',
    },
    {
        id: 's006',
        firstName: 'Laura',
        lastName: 'Fernández',
        email: 'laura.fernandez@example.com',
        grade: '9no Grado',
        dateOfBirth: '2007-05-18',
        address: 'Calle 12, Ciudad',
        phoneNumber: '555-6789',
        enrollmentDate: '2022-08-20',
        parentsContact: 'Miguel Fernández, 555-0123',
        notes: '',
    },
    {
        id: 's007',
        firstName: 'Miguel',
        lastName: 'Torres',
        email: 'miguel.torres@example.com',
        grade: '12mo Grado',
        dateOfBirth: '2004-12-12',
        address: 'Avenida 34, Ciudad',
        phoneNumber: '555-7890',
        enrollmentDate: '2019-08-20',
        parentsContact: 'Lucía Torres, 555-1230',
        notes: '',
    },
    {
        id: 's008',
        firstName: 'Sofía',
        lastName: 'Ramírez',
        email: 'sofia.ramirez@example.com',
        grade: '10mo Grado',
        dateOfBirth: '2006-08-25',
        address: 'Calle 56, Ciudad',
        phoneNumber: '555-8901',
        enrollmentDate: '2021-08-20',
        parentsContact: 'Javier Ramírez, 555-2340',
        notes: '',
    },
    {
        id: 's009',
        firstName: 'Diego',
        lastName: 'Morales',
        email: 'diego.morales@example.com',
        grade: '11mo Grado',
        dateOfBirth: '2005-04-17',
        address: 'Avenida 78, Ciudad',
        phoneNumber: '555-9012',
        enrollmentDate: '2020-08-20',
        parentsContact: 'Isabel Morales, 555-3450',
        notes: '',
    },
    {
        id: 's010',
        firstName: 'Valentina',
        lastName: 'Ruiz',
        email: 'valentina.ruiz@example.com',
        grade: '8vo Grado',
        dateOfBirth: '2008-10-03',
        address: 'Calle 90, Ciudad',
        phoneNumber: '555-0123',
        enrollmentDate: '2023-08-20',
        parentsContact: 'Andrés Ruiz, 555-4560',
        notes: '',
    },
    {
        id: 's011',
        firstName: 'Andrés',
        lastName: 'Herrera',
        email: 'andres.herrera@example.com',
        grade: '9no Grado',
        dateOfBirth: '2007-01-29',
        address: 'Avenida 12, Ciudad',
        phoneNumber: '555-1230',
        enrollmentDate: '2022-08-20',
        parentsContact: 'Camila Herrera, 555-5670',
        notes: '',
    },
    {
        id: 's012',
        firstName: 'Camila',
        lastName: 'Castro',
        email: 'camila.castro@example.com',
        grade: '10mo Grado',
        dateOfBirth: '2006-06-14',
        address: 'Calle 34, Ciudad',
        phoneNumber: '555-2340',
        enrollmentDate: '2021-08-20',
        parentsContact: 'Jorge Castro, 555-6780',
        notes: '',
    },
    {
        id: 's013',
        firstName: 'Javier',
        lastName: 'Jiménez',
        email: 'javier.jimenez@example.com',
        grade: '12mo Grado',
        dateOfBirth: '2004-03-21',
        address: 'Avenida 56, Ciudad',
        phoneNumber: '555-3450',
        enrollmentDate: '2019-08-20',
        parentsContact: 'Paula Jiménez, 555-7890',
        notes: '',
    },
    {
        id: 's014',
        firstName: 'Isabella',
        lastName: 'Moreno',
        email: 'isabella.moreno@example.com',
        grade: '11mo Grado',
        dateOfBirth: '2005-08-09',
        address: 'Calle 78, Ciudad',
        phoneNumber: '555-4560',
        enrollmentDate: '2020-08-20',
        parentsContact: 'Ricardo Moreno, 555-8900',
        notes: '',
    },
    {
        id: 's015',
        firstName: 'Sebastián',
        lastName: 'Vargas',
        email: 'sebastian.vargas@example.com',
        grade: '8vo Grado',
        dateOfBirth: '2008-11-27',
        address: 'Avenida 90, Ciudad',
        phoneNumber: '555-5670',
        enrollmentDate: '2023-08-20',
        parentsContact: 'Verónica Vargas, 555-9010',
        notes: '',
    },
    {
        id: 's016',
        firstName: 'Lucía',
        lastName: 'Castillo',
        email: 'lucia.castillo@example.com',
        grade: '9no Grado',
        dateOfBirth: '2007-09-13',
        address: 'Calle 12, Ciudad',
        phoneNumber: '555-6780',
        enrollmentDate: '2022-08-20',
        parentsContact: 'Fernando Castillo, 555-0120',
        notes: '',
    },
];

  export { Teachers, Students };
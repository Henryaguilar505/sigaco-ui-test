import { object, string, number, date, InferOutput, array, union, null as vNull } from 'valibot'

//Enrollment Schema
export const DraftEnrollmentSchema = object({
    name: string(),
    identity_card: string(),
    phone: string(),
    birthplace: string(),
    birth_date: date(),
    gender: string(),
    nationality: string(),
    academic_level: string(),
    school_name: string(),
    address: string(),
    profession: string(),
    occupation: string(),
    household_members: number(),
    emergency_contact_name: string(),
    emergency_contact_phone: string(),
    emergency_contact_address: string(),
    enrollment_date: date(),
    course_id: number()
})

export const EnrollmentSchema = object(
    {
        course_id: number(),
        enrollment_date: string(),
        enrollment_number: string(),
        id: number(),
        status: string(),
        student_id: number()
    }
)

export const EnrollmentsSchema = array(EnrollmentSchema)
export type Enrollment = InferOutput<typeof EnrollmentSchema>
export type DraftEnrollment = InferOutput<typeof DraftEnrollmentSchema>


export const EnrollmentUpdate = object({
    status: string(),
    enrollment_date: string(),
    course_id: number()
})


//Student Schemas
export const StudentSchema = object(
    {
        academic_level: string(),
        address: string(),
        birth_date: string(),
        birthplace: string(),
        emergency_contact_address: union([string(), vNull()]),
        emergency_contact_name: string(),
        emergency_contact_phone: string(),
        gender: string(),
        household_members: union([number(), vNull()]),
        id: number(),
        identity_card: union([string(), vNull()]),
        name: string(),
        nationality: string(),
        occupation: union([string(), vNull()]),
        phone: string(),
        profession: union([string(), vNull()]),
        school_name: string()
    }
)

export const StudentWithEnrollmentSchema = object({
    academic_level: string(),
    address: string(),
    birth_date: string(),
    birthplace: string(),
    emergency_contact_address: union([string(), vNull()]),
    emergency_contact_name: string(),
    emergency_contact_phone: string(),
    gender: string(),
    household_members: union([number(), vNull()]),
    id: number(),
    identity_card: union([string(), vNull()]),
    name: string(),
    nationality: string(),
    occupation: union([string(), vNull()]),
    phone: string(),
    profession: union([string(), vNull()]),
    school_name: string(),
    enrollments: EnrollmentsSchema
})

export const EnrollmentWithStudentSchema = object(
    {
        course_id: number(),
        enrollment_date: string(),
        enrollment_number: string(),
        id: number(),
        status: string(),
        student: StudentSchema
    }
)
export const EnrollmentsWithStudentSchema = array(EnrollmentWithStudentSchema)
export type EnrollmentWithStudent = InferOutput<typeof EnrollmentWithStudentSchema>

export const StudentsSchema = array(StudentSchema)
export type Student = InferOutput<typeof StudentSchema>
export type StudentWithEnrollment = InferOutput<typeof StudentWithEnrollmentSchema>

//Teacher Schema

export const TeacherSchema = object({
    address: string(),
    email: string(),
    id: number(),
    name: string(),
    phone: string(),
    status: string()
})

export const DraftTeacherSchema = object({
    address: string(),
    email: string(),
    name: string(),
    phone: string()
})

export const TeachersSchema = array(TeacherSchema)
export type Teacher = InferOutput<typeof TeacherSchema>

export const TeacherUpdateSchema = object({
    address: string(),
    email: string(),
    name: string(),
    phone: string(),
    status: string()
})
export type TeacherUpdate = InferOutput<typeof TeacherUpdateSchema>

//Shifts Schema
export const ShiftSchema = object({
    days: string(),
    end_time: string(),
    id: number(),
    start_time: string()
})

export const ShiftsSchema = array(ShiftSchema)
export type Shift = InferOutput<typeof ShiftSchema>

//Course Schemas

export const DraftCourseSchema = object({
    course_name_id: number(),
    duration: number(),
    start_date: string(),
    user_id: number(),
    profesor_id: number(),
    shift_id: number(),
    classroom_id: number()
})

export const CourseNameSchema = object({
    id: number(),
    name: string()
})

export const CourseNamesSchema = array(CourseNameSchema)
export type CourseName = InferOutput<typeof CourseNameSchema>

//Classroom Schema
export const ClassroomSchema = object({
    capacity: number(),
    id: number(),
    number: number()
})

export const ClassroomsSchema = array(ClassroomSchema)
export type Classroom = InferOutput<typeof ClassroomSchema>

//Courses Schema

export const CourseSchema = object({
    classroom: ClassroomSchema,
    course_name: CourseNameSchema,
    duration: number(),
    id: number(),
    profesor: TeacherSchema,
    shift: ShiftSchema,
    start_date: string(),
    user_id: number()
})

export const CoursesSchema = array(CourseSchema)
export type Course = InferOutput<typeof CourseSchema>

export const CourseWithStudentSchema = object({
    classroom: ClassroomSchema,
    course_name: CourseNameSchema,
    duration: number(),
    id: number(),
    profesor: TeacherSchema,
    shift: ShiftSchema,
    start_date: string(),
    students: StudentsSchema,
    user_id: number()
})

export type CourseWithStudent = InferOutput<typeof CourseWithStudentSchema>


//Schedules Schema
//Este es para un POST
// export const DraftSchedulesSchema = object({
//     days: string(),
//     end_time: string(),
//     id: number(),
//     start_time: string()
// })

//GET
export const ScheduleSchema = object({
    days: string(),
    end_time: string(),
    id: number(),
    start_time: string()
})

export const SchedulesSchema = array(ScheduleSchema)
export type Schedule = InferOutput<typeof ScheduleSchema>


export const DraftStudentSchema = object(
    {
        name: string(),
        identity_card: string(),
        phone: string(),
        birthplace: string(),
        birth_date: date(),
        gender: string(),
        nationality: string(),
        academic_level: string(),
        school_name: string(),
        address: string(),
        profession: string(),
        occupation: string(),
        household_members: number(),
        emergency_contact_name: string(),
        emergency_contact_phone: string(),
        emergency_contact_address: string(),
        enrollment_date: date(),
        course_id: number()
    }
)

export type StudentForm = {
    academic_level: string,
    address: string,
    birth_date: string,
    birthplace: string,
    emergency_contact_address: string,
    emergency_contact_name: string,
    emergency_contact_phone: string,
    gender: string,
    household_members: number,
    id: number,
    identity_card: string,
    name: string,
    nationality: string,
    occupation: string,
    phone: string,
    profession: string,
    school_name: string
}

//ChartData
export const ChartData = object({
    label: string(),
    value: number()
})

export const ChartDatas = array(ChartData)
export type ChartData = InferOutput<typeof ChartData>

//Asistencia
export const Attendance = object({
    id: number(),
    date: string(),
    status: string()
})
const Attendances = array(Attendance)
export type Attendance = InferOutput<typeof Attendance>

export const AttendanceOfCourseSchema = object({
    enrollment_id: number(),
    student_name: string(),
    attendances: union([Attendances, vNull()]),
})

export type AttendanceOfCourse = InferOutput<typeof AttendanceOfCourseSchema>

export const AttendancesOfCourse = array(AttendanceOfCourseSchema)

export const AttendanceWithEnrollmentIdSchema = object({
    id: number(),
    date: string(),
    status: string(),
    enrollment_id: number()
})

export type AttendanceWithEnrollmentId = InferOutput<typeof AttendanceWithEnrollmentIdSchema>

export const AttendanceUpdateSchema = object({
    date: string(),
    status: string()
})

export interface AttendanceOfCourseI {
    enrollment_id: number,
    student_name: string,
    attendances: typeof Attendances
}

//Ratings
const DraftGradesSchema = object({
    grade: number(),
    id: number()
})
export type Grade = InferOutput<typeof DraftGradesSchema>

export const GradeSchema = object({
    grade: number()
})


export const RatingSchema = object({
    enrollment_id: number(),
    student_name: string(),
    grades: union([array(DraftGradesSchema), vNull()])
}
)

export const RatingsSchema = array(RatingSchema)
export type Rating = InferOutput<typeof RatingSchema>

export const DraftRatingSchema = object({
    enrollment_id: number(),
    grade: number()
})

export type DraftRating = InferOutput<typeof DraftRatingSchema>

export const DraftUserDataSchema = object({
    name: string(),
    email: string(),
    password: string(),
    password_confirmation: string(),
    phone: string()
})

export const UserDataSchema = object({
    email: string(),
    id: number(),
    name: string(),
    phone: string(),
    rol_id: number()
})

export const UsersDataSchema = array(UserDataSchema)
export type UserData = InferOutput<typeof UserDataSchema>

export const UserUpdateDataSchema = object({
    email: string(),
    name: string(),
    phone: string(),
    password: union([string(), vNull()]),
    password_confirmation: union([string(), vNull()]),
    status: string()
})

export type UserUpdate = InferOutput<typeof UserDataSchema>


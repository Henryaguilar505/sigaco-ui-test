import { createBrowserRouter } from 'react-router-dom'
import Login from './views/Login'
import ErrorPage from './views/ErrorPage'
import Layout from './layouts/Layout'
import EditStudent, { loader as editStudentLoader, action as editStudentAction } from './views/EditStudent'
import Enrollments, { loader as enrollmentsLoader } from './views/Enrollments'
import NewEnrollment, { action as newEnrollmentAction } from './views/NewEnrollment'
import { loader as schedulesLoader } from './views/NewEnrollment'
import EditEnrollment, { loader as editEnrollmentLoader, action as editEnrollmentAction } from './views/EditEnrollment'
import ShowStudent, { loader as showStudentLoader } from './views/ShowStudent'
import Dashboard, { loader as dashboardLoader } from './views/Dashboard'
import Courses, { loader as courseLoader } from './views/Courses'
import ShowCourse, { loader as showCourseLoader } from './views/ShowCourse'
import NewCourse, { loader as newCourseLoader, action as newCourseAction } from './views/NewCourse'
import AttendanceComponent from './views/AttendanceComponent'
import NewAttendance from './views/NewAttendance'
import EditAttendance, { loader as editAttendanceLoader, action as editAttendaceAction } from './views/EditAttendance'
import Ratings, { action as ratingsAction, loader as ratingsLoader } from './views/Ratings'
import NewRating, { loader as newRatingLoader } from './views/NewRating'
import Teachers, { loader as teacherLoader } from './views/Teachers'
import EditTeacher, { loader as editTeacherLoader, action as editTeacherAction } from './views/EditTeacher'
import ShowTeacher, { loader as showTeacherLoader } from './views/ShowTeacher'
import ShowAttendances from './views/ShowAttendances'

import ProtectedRoute from './components/ProtectedRoute'
import Logout from './components/Logout'
import UserProfile, { loader as userProfileLoader } from './views/UserProfile'
import NewTeacher, { action as newTeacherAction } from './views/NewTeacher'
import Users, { loader as usersLoader } from './views/Users'
import NewUser, { action as newUserAction } from './views/NewUser'
import EditUser, { loader as editUserLoader, action as editUserAction} from './views/EditUser'



export const router = createBrowserRouter([
    //LoginPage
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                        loader: dashboardLoader
                    },
                    //matricula
                    {
                        path: '/matricula',
                        children: [
                            {
                                index: true,
                                element: <Enrollments />,
                                loader: enrollmentsLoader
                            },
                            {
                                path: 'registro/nuevo',
                                element: <NewEnrollment />,
                                action: newEnrollmentAction,
                                loader: schedulesLoader
                            },
                            {
                                path: 'registro/:id/editar', //ROA Pattern - Resource-oriented Desing
                                element: <EditEnrollment />,
                            },
                            {
                                path: 'estudiante/:id',
                                element: <ShowStudent />,
                                loader: showStudentLoader
                            },
                            {
                                path: 'registro/:id/editar',
                                element: <EditEnrollment />
                            },
                            {
                                path: 'estudiante/:id/editar',
                                element: <EditStudent />
                            }
                        ]
                    },

                    //Asistencia
                    {
                        path: '/asistencia',
                        children: [
                            {
                                index: true,
                                element: <AttendanceComponent />
                            },
                            {
                                path: 'nuevo',
                                element: <NewAttendance />
                            },
                            {
                                path: 'mostrar',
                                element: <ShowAttendances />
                            },
                            {
                                path: 'modificar/:id',
                                element: <EditAttendance />,
                                loader: editAttendanceLoader,
                                action: editAttendaceAction
                            }
                        ]
                    },

                    //Cursos
                    {
                        path: '/cursos',
                        children: [
                            {
                                index: true,
                                element: <Courses />,
                                loader: courseLoader
                            },
                            {
                                path: 'mostrar/:id',
                                element: <ShowCourse />,
                                loader: showCourseLoader
                            },
                            {
                                path: 'nuevo',
                                element: <NewCourse />,
                                loader: newCourseLoader,
                                action: newCourseAction
                            }
                        ]
                    },

                    //Calificaciones
                    {
                        path: '/calificaciones',
                        children: [
                            {
                                index: true,
                                element: <Ratings />,
                                loader: ratingsLoader
                            },
                            {
                                path: 'nueva',
                                element: <NewRating />,
                                loader: newRatingLoader
                            },
                            {
                                path: 'eliminar/:id',
                                action: ratingsAction
                            }
                        ]
                    },

                    //Maestros
                    {
                        path: '/maestros',
                        children: [
                            {
                                index: true,
                                element: <Teachers />,
                                loader: teacherLoader
                            },
                            {
                                path: 'mostrar/:id',
                                element: <ShowTeacher />,
                                loader: showTeacherLoader
                            },
                            {
                                path: 'modificar/:id',
                                element: <EditTeacher />,
                                loader: editTeacherLoader,
                                action: editTeacherAction
                            },
                            {
                                path: 'nuevo',
                                element: <NewTeacher />,
                                action: newTeacherAction
                            }
                        ]
                    },

                    //Estudiantes
                    {
                        path: '/estudiante',
                        children:
                            [
                                {
                                    path: 'mostrar/:id',
                                    element: <ShowStudent />,
                                    loader: showStudentLoader
                                },
                                {
                                    path: 'mostrar/:id/editar', //ROA Pattern - Resource-oriented Desing
                                    element: <EditStudent />,
                                    loader: editStudentLoader,
                                    action: editStudentAction
                                },
                            ]
                    },

                    //Perfil
                    {
                        path: '/perfil',
                        children: [
                            {
                                index: true,
                                element: <UserProfile />,
                                loader: userProfileLoader
                            }
                        ]
                    },

                    //Registro
                    {
                        path: '/registro',
                        children:
                            [
                                {
                                    path: 'editar/:id',
                                    element: <EditEnrollment />,
                                    loader: editEnrollmentLoader,
                                    action: editEnrollmentAction

                                }
                            ]
                    },

                    //usuarios
                    {
                        path: '/usuarios',
                        children:
                            [
                                {
                                    index: true,
                                    element: <Users />,
                                    loader: usersLoader
                                },

                                {
                                    path: 'nuevo',
                                    element: <NewUser />,
                                    action: newUserAction
                                },

                                {
                                    path: 'modificar/:id',
                                    element: <EditUser />,
                                    loader: editUserLoader,
                                    action: editUserAction
                                }
                            ]
                    },

                    //Logout
                    {
                        path: '/logout',
                        element: <Logout />
                    }
                ]
            }
        ]
    },

    // {
    //     path: '/matricula',
    //     element: <Layout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <Enrollments />,
    //             loader: enrollmentsLoader
    //         },
    //         {
    //             path: 'registro/nuevo',
    //             element: <NewEnrollment />,
    //             action: newEnrollmentAction,
    //             loader: schedulesLoader
    //         },
    //         {
    //             path: 'registro/:id/editar', //ROA Pattern - Resource-oriented Desing
    //             element: <EditEnrollment />,
    //         },
    //         {
    //             path: 'estudiante/:id',
    //             element: <ShowStudent />,
    //             loader: showStudentLoader
    //         },
    //         {
    //             path: 'registro/:id/editar',
    //             element: <EditEnrollment />
    //         },
    //         {
    //             path: 'estudiante/:id/editar',
    //             element: <EditStudent />
    //         }
    //     ]
    // },
    // {
    //     path: '/estudiante',
    //     children:
    //         [
    //             {
    //                 path: 'mostrar/:id',
    //                 element: <ShowStudent />,
    //                 loader: showStudentLoader
    //             },
    //             {
    //                 path: 'mostrar/:id/editar', //ROA Pattern - Resource-oriented Desing
    //                 element: <EditStudent />,
    //                 loader: editStudentLoader,
    //                 action: editStudentAction
    //             },
    //         ]
    // },
    // {
    //     path: '/registro',
    //     children:
    //         [
    //             {
    //                 path: 'editar/:id',
    //                 element: <EditEnrollment />,
    //                 loader: editEnrollmentLoader,
    //                 action: editEnrollmentAction

    //             }
    //         ]
    // },
    // {
    //     path: '/asistencia',
    //     element: <Layout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <AttendanceComponent />
    //         },
    //         {
    //             path: 'nuevo',
    //             element: <NewAttendance />
    //         },
    //         {
    //             path: 'mostrar',
    //             element: <ShowAttendances />
    //         },
    //         {
    //             path: 'modificar/:id',
    //             element: <EditAttendance />,
    //             loader: editAttendanceLoader,
    //             action: editAttendaceAction
    //         }
    //     ]
    // },
    // {
    //     path: '/cursos',
    //     element: <Layout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <Courses />,
    //             loader: courseLoader
    //         },
    //         {
    //             path: 'mostrar/:id',
    //             element: <ShowCourse />,
    //             loader: showCourseLoader
    //         },
    //         {
    //             path: 'nuevo',
    //             element: <NewCourse />,
    //             loader: newCourseLoader,
    //             action: newCourseAction
    //         }
    //     ]
    // },
    // {
    //     path: '/calificaciones',
    //     element: <Layout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <Ratings />,
    //             loader: ratingsLoader
    //         },
    //         {
    //             path: 'nueva',
    //             element: <NewRating />,
    //             loader: newRatingLoader
    //         },
    //         {
    //             path: 'eliminar/:id',
    //             action: ratingsAction
    //         }
    //     ]
    // },
    // {
    //     path: '/maestros',
    //     element: <Layout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <Teachers />,
    //             loader: teacherLoader
    //         },
    //         {
    //             path: 'mostrar/:id',
    //             element: <ShowTeacher />,
    //             loader: showTeacherLoader
    //         },
    //         {
    //             path: 'modificar/:id',
    //             element: <EditTeacher />,
    //             loader: editTeacherLoader,
    //             action: editTeacherAction
    //         }
    //     ]
    // },
    // {
    //     path: '/perfil',
    //     element: <Layout />,
    //     children: [
    //         {
    //             index: true,
    //             element: <UserProfile />,
    //             loader: userProfileLoader
    //         }
    //     ]
    // },

    // {
    //     path: '/logout',
    //     element: <Logout />
    // }
])
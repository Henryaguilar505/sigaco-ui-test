import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { addRating } from '../services/ratingsService';
import { Rating } from '../types';
import { toast, ToastContainer } from 'react-toastify';

type RatingModalProps = {
    rating: Rating;
    onAdd: (newRating: Rating) => void
};

export default function RatingModal({ rating, onAdd }: RatingModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const enrollment_id = parseInt(formData.get('enrollment_id') as string);
        const grade = parseFloat(formData.get('grade') as string);

        if (isNaN(grade) || grade < 0 || grade > 100) {
            toast.warn('La calificación debe ser un número entre 0 y 100');
            return;
        }

        try {
            await addRating(enrollment_id, grade);

            const newRating: Rating = {
                ...rating,
                grades: [{ id: enrollment_id, grade }]
            }

            onAdd(newRating)
            closeModal();

            toast.success('Se registro la calificación de forma correcta');
        } catch (error) {
            toast.error('Error al conectar con el servidor');
        }
    };

    return (
        <>
            <ToastContainer />
            <button onClick={openModal}>Ingresar calificación</button>

            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-slate-100 p-6 rounded-lg shadow-lg w-11/12 max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-lg text-slate-600">
                            Ventana emergente para{' '}
                            <span className="font-bold text-yellow-600">Marcar</span> la calificación
                        </h1>
                        <h2 className="text-sm text-slate-600">Presione fuera de la ventana para cerrar</h2>
                        <Form
                            method="POST"
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                name="enrollment_id"
                                defaultValue={rating.enrollment_id}
                                className="text-slate-1 bg-slate-100 pointer-events-none select-none"
                                readOnly
                                tabIndex={-1}
                            />

                            <div className="flex">
                                <label htmlFor="grade" className="text-black mr-4 content-center">
                                    Calificación
                                </label>
                                <input
                                    type="number"
                                    name="grade"
                                    placeholder="De 0 a 100"
                                    defaultValue={rating.grades === null ? 0 : rating.grades[0].grade}
                                    className="text-black font-bold border border-slate-600 rounded-xl w-1/2 p-2"
                                />
                            </div>

                            <input
                                type="submit"
                                className="mt-5 w-full bg-yellow-600 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                                value="Agregar calificación"
                            />
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
}
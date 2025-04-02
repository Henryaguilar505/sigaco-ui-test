import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { updateRating } from '../services/ratingsService';
import { Rating } from '../types';
import { toast, ToastContainer } from 'react-toastify';

type UpdateRatingModalProps = {
    rating: Rating;
    onUpdate: (updatedRating: Rating) => void;
};

export default function UpdateRatingModal({ rating, onUpdate }: UpdateRatingModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const grade_id = parseInt(formData.get('grade_id') as string);
        const grade = parseFloat(formData.get('grade') as string);

        if (isNaN(grade) || grade < 0 || grade > 100) {
            toast.warn('La calificación debe ser un número entre 0 y 100');
            return;
        }

        try {
            if (!rating.grades || rating.grades.length === 0) {
                throw new Error("No se encontró la calificación")

            }
            await updateRating(grade_id, grade);

            const updatedRating = {
                ...rating,
                grades: [{ ...rating.grades[0], grade }],
            };

            onUpdate(updatedRating);
            closeModal();

            toast.success('Calificación actualizada')
        } catch (error) {
            toast.error('Error al conectar con el servidor');
        }
    };

    return (
        <>
            <button onClick={openModal}>Modificar</button>

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
                            <span className="font-bold text-green-700">actualizar</span> la calificación
                        </h1>
                        <h2 className="text-sm text-slate-600">Presione fuera de la ventana para cerrar</h2>
                        <Form
                            method="POST"
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >

                            {rating.grades && rating.grades.length > 0 && (
                                <>
                                    <input
                                        type="text"
                                        name="grade_id"
                                        defaultValue={rating.grades[0].id}
                                        className="text-slate-100 bg-slate-100 pointer-events-none select-none"
                                        readOnly
                                        tabIndex={-1}
                                    />

                                    <div className="flex content-center">
                                        <label htmlFor="grade" className="text-black mr-4 content-center">
                                            Calificación
                                        </label>
                                        <input
                                            type="number"
                                            name="grade"
                                            placeholder="De 0 a 100"
                                            defaultValue={rating.grades[0].grade}
                                            className="text-black font-bold border border-slate-600 rounded-xl w-1/2 p-2"
                                        />
                                    </div>
                                </>
                            )}

                            <input
                                type="submit"
                                className="mt-5 w-full bg-green-700 hover:bg-green-900 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
                                value="Actualizar calificación"
                            />
                        </Form>
                    </div>
                </div>
            )}

            <ToastContainer
                autoClose={3000}
            />
        </>
    );
}
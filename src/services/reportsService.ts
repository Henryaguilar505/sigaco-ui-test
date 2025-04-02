import axiosInstance from '../utils';



export const exportReport = async (course_id: string): Promise<Blob> => {
    
    try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/students/export/${course_id}`, {
            responseType: 'blob',
        })
        return response.data;
    } catch (error) {
        console.error('Error exporting report:', error);
        throw error;
    }
};
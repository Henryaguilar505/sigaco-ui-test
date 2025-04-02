import { PropsWithChildren } from 'react'

export default function ErrorMessage({ children }: PropsWithChildren) {
    return (
        <div className='text-center my-4 bg-red-400 rounded text-red-800 font-bold p-3 uppercase'>
            {children}
        </div>
    )
}

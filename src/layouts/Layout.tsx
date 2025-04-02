import { Outlet } from "react-router-dom"
import { MenuHamburguesa } from "../components/MenuHamburguesa"

export default function Layout() {
    return (
        <>
            <div className=" flex flex-row sm:justify-center w-full h-12 items-center backdrop-blur-sm fixed top-0 z-50">
                <MenuHamburguesa />
                <p className=" uppercase font-bold text-xl ml-4 justify-center">Academia de computacion <span className=" text-blue-800 font-serif">adec</span>-Ocotal</p>
                
            </div>
            <Outlet />
        </>
    )
}

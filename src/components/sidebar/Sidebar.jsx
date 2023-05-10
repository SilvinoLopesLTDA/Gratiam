import './Sidebar.scss'
import { GrGatsbyjs } from "react-icons/gr"
import { HiMenuAlt3 } from 'react-icons/hi'
import menu from '../../data/sidebar'
import SidebarItem from './SidebarItem'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true)
    const toggle = () => setIsOpen(!isOpen)

    useEffect(() => {
        if (window.innerWidth < 600) {
          setIsOpen(false);
        }
      }, []);
      

    const navigate = useNavigate()

    const goHome = () => {
        navigate("/")
    }

  return (
    <div className='layout'>
        <div className="sidebar" style={{width: isOpen ? "230px" : "60px"}}>
            <div className='top_section'>
                <div className="logo" style={{display: isOpen ? "block" : "none"}}>
                    <GrGatsbyjs size={35} style={{cursor: 'pointer'}} onClick={goHome}/>
                </div>
                <div className="bars isClosed" style={{marginLeft: isOpen ? "100px" : "0px"}}>
                    <HiMenuAlt3 onClick={toggle}/>
                </div>
                <div className="logo s-devices">
                    <GrGatsbyjs size={35} style={{cursor: 'pointer'}} onClick={goHome}/>
                </div>
            </div>
            {menu.map((item, index) => {
                return <SidebarItem key={index} item={item} isOpen={isOpen} />
            })}
        </div>
        <main style={{paddingLeft: isOpen ? "230px" : "60px", transition: "all .5s"}}>
            {children}
        </main>
    </div>
  )
}

export default Sidebar
import { NavLink, Outlet } from "react-router-dom"
import { StyledHeader, StyledMainBody, StyledNav } from "./layout.styled"

export const Layout = () => {
  
  return (
    <StyledMainBody>
        <StyledHeader>
            <StyledNav>
                <NavLink to={"/"} className={({ isActive }) =>
     isActive ? "active" : ""
  }>Home</NavLink>
                <NavLink to={"/history"} className={({ isActive}) =>
     isActive ? "active" : ""
  }>History</NavLink>
            </StyledNav>
        </StyledHeader>
        <Outlet />
    </StyledMainBody>
  )
}

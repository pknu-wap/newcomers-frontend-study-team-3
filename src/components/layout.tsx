import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 20px;
  padding: 20px;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;  
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 24px;
    fill: white;
  }
    &.log-out {
    border-color: red;
    svg {
      fill: red;  

`;





export default function Layout() {
  const onLogout = async () => {
    const ok = confirm("Are you sure you want to log out?")
    if(ok){
      await auth.signOut()
    }
  }
  return ( 
    <Wrapper>
      <Menu>
        <Link to="/logout">
          <MenuItem>
            <svg dataSlot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM9.293 6.707a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1-1.414 1.414L11 7.414V13a1 1 0 1 1-2 0V7.414L6.707 9.707Z" />
</svg>
          </MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem>
            <svg dataSlot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
  </svg>
          </MenuItem>
        </Link>
        
        <MenuItem className="log-out" onClick={onLogout}>
        <svg dataSlot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" />
</svg>
        </MenuItem>
      
      </Menu>
      <Outlet />
      
    </Wrapper>
  );
}
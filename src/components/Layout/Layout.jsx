import React from "react";
import Header from "./Header";
import Navbar_m from "./Navbar_mentor";
import Navbar_s from "./Navbar_student";
import Navbar_admin from "./Navbar_admin";
import Footer from "./Footer";

export default function Layout({ children, navbar, userType }) {
  return (
    <>
      <Header />
      {navbar && userType !== 'none' && (
        userType === 'mentor' ? (
          <Navbar_m />
        ) : userType === 'student' ? (
          <Navbar_s />
        ) : (
          <Navbar_admin />
        )
      )}
      {children}
      <Footer />
    </>
  );
}
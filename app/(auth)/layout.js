import "../globals.css";

export const metadata = {
  title: "Auth | Indramed",
  description: "",
};

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      {children}
    </div>
  )
}
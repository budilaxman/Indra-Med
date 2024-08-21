import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="font-poppins">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}


import './globals.css'; // Your global CSS and Tailwind styles
import Navbar from './components/navbar';


export const metadata = {
  title: 'DroneYards',
  description: 'Your one-stop shop for drone parts and accessories',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
      
        <Navbar />
        <main className="min-h-screen">{children}</main>
        
        
      
      </body>
    </html>
  );
};

export default RootLayout;
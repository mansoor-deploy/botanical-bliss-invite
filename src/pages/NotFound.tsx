
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Flower2 } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-floral-softGray/30 bg-texture p-4">
      <div className="text-center glass-card rounded-lg p-12 max-w-lg animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-floral-blush/50 rounded-full">
            <Flower2 className="w-12 h-12 text-floral-gold" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 font-playfair text-floral-gold">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          We couldn't find the page you were looking for. The invitation might have been moved or removed.
        </p>
        <a 
          href="/" 
          className="floral-button inline-block"
        >
          Return to Invitation
        </a>
      </div>
    </div>
  );
};

export default NotFound;

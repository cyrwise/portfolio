import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5dc] text-center py-4 border-t border-gray-300 mt-auto">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-2">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            <i className="fab fa-twitter text-lg sm:text-xl"></i>
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            <i className="fab fa-github text-lg sm:text-xl"></i>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            <i className="fab fa-linkedin text-lg sm:text-xl"></i>
          </a>
          <a 
            href="/rss" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            <i className="fas fa-rss text-lg sm:text-xl"></i>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            <i className="fab fa-instagram text-lg sm:text-xl"></i>
          </a>
        </div>
        
        {/* Copyright Text */}
        <p className="text-xs sm:text-sm text-gray-600">
          Copyright &copy;2024 | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

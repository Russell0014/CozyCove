import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container mx-auto text-left min-h-screen flex items-center justify-center">
      <div className="m-10">
        <h1 className="text-3xl mb-4">
          <span className="font-bold text-red-500">404 - Page Not Found</span>
        </h1>
        <p className="text-xl mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
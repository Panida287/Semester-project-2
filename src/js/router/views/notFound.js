/**
 * Renders a simple styled 404 message with a button linking back to the homepage.
 */

document.body.innerHTML = `
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6">
    <h1 class="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
    <p class="text-gray-700 text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
    <a href="/" class="bg-primary text-white px-6 py-2 rounded-md hover:bg-orange-400 transition">
      Go to Homepage
    </a>
  </div>
`;

import { Button } from "./components/ui/button";
import { Home } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-black text-white p-4 rounded-full max-w-3xl mx-3 sm:mx-14 md:mx-auto mt-6">
      <div className="flex items-center space-x-4">
        <div className="bg-gradient-to-br from-yellow-300 via-purple-500 to-purple-600 p-2 rounded-full">
          <Home className="text-white" size={24} />
        </div>
        <a
          href="/"
          className="text-white text-sm hover:text-gray-300 transition-colors"
        >
          Home
        </a>
        <a
          href="/main"
          className="text-white text-sm hover:text-gray-300 transition-colors"
        >
          Audio 
        </a>
        <a
          href="#"
          className="text-white text-sm hover:text-gray-300 transition-colors"
        >
          Chat 
        </a>
      </div>
      <a href="/sign-in">
        <Button
          variant="outline"
          className="bg-white text-black text-sm hover:bg-gray-200 px-6 py-1 rounded-full"
        >
          Login
        </Button>
      </a>
    </nav>
  );
}
{
  /* <header className="flex justify-between items-center bg-black text-white p-4 rounded-full max-w-3xl mx-auto">
<div className="flex space-x-4">
  <a href="#" className="hover:text-gray-300">Feature</a>
  <a href="#" className="hover:text-gray-300">Company</a>
  <a href="#" className="hover:text-gray-300">Pricing</a>
</div>
<Button variant="outline" className="bg-white text-black rounded-full px-4 py-1">
  Login
</Button>
</header> */
}

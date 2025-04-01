import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
    return (
      <nav className="w-full p-4 bg-gray-900 text-white">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">Monakho Ministry</h1>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </nav>
    );
  }  
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/expenses", label: "Expenses" },
  { to: "/budgets", label: "Budgets" },
  { to: "/categories", label: "Categories" },
  { to: "/reports", label: "Reports" },
];

export function AppLayout() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await api.post("/api/v1/auth/logout");
    } catch {
      // ignore errors — clear client state regardless
    }
    logout();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <span className="font-bold text-indigo-600 text-lg">ExpenseTracker</span>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium ${pathname.startsWith(l.to) ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-sm text-gray-500">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="hidden md:block text-sm text-gray-500 hover:text-red-500"
            >
              Logout
            </button>
            <button
              className="md:hidden p-2 rounded"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
              <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
              <span className="block w-5 h-0.5 bg-gray-600" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden px-4 pb-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700"
              >
                {l.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="text-left text-sm text-red-500">
              Logout
            </button>
          </nav>
        )}
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

import LogOut from "./LogOut";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between px-6 bg-base-100 border-b ">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="جستجو..."
            className="rounded-md border border-accent-content bg-white px-4 py-2 text-sm outline-none transition-colors duration-300 focus:border-base-content"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button
          className="relative rounded-md p-2 text-accent-content transition-colors duration-300 hover:bg-base-300"
          aria-label="Notifications"
        >
          🔔
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full ring-2 ring-white bg-accent" />
        </button>

        <LogOut />
      </div>
    </header>
  );
}

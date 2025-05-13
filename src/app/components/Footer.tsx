"use client";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-transparent py-8">
      <div className="container mx-auto px-8 text-center">
        <p className="text-white text-sm">
          &copy; {new Date().getFullYear()} AnomalyLog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

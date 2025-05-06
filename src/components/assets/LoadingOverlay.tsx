'use client'

import { FaSpinner } from "react-icons/fa";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
        <FaSpinner className="text-7xl text-white animate-spin" />
    </div>
  );
}

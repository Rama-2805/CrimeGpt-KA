"use client";

import dynamic from "next/dynamic";

const CrimeHotspotMapClient = dynamic(
  () => import("./CrimeHotspotMapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">
          Crime Hotspot Map
        </h2>

        <div className="h-125">
          Loading map...
        </div>
      </div>
    ),
  }
);

export default function CrimeHotspotMap() {
  return <CrimeHotspotMapClient />;
}
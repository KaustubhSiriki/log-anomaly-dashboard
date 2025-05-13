"use client";

import { useState } from "react";

interface FormData {
  cpu_usage: number;
  memory_usage: number;
  disk_io: number;
  network_traffic: number;
  response_time: number;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

export default function DataForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<FormData>({
    cpu_usage: 0,
    memory_usage: 0,
    disk_io: 0,
    network_traffic: 0,
    response_time: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value === "" ? NaN : parseFloat(value);
    setFormData({
      ...formData,
      [e.target.name]: parsedValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Submit System Metrics
      </h2>
      <div className="flex flex-wrap gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="w-full md:w-1/6">
            <label
              className="block text-gray-700 capitalize mb-1"
              htmlFor={key}
            >
              {key.replace("_", " ")}
            </label>
            <input
              type="number"
              step="any"
              name={key}
              id={key}
              value={
                Number.isNaN((formData as any)[key])
                  ? ""
                  : (formData as any)[key].toString()
              }
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
              suppressHydrationWarning
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        suppressHydrationWarning
      >
        Submit Metrics
      </button>
    </form>
  );
}

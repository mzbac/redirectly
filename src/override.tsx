import React, { FC } from "react";

interface OverrideProps {
    id: number;
    onDelete: (id: number) => void;
    override: { enabled: boolean; from: string; to: string };
    setOverride: (id: number, override: Partial<{ enabled: boolean; from: string; to: string }>) => void;
}

const Override: FC<OverrideProps> = ({ id, onDelete, override, setOverride }) => {
    const { enabled } = override;

    return (
        <div className="flex items-center mb-4 bg-white p-2 rounded border border-gray-200 hover:border-gray-300 transition">
            <div className="flex items-center mr-4">
                <label className="mr-2 font-medium text-gray-600">Enabled:</label>
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setOverride(id, { enabled: e.target.checked })}
                    className={`form-checkbox h-4 w-4 ${enabled ? 'text-blue-500' : 'text-gray-400'}`}
                />
            </div>
            <div className="flex-grow mx-4">
                <input
                    type="text"
                    placeholder="Original URL"
                    value={override.from}
                    onChange={(e) => setOverride(id, { from: e.target.value })}
                    className="mt-1 border border-gray-300 rounded-lg px-2 py-1 w-full text-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
            </div>
            <div className="flex-grow mx-4">
                <input
                    type="text"
                    placeholder="Redirected URL"
                    value={override.to}
                    onChange={(e) => setOverride(id, { to: e.target.value })}
                    className="mt-1 border border-gray-300 rounded-lg px-2 py-1 w-full text-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => onDelete(id)}
                    className="bg-gray-400 text-gray-700 rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-500 transition duration-150 ease-in-out"
                >
                    <span className="text-lg font-semibold">−</span>
                </button>
            </div>
        </div>
    );
};

export default Override;

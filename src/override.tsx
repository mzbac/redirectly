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
        <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => {
                        setOverride(id, { enabled: e.target.checked });
                    }}
                    className="form-checkbox h-4 w-4 text-blue-500"
                />
            </div>
            <div className="flex-grow mr-4">
                <input
                    type="text"
                    placeholder="from"
                    value={override.from}
                    onChange={(e) => {
                        setOverride(id, { from: e.target.value });
                    }}
                    className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                />
            </div>
            <div className="flex-grow mr-4">
                <input
                    type="text"
                    placeholder="to"
                    value={override.to}
                    onChange={(e) => {
                        setOverride(id, { to: e.target.value });
                    }}
                    className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                />
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => {
                        onDelete(id);
                    }}
                    className="bg-red-500 text-white rounded-full p-2"
                >
                    <span className="material-icons-outlined">close</span>
                </button>
            </div>
        </div>
    );
};

export default Override;

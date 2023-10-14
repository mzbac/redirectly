import React, { FC } from "react";

interface HeaderProps {
    id: number;
    onDelete: (id: number) => void;
    header: { enabled: boolean; name: string; value: string, host: string };
    setHeader: (id: number, header: Partial<{ enabled: boolean; name: string; value: string, host: string }>) => void;
}

const Header: FC<HeaderProps> = ({ id, onDelete, header, setHeader }) => {
    const { enabled } = header;

    return (
        <div className="flex items-center my-2 border p-2 rounded bg-white shadow-sm">
            <div className="flex items-center mr-4">
                <label className="mr-2 font-medium text-gray-600">Enabled:</label>
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => {
                        setHeader(id, { enabled: e.target.checked });
                    }}
                    className={`form-checkbox h-4 w-4 ${enabled ? 'text-blue-500' : 'text-gray-400'}`}
                />
            </div>
            <div className="flex-grow mr-4">
                <input
                    type="text"
                    placeholder="Header Name"
                    value={header.name}
                    onChange={(e) => {
                        setHeader(id, { name: e.target.value });
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm placeholder-gray-500"
                />
            </div>
            <div className="flex-grow mr-4">
                <input
                    type="text"
                    placeholder="Header Value"
                    value={header.value}
                    onChange={(e) => {
                        setHeader(id, { value: e.target.value });
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm placeholder-gray-500"
                />
            </div>
            <div className="flex-grow mr-4">
                <input
                    type="text"
                    value={header.host}
                    onChange={(e) => {
                        setHeader(id, { host: e.target.value });
                    }}
                    placeholder="default host: *://*/*"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm placeholder-gray-500"
                />
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => {
                        onDelete(id);
                    }}
                    className="bg-gray-400 text-gray-700 rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-500 transition duration-150 ease-in-out"
                    title="Delete Header"
                >
                    <span className="text-lg font-semibold">−</span>
                </button>
            </div>
        </div>
    );
};

export default Header;

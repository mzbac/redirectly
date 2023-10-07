import React, { FC } from "react";

interface HeaderProps {
    id: number;
    onDelete: (id: number) => void;
    header: { enabled: boolean; name: string; value: string };
    setHeader: (id: number, header: Partial<{ enabled: boolean; name: string; value: string }>) => void;
}

const Header: FC<HeaderProps> = ({ id, onDelete, header, setHeader }) => {
    const { enabled } = header;

    return (
        <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => {
                        setHeader(id, { enabled: e.target.checked });
                    }}
                    className="form-checkbox h-4 w-4 text-blue-500"
                />
            </div>
            <div className="flex-grow mr-4">
                <input
                    type="text"
                    placeholder="name"
                    value={header.name}
                    onChange={(e) => {
                        setHeader(id, { name: e.target.value });
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full text-lg"
                />
            </div>
            <div className="flex-grow mr-4">
                <input
                    type="text"
                    placeholder="value"
                    value={header.value}
                    onChange={(e) => {
                        setHeader(id, { value: e.target.value });
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full text-lg"
                />
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => {
                        onDelete(id);
                    }}
                    className="bg-gray-300 text-black rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-400"
                >
                    x
                </button>
            </div>
        </div>
    );
};

export default Header;

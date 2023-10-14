import React, { useEffect, FC, ReactNode } from "react";
import { useLocalStorage } from "react-use";

import Override from "./override";
import Header from "./header";

interface OverrideType {
    enabled: boolean;
    from: string;
    to: string;
}

interface HeaderType {
    enabled: boolean;
    name: string;
    value: string;
    host: string;
}

const Section: FC<{ title: string, children: ReactNode }> = ({ title, children }) => (
    <div className="my-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="bg-gray-50 p-4 rounded">
            {children}
        </div>
    </div>
);

const MyForm: FC = () => {
    const [enable, setEnable] = useLocalStorage("redirectly-enable", false);
    const [overrides, setOverrides] = useLocalStorage<OverrideType[]>("redirectly-overrides", []);
    const [headers, setHeaders] = useLocalStorage<HeaderType[]>("redirectly-headers", []);

    useEffect(() => {
        chrome.runtime.sendMessage({
            redirctly: {
                enable: enable,
                overrides: overrides,
                headers: headers
            }
        });
    }, [enable, overrides, headers]);

    const setOverride = (id: number, override: Partial<OverrideType>) => {
        if (overrides) {
            overrides[id] = { ...overrides[id], ...override };
            setOverrides([...overrides]);
        }
    };

    const deleteOverride = (id: number) => {
        if (overrides) {
            overrides.splice(id, 1);
            setOverrides([...overrides]);
        }
    };

    const setHeader = (id: number, header: Partial<HeaderType>) => {
        if (headers) {
            headers[id] = { ...headers[id], ...header };
            setHeaders([...headers]);
        }
    };

    const deleteHeader = (id: number) => {
        if (headers) {
            headers.splice(id, 1);
            setHeaders([...headers]);
        }
    };

    return (
        <div className="p-4 w-form mx-auto">
            <div className="flex items-center mb-4">
                <label className="mr-4 font-medium text-gray-600">Enable Debugging Tool</label>
                <input
                    type="checkbox"
                    checked={enable}
                    onChange={(e) => setEnable(e.target.checked)}
                    className={`form-checkbox h-4 w-4 ${enable ? 'text-blue-500' : 'text-gray-400'}`}
                />
            </div>
            <Section title="Redirects">
                {overrides?.map((elm, i) => (
                    <Override key={i} id={i} override={elm} setOverride={setOverride} onDelete={deleteOverride} />
                ))}
                <button
                    className="mt-2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white hover:border-transparent w-full"
                    onClick={() => setOverrides([...(overrides || []), { enabled: false, from: '', to: '' }])}
                >
                    Add redirects
                </button>
            </Section>
            <Section title="Headers">
                {headers?.map((elm, i) => (
                    <Header key={i} id={i} header={elm} setHeader={setHeader} onDelete={deleteHeader} />
                ))}
                <button
                    className="mt-2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white hover:border-transparent w-full"
                    onClick={() => setHeaders([...(headers || []), { enabled: false, name: '', value: '', host: '' }])}
                >
                    Add headers
                </button>
            </Section>
        </div>
    );
};

export default MyForm;

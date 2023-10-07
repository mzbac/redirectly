import React, { useEffect, FC } from "react";
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
                <label className="mr-4">Enable</label>
                <input
                    type="checkbox"
                    checked={enable}
                    onChange={(e) => {
                        setEnable(e.target.checked);
                    }}
                    className="form-checkbox h-4 w-4 text-blue-500"
                />
            </div>
            {overrides && overrides.length > 0 ? <h3 className="text-lg font-semibold">Redirects:</h3> : null}
            {overrides && overrides.map((elm, i) => (
                <Override key={i} id={i} override={elm} setOverride={setOverride} onDelete={deleteOverride} />
            ))}
            {headers && headers.length > 0 ? <h3 className="text-lg font-semibold">Headers:</h3> : null}
            {headers && headers.map((elm, i) => (
                <Header key={i} id={i} header={elm} setHeader={setHeader} onDelete={deleteHeader} />
            ))}
            <div className="flex mt-4">
                <button
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg mr-2 w-1/2 hover:bg-blue-500 hover:text-white hover:border-transparent"
                    onClick={() => {
                        setOverrides([...overrides as OverrideType[], { enabled: false, from: '', to: '' }]);
                    }}
                >
                    <span className="material-icons-outlined">Add redirects</span>
                </button>
                <button
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg w-1/2 hover:bg-blue-500 hover:text-white hover:border-transparent"
                    onClick={() => {
                        setHeaders([...headers as HeaderType[], { enabled: false, name: '', value: '', host: '' }]);
                    }}
                >
                    <span className="material-icons-outlined">Add headers</span>
                </button>
            </div>
        </div>
    );
};

export default MyForm;

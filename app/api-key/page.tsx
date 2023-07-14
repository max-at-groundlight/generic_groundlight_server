"use client"

import { useEffect, useState } from "react";

export default function Page() {
    // const [apiKey, setApiKey] = useState<string>("");
    const [apiKeyTemp, setApiKeyTemp] = useState<string>("");

    useEffect(() => {
        // fetch detector configs
        fetch("/api/config").then((res) => res.json()).then((data) => {
          setApiKeyTemp((data.api_key ? data.api_key as string : "").substring(0, 15) + "...");
        //   setApiKey(data.api_key ? data.api_key as string : "");
        });
      }, []);

    const saveApiKey = (apiKey: string) => {
        // save api key
        fetch("/api/config/api_key", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
          }),
        });
      }

    return (
        <div className="m-10" >
            <div className="text-2xl" >
                Set your Groundlight API Key:
            </div>
            <div className="p-2"></div>
            <div className="flex gap-2 mx-4">
                <input className="border-2 border-gray-300 rounded-md p-2" type="text" placeholder="API Key" value={apiKeyTemp} onChange={(e) => setApiKeyTemp(e.target.value)} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                    // setApiKey(apiKeyTemp);
                    saveApiKey(apiKeyTemp);
                }}>
                    Save
                </button>
            </div>
        </div>
    );
}
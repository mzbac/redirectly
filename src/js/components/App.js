import React, { useState } from "react";
import { Spin } from "antd";
import Form from "./Form";
import "./App.css";

export default () => {
  const [formData, setFormData] = useState(undefined);

  if (!formData) {
    chrome.storage.sync.get(
      ["target", "headers", "overrides", "enable"],
      function(result) {
        if (!result.target) {
          result.target = "";
        }
        if (!result.headers) {
          result.headers = [];
        }
        if (!result.overrides) {
          result.overrides = [];
        }
        if (!result.enable) {
          result.enable = false;
        }
        setFormData(result);
      }
    );
    return (
      <div className="app">
        <Spin size="large" />
      </div>
    );
  } else {
    return <Form formData={formData} />;
  }
};

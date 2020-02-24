import React, { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { Form, Switch, Button, Icon, Row, Col } from "antd";
import "./Form.css";
import Override from "./Overide";
import Header from "./Header";

export default props => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
      style: {
        textAlign: "left"
      }
    },

    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 }
    }
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 0 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 0
      }
    }
  };
  const [enable, setEnable] = useLocalStorage("redirectly-enable", false);
  const [overrides, setOverrides] = useLocalStorage("redirectly-overrides", []);
  const [headers, setHeaders] = useLocalStorage("redirectly-headers", []);
  useEffect(() => {
    chrome.runtime.sendMessage({
      redirctly: {
        enable: enable,
        overrides: overrides,
        headers: headers
      }
    });
  }, [enable, overrides, headers]);

  const setOverride = (id, override) => {
    overrides[id] = { ...overrides[id], ...override };
    setOverrides([...overrides]);
  };
  const deleteOverride = id => {
    overrides.splice(id, 1);
    setOverrides(overrides);
  };

  const setHeader = (id, header) => {
    headers[id] = { ...headers[id], ...header };
    setHeaders([...headers]);
  };
  const deleteHeader = id => {
    headers.splice(id, 1);
    setHeaders([...headers]);
  };

  return (
    <Form className="form">
      <Form.Item
        {...formItemLayout}
        label="Enable"
        style={{ textAlign: "left" }}
      >
        <Switch
          checked={enable}
          onChange={checked => {
            setEnable(checked);
          }}
        />
      </Form.Item>
      {overrides.length > 0 ? <h3>Redirects:</h3> : null}
      {overrides.map((elm, i) => {
        return (
          <Override
            key={i}
            id={i}
            override={elm}
            setOverride={setOverride}
            onDelete={deleteOverride}
          />
        );
      })}
      {headers.length > 0 ? <h3>headers:</h3> : null}
      {headers.map((elm, i) => {
        return (
          <Header
            key={i}
            id={i}
            header={elm}
            setHeader={setHeader}
            onDelete={deleteHeader}
          />
        );
      })}
      <Row>
        <Col span={12}>
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => {
                setOverrides([...overrides, {}]);
              }}
              style={{ width: "80%" }}
            >
              <Icon type="plus" /> Add redirects
            </Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button
              type="dashed"
              onClick={() => {
                setHeaders([...headers, {}]);
              }}
              style={{ width: "80%" }}
            >
              <Icon type="plus" /> Add headers
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

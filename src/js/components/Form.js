import React from "react";
import { Form, Input, Switch, Button, Icon, Row, Col } from "antd";
import "./Form.css";
import Override from "./Overide";
import Header from "./Header";

export default Form.create({ name: "form" })(props => {
  const { form } = props;
  const { getFieldDecorator } = form;
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
  return (
    <Form className="form">
      <Form.Item
        {...formItemLayout}
        label="Enable"
        style={{ textAlign: "left" }}
      >
        <Switch />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Tab URL"
        style={{ textAlign: "left" }}
      >
        <Input />
      </Form.Item>
      <h3>Overrides:</h3>
      <Override />
      <h3>Headers:</h3>
      <Header />
      <Row>
        <Col span={12}>
          <Form.Item>
            <Button type="dashed" onClick={() => {}} style={{ width: "80%" }}>
              <Icon type="plus" /> Add overrides
            </Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={() => {}} style={{ width: "80%" }}>
              <Icon type="plus" /> Add headers
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" icon="save" size="large">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
});

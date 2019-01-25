import React from "react";
import { Form, Input, Switch, Button, Icon, Row, Col } from "antd";
import "./Form.css";
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
        {getFieldDecorator("enable", { valuePropName: "checked" })(<Switch />)}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Tab URL"
        style={{ textAlign: "left" }}
      >
        {getFieldDecorator("tabUrl")(<Input />)}
      </Form.Item>
      <Row>
        <Col span={11}>
          <Form.Item>
            {getFieldDecorator(`field-1`)(<Input placeholder="from" />)}
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item wrapperCol={{ style: { marginLeft: 15 } }}>
            {getFieldDecorator(`field-2`)(<Input placeholder="to" />)}
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item wrapperCol={{ style: { textAlign: "center" } }}>
            <Button shape="circle" icon="close" style={{ border: "none" }} />
          </Form.Item>
        </Col>
      </Row>
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

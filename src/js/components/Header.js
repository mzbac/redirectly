import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

export default props => {
  const { onDelete } = props;
  return (
    <Row>
      <Col span={11}>
        <Form.Item>
          <Input placeholder="name" />
        </Form.Item>
      </Col>
      <Col span={11}>
        <Form.Item wrapperCol={{ style: { marginLeft: 15 } }}>
          <Input placeholder="value" />
        </Form.Item>
      </Col>
      <Col span={2}>
        <Form.Item wrapperCol={{ style: { textAlign: "center" } }}>
          <Button
            shape="circle"
            icon="close"
            style={{ border: "none" }}
            onClick={onDelete}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

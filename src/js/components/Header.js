import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

export default props => {
  const { id, onDelete, header, setHeader } = props;

  return (
    <Row>
      <Col span={11}>
        <Form.Item>
          <Input
            placeholder="name"
            value={header.name}
            onChange={e => {
              e.preventDefault();
              setHeader(id, { name: e.target.value });
            }}
          />
        </Form.Item>
      </Col>
      <Col span={11}>
        <Form.Item wrapperCol={{ style: { marginLeft: 15 } }}>
          <Input
            placeholder="value"
            value={header.value}
            onChange={e => {
              e.preventDefault();
              setHeader(id, { value: e.target.value });
            }}
          />
        </Form.Item>
      </Col>
      <Col span={2}>
        <Form.Item wrapperCol={{ style: { textAlign: "center" } }}>
          <Button
            shape="circle"
            icon="close"
            style={{ border: "none" }}
            onClick={() => {
              onDelete(id);
            }}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

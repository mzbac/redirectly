import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

export default props => {
  const { getFieldDecorator, fieldId, onDelete } = props;
  return (
    <Row>
      <Col span={11}>
        <Form.Item>
          {getFieldDecorator(fieldId)(<Input placeholder="from" />)}
        </Form.Item>
      </Col>
      <Col span={11}>
        <Form.Item wrapperCol={{ style: { marginLeft: 15 } }}>
          {getFieldDecorator(fieldId)(<Input placeholder="to" />)}
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

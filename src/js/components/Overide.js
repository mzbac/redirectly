import React from "react";
import { Form, Input, Button, Row, Col, Switch } from "antd";
export default props => {
  const { onDelete, id, override, setOverride } = props;
  const { enabled } = override;
  return (
    <Row>
      <Col span={2}>
        <Form.Item>
          <Switch
            checked={enabled}
            onClick={checked => {
              setOverride(id, { enabled: checked });
            }}
          />
        </Form.Item>
      </Col>
      <Col span={10}>
        <Form.Item>
          <Input
            placeholder="from"
            value={override.from}
            onChange={e => {
              e.preventDefault();
              setOverride(id, { from: e.target.value });
            }}
          />
        </Form.Item>
      </Col>
      <Col span={10}>
        <Form.Item wrapperCol={{ style: { marginLeft: 15 } }}>
          <Input
            placeholder="to"
            value={override.to}
            onChange={e => {
              e.preventDefault();
              setOverride(id, { to: e.target.value });
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

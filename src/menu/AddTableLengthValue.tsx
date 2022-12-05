import { Form, Input, InputNumber } from 'antd'
import React from 'react'

export const AddTableLengthValue = (type: string, restField: any) => {
  if (!type || ['DATE', 'TIME'].some(keyword => type.includes(keyword))) {
    return (
      <Form.Item {...restField} initialValue={''}>
        <Input disabled placeholder="不用填" />
      </Form.Item>
    )
  }
  if (
    ['INT', 'CHAR', 'DECIMAL', 'FLOAT', 'DOUBLE', 'REAL', 'BOOLEAN', 'SERIAL', 'TEXT', 'BIN', 'BLOB'].some(keyword =>
      type.includes(keyword)
    )
  ) {
    return (
      <Form.Item {...restField}>
        <InputNumber autoFocus placeholder="字段长度" style={{ width: '100%' }} />
      </Form.Item>
    )
  }

  return (
    <Form.Item {...restField}>
      <Input />
    </Form.Item>
  )
}

import { Divider, Form, Input, Select } from 'antd'
import React, { ChangeEvent, FC, useState } from 'react'
interface IProps {
  restField: any
}

export const AddTableValueDefault: FC<IProps> = ({ restField }) => {
  const [items, setItems] = useState([
    { key: 0, label: 'NULL', value: 'NULL' },
    { key: 1, label: 'CURRENT_TIMESTAMP', value: 'CURRENT_TIMESTAMP' },
  ])
  const [name, setName] = useState('')

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
    items[2] = { key: 2, label: value || '[空]', value: `'${(value || '[空]').replace(/'/g, "\\'")}'` }
    setItems([...items])
  }

  return (
    <Form.Item {...restField} style={{ width: '100%', maxWidth: '150px' }}>
      <Select
        placeholder="默认值"
        allowClear
        dropdownRender={menu => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Input placeholder="输入自定义值" value={name} onChange={onNameChange} onFocus={onNameChange} />
          </>
        )}
        options={items}
      />
    </Form.Item>
  )
}

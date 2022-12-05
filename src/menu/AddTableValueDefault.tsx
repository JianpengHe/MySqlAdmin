import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, InputRef, Select, Space } from 'antd'
import React from 'react'
interface IProps {
  restField: any
}

export const AddTableValueDefault: React.FC<IProps> = ({ restField }) => {
  const [items, setItems] = React.useState([
    { label: 'NULL', value: 'NULL' },
    { label: 'CURRENT_TIMESTAMP', value: 'CURRENT_TIMESTAMP' },
  ])
  const [name, setName] = React.useState('')

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
    items[2] = { label: value || '[空]', value: `'${(value || '[空]').replace(/'/g, "/'")}'` }
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
            <Input placeholder="自定义" value={name} onChange={onNameChange} onFocus={onNameChange} />
          </>
        )}
        options={items}
      />
    </Form.Item>
  )
}

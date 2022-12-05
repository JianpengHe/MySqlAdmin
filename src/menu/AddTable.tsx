import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Button, Col, Form, Input, Modal, Row, Select, Switch } from 'antd'
import React from 'react'
import { querySQL, useSql, useSqlformat } from '/utils/useSql'
import { columnTypeOptions } from '/utils/columnTypeOptions'
import { AddTableLengthValue } from './AddTableLengthValue'
import { AddTableValueDefault } from './AddTableValueDefault'
import styled from 'styled-components'
const propertyOptions = [
  { label: 'BINARY', value: 'BINARY' },
  { label: 'UNSIGNED', value: 'UNSIGNED' },
  { label: 'UNSIGNED ZEROFILL', value: 'UNSIGNED ZEROFILL' },
  { label: 'on update CURRENT_TIMESTAMP', value: 'on update CURRENT_TIMESTAMP' },
]
const indexOptions = [
  { label: 'AUTO_INCREMENT', value: 'AUTO_INCREMENT', title: '自增' },
  { label: 'PRIMARY', value: 'PRIMARY', title: '主键' },
  { label: 'UNIQUE', value: 'UNIQUE', title: '唯一' },
  { label: 'INDEX', value: 'INDEX', title: '索引' },
  { label: 'FULLTEXT', value: 'FULLTEXT', title: '全文搜索' },
  { label: 'SPATIAL', value: 'SPATIAL', title: '空间' },
]
interface IProps {
  dbName: string
}
const Styled = styled.div`
  .column {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    > div {
      margin-right: 5px;
      height: 32px;
    }
    > span {
      line-height: 32px;
      display: block;
    }
  }
`
export const AddTable: React.FC<IProps> = ({ dbName }) => {
  const [open, { setFalse, setTrue }] = useBoolean(false)
  const [form] = Form.useForm()

  return (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={setTrue} icon={<PlusOutlined />} size="small" type="link">
        添加数据表
      </Button>
      <Modal width={1200} destroyOnClose open={open} title="添加数据表" onCancel={setFalse} onOk={form.submit}>
        <Form preserve={false} form={form} labelCol={{ flex: '0 0 80px' }} initialValues={{ dbName }}>
          <Row>
            <Col span={12}>
              <Form.Item
                name="dbName"
                label="表名称"
                rules={[
                  {
                    required: true,
                    message: '请输入数据表名称',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="表名称"
                rules={[
                  {
                    required: true,
                    message: '请输入数据表名称',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="columns" label="表字段" rules={[{ required: true, message: '请添加数据表字段' }]}>
            <Form.List name="columns">
              {(fields, { add, remove }) => (
                <Styled>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="column">
                      <Form.Item
                        style={{ width: '100%' }}
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true, message: '请输入字段名称' }]}
                      >
                        <Input placeholder="字段名称" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'type']}
                        rules={[{ required: true, message: '请选择字段类型' }]}
                        style={{ width: '100%' }}
                      >
                        <Select placeholder="字段类型" options={columnTypeOptions} />
                      </Form.Item>
                      <Form.Item
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.columns[name]?.type !== curValues.columns[name]?.type
                        }
                      >
                        {() =>
                          AddTableLengthValue(form.getFieldValue(['columns', name, 'type']), {
                            name: [name, 'lengthValue'],
                            style: { width: '80px' },
                            ...restField,
                          })
                        }
                      </Form.Item>

                      <AddTableValueDefault restField={{ name: [name, 'Default'], ...restField }} />

                      <Form.Item {...restField} name={[name, 'property']} style={{ width: '100%', maxWidth: '150px' }}>
                        <Select allowClear placeholder="字段属性" options={propertyOptions} />
                      </Form.Item>

                      <Form.Item
                        style={{ width: '100%', maxWidth: '60px' }}
                        {...restField}
                        name={[name, 'null']}
                        valuePropName="checked"
                      >
                        <Switch checkedChildren="可空" unCheckedChildren="非空" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'index']} style={{ width: '100%', maxWidth: '150px' }}>
                        <Select allowClear placeholder="索引" options={indexOptions} />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </div>
                  ))}

                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加字段
                  </Button>
                </Styled>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

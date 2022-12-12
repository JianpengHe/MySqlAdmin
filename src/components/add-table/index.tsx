import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Button, Col, Form, Input, Modal, Row, Select, Switch } from 'antd'
import React, { FC, useCallback, useContext, useMemo } from 'react'
import { querySQL, useSql, useSqlformat } from '../../hooks/useSql'
import { columnTypeOptions } from '/utils/columnTypeOptions'
import { AddTableLengthValue } from './LengthValue'
import { AddTableValueDefault } from './ValueDefault'
import styled from 'styled-components'
import { AppContext } from '/AppContext'
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
type IFormData = {
  dbName: string
  tableName: string
  columns: {
    Default?: string
    Index?: string
    LengthValue?: string | number
    Name: string
    Null: boolean
    Property?: string
    Type?: string
  }[]
}
interface IProps {
  dbName: string
  afterSubmit: (dbName: string, tableName: string) => void
}
export const AddTable: FC<IProps> = ({ dbName, afterSubmit }) => {
  const { dbList } = useContext(AppContext)
  const [open, { setFalse, setTrue }] = useBoolean(false)
  const [form] = Form.useForm<IFormData>()
  const dbNameOptions = useMemo(() => dbList.map(db => ({ label: db, value: db })), [dbList])
  const onFinish = useCallback(
    (formData: IFormData) => {
      console.log(formData)
      setFalse()
      setTimeout(() => {
        afterSubmit(formData.dbName, formData.tableName)
      }, 1000)
    },
    [afterSubmit]
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={setTrue} icon={<PlusOutlined />} size="small" type="link">
        添加数据表
      </Button>
      <Modal width={1200} destroyOnClose open={open} title="添加数据表" onCancel={setFalse} onOk={form.submit}>
        <Form
          preserve={false}
          form={form}
          labelCol={{ flex: '0 0 80px' }}
          initialValues={{ dbName }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="dbName"
                label="数据库"
                rules={[
                  {
                    required: true,
                    message: '请选择数据库',
                  },
                ]}
              >
                <Select placeholder="请选择数据库" options={dbNameOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tableName"
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
                      {/* 字段名称 */}
                      <Form.Item
                        style={{ width: '100%' }}
                        {...restField}
                        name={[name, 'Name']}
                        rules={[{ required: true, message: '请输入字段名称' }]}
                      >
                        <Input placeholder="字段名称" />
                      </Form.Item>
                      {/* 字段类型 */}

                      <Form.Item
                        {...restField}
                        name={[name, 'Type']}
                        rules={[{ required: true, message: '请选择字段类型' }]}
                        style={{ width: '100%' }}
                      >
                        <Select placeholder="字段类型" options={columnTypeOptions} />
                      </Form.Item>

                      {/* shouldUpdate */}
                      <Form.Item
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.columns[name]?.Type !== curValues.columns[name]?.Type
                        }
                      >
                        {() =>
                          AddTableLengthValue(form.getFieldValue(['columns', name, 'Type']), {
                            name: [name, 'LengthValue'],
                            style: { width: '80px' },
                            ...restField,
                          })
                        }
                      </Form.Item>

                      {/* 默认值 */}
                      <AddTableValueDefault restField={{ name: [name, 'Default'], ...restField }} />

                      {/* 字段属性 */}
                      <Form.Item {...restField} name={[name, 'Property']} style={{ width: '100%', maxWidth: '150px' }}>
                        <Select allowClear placeholder="字段属性" options={propertyOptions} />
                      </Form.Item>

                      {/* 空 */}
                      <Form.Item
                        style={{ width: '100%', maxWidth: '60px' }}
                        {...restField}
                        name={[name, 'Null']}
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Switch checkedChildren="可空" unCheckedChildren="非空" />
                      </Form.Item>

                      {/* 索引 */}
                      <Form.Item {...restField} name={[name, 'Index']} style={{ width: '100%', maxWidth: '150px' }}>
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

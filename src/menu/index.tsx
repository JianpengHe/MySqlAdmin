import { DatabaseFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Menu, Spin } from 'antd'
import React from 'react'
import { useSql, useSqlformat } from '/utils/useSql'
import { SubMenuType } from 'antd/es/menu/hooks/useItems'
import { useReqTable } from '/utils/useReqTable'
import styled from 'styled-components'
import { AddTable } from './AddTable'
const Styled = styled.div`
  flex: 1;
  .loading {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ul > li:last-child {
    padding-left: 0 !important;
    align-items: center;
    cursor: default;
    > div {
      cursor: default !important;
      background-color: transparent !important;
      > i {
        display: none;
      }
    }
  }
`
interface IProps {}
export const IndexMenu: React.FC<IProps> = ({}) => {
  const [openKeys, setOpenKeys] = React.useState<string[]>([])

  const { databases, reqTable } = useReqTable()
  const { data, error } = useSql({ sql: 'show databases', params: [], formatResult: useSqlformat }, true)

  const items: SubMenuType[] = React.useMemo(() => {
    const newItems: SubMenuType[] = []
    if (data) {
      for (const { Database } of data) {
        const database = String(Database || '')
        const dbReqResult = databases[database]
        const item: SubMenuType = {
          key: database,
          label: database,
          disabled: dbReqResult === 'loading',
          icon: dbReqResult === 'loading' ? <LoadingOutlined /> : <DatabaseFilled />,
          children: Array.isArray(dbReqResult)
            ? dbReqResult.map(tableName => ({
                disabled: !tableName,
                key: JSON.stringify({ database, tableName }),
                label: tableName || <AddTable dbName={database} />,
              }))
            : [],
        }
        newItems.push(item)
      }
    }
    newItems.push({
      disabled: true,
      key: '',
      label: (
        <Button icon={<PlusOutlined />} size="small" type="link">
          添加数据库
        </Button>
      ),
      children: [],
    })
    return newItems
  }, [data, databases])

  const onOpenChange = React.useCallback(
    (newKeys: string[]) => {
      newKeys.forEach(key => {
        const info = items.find(d => d.key === key)
        if (!info || info.disabled) {
          return
        }
        if (!info.children.length) {
          reqTable(key)
        }
      })
      for (const { disabled, key } of items) {
        disabled && newKeys.push(key)
      }
      setOpenKeys([...new Set(newKeys)])
    },
    [items]
  )

  return (
    <Styled className="scrollbar">
      {!data ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <Menu
          //  defaultSelectedKeys={[data[0].children[0].key]}
          // defaultOpenKeys={[data[1].key]}
          // selectedKeys={selectedKeys}
          // onClick={({ key }) => setSelectedKeys([key])}
          openKeys={openKeys.filter(key => items.find(el => el.key === key)?.children.length)}
          onOpenChange={onOpenChange}
          theme="dark"
          mode="inline"
          items={items}
        />
      )}
    </Styled>
  )
}

import { DatabaseFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Button, Menu, MenuProps, Modal, Skeleton, Spin } from 'antd'
import React from 'react'
import { querySQL, useSql, useSqlformat } from '/untils/useSql'

interface IProps {}
export const IndexMenu: React.FC<IProps> = ({}) => {
  const [open, { setTrue, setFalse }] = useBoolean(false)
  // const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])
  const [openKeys, setOpenKeys] = React.useState<string[]>([])
  const formatResult = React.useCallback((source: any) => {
    const data = useSqlformat(source).map(({ Database }) => String(Database || ''))
    // data.length && setSelectedKeys([data[0]])
    const children: any[] = []
    return data.map(Database => ({
      key: Database,
      label: Database,
      disabled: false,
      icon: <DatabaseFilled />,
      children,
    }))
  }, [])
  const { data, error, setData } = useSql({ sql: 'show databases', params: [], formatResult }, true)
  return (
    <div style={{ flex: 1 }} className="scrollbar">
      {!data ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spin />
        </div>
      ) : (
        <Menu
          //  defaultSelectedKeys={[data[0].children[0].key]}
          // defaultOpenKeys={[data[1].key]}
          // selectedKeys={selectedKeys}
          // onClick={({ key }) => setSelectedKeys([key])}
          openKeys={openKeys}
          onOpenChange={newKeys => {
            // const needReq:string[]=[]
            const newOpenKeys: string[] = []
            // const newData:typeof data=[]
            newKeys.forEach(key => {
              const info = data.find(d => d.key === key)
              if (!info || info.disabled) {
                return
              }
              if (info.children.length) {
                newOpenKeys.push(key)
                return
              }
              info.disabled = true
              info.icon = <LoadingOutlined />
              querySQL([], 'show tables', key)
                .then(d => {
                  info.children = useSqlformat(d).map(obj => {
                    for (const k in obj) {
                      return {
                        key: JSON.stringify({ db: key, table: obj[k] }),
                        label: obj[k],
                      }
                    }
                  }) as any
                  // info.children.push({
                  //   type: 'divider',
                  // })
                  info.children.push({
                    disabled: true,
                    key: JSON.stringify({ db: key, type: 'add' }),
                    label: (
                      <Button icon={<PlusOutlined />} size="small" type="link">
                        添加数据表
                      </Button>
                    ),
                  })
                  setOpenKeys([...openKeys, key])
                })
                .catch(e => {
                  console.log(e)
                })
                .finally(() => {
                  info.icon = <DatabaseFilled />
                  info.disabled = false
                  setData([...data])
                })
            })
            setData([...data])
            setOpenKeys(newOpenKeys)
            // querySQL
            // openKeys
          }}
          theme="dark"
          mode="inline"
          items={data}
        />
      )}
    </div>
  )
}

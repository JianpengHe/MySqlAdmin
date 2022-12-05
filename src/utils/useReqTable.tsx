import { message } from 'antd'
import React from 'react'
import { querySQL, useSqlformat } from './useSql'

type IUseReqTables = { [x: string]: string[] | 'loading' }
export function useReqTable(): {
  databases: IUseReqTables
  reqTable: (dbName: string) => Promise<void>
} {
  const [databases, setDatabases] = React.useState<IUseReqTables>({})
  const ref = React.useRef<IUseReqTables>({})

  const reqTable = async (dbName: string) => {
    ref.current[dbName] = 'loading'
    setDatabases({ ...ref.current })
    try {
      const item: string[] = useSqlformat(await querySQL([], 'show tables', dbName))
        .map(obj => {
          for (const k in obj) {
            return String(obj[k] || '')
          }
          return ''
        })
        .filter(d => d)
      item.push('')
      ref.current[dbName] = item
    } catch (e: any) {
      message.error(e)
      delete ref.current[dbName]
    }

    setDatabases({ ...ref.current })
  }
  return { databases, reqTable }
}

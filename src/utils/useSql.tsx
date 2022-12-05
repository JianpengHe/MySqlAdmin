import React from 'react'

export enum EMysqlFieldType {
  decimal = 0x00,
  tiny = 0x01,
  short = 0x02,
  long = 0x03,
  float = 0x04,
  double = 0x05,
  null = 0x06,
  timestamp = 0x07,
  longlong = 0x08,
  int24 = 0x09,
  date = 0x0a,
  time = 0x0b,
  datetime = 0x0c,
  year = 0x0d,
  newdate = 0x0e,
  varchar = 0x0f,
  bit = 0x10,
  newdecimal = 0xf6,
  enum = 0xf7,
  set = 0xf8,
  tiny_blob = 0xf9,
  medium_blob = 0xfa,
  long_blob = 0xfb,
  blob = 0xfc,
  var_string = 0xfd,
  string = 0xfe,
  geometry = 0xff,
}
export enum EMysqlFieldFlags {
  not_flags = 0,
  not_null = 0x0001,
  pri_key = 0x0002,
  unique_key = 0x0004,
  multiple_key = 0x0008,
  blob = 0x0010,
  unsigned = 0x0020,
  zerofill = 0x0040,
  binary = 0x0080,
  enum = 0x0100,
  auto_increment = 0x0200,
  timestamp = 0x0400,
  set = 0x0800,
}

export type IMysqlFieldHeader = {
  /** 目录名称 */
  catalog: string
  /** 数据库名称 */
  schema: string
  /** 数据表名称 */
  table: string
  /** 数据表原始名称 */
  tableOrg: string
  /** 列（字段）名称 */
  name: string
  /** 列（字段）原始名称 */
  nameOrg: string
  /** 字符编码 */
  characterSet: number
  /** 列（字段）长度 */
  columnLength: number
  /** 列（字段）类型 */
  type: keyof typeof EMysqlFieldType
  /** 列（字段）标志 */
  flags: (keyof typeof EMysqlFieldFlags)[]
  /** 整型值精度 */
  decimals: number
  /** 是否是固定长度 */
  noFixedLength?: boolean
}
export type IMysqlValue = number | string | Date | Buffer | null | undefined
export type IMysqlResult = {
  /** 受影响行数 */
  affectedRows: number
  /** 索引ID值 */
  lastInsertId: number
  /** 服务器状态 */
  statusFlags: number
  /** 告警计数 */
  warningsNumber: number
  /** 服务器消息 */
  message: string
}
export type IMysqlResultset = { headerInfo: IMysqlFieldHeader[]; data: IMysqlValue[][] }
type IUseSqlData = IMysqlResult | IMysqlResultset | null
type IUseSqlReturn<T, F> = {
  data: F | undefined
  loading: boolean | undefined
  error: Error | null | undefined
  setData: React.Dispatch<React.SetStateAction<F | undefined>>
  run: (
    params: T extends true ? IMysqlValue[] : IMysqlValue[] | void,
    sql: T extends true ? string : string | void,
    db?: string
  ) => Promise<F>
  isFirstRun: boolean
}
type IUseSqlOptMain = {
  params: IMysqlValue[]
  sql: string
}
type IUseSqlOpt<F = IUseSqlData> = {
  db?: string
  formatResult?: (res: IUseSqlData, sql: string, params: IMysqlValue[]) => F
  onSuccess?: (data: F, sql: string, params: IMysqlValue[]) => void
  onError?: (err: Error, sql: string, params: IMysqlValue[]) => void
}
export function useSql(): IUseSqlReturn<true, IUseSqlData>
export function useSql<F = IUseSqlData>(opt: IUseSqlOpt<F> & Partial<IUseSqlOptMain>): IUseSqlReturn<false, F>
export function useSql<F = IUseSqlData>(opt: IUseSqlOpt<F> & IUseSqlOptMain, auto: true): IUseSqlReturn<false, F>

export function useSql<F = IUseSqlData>(opt?: IUseSqlOpt<F> & Partial<IUseSqlOptMain>, auto?: true): any {
  const [data, setData] = React.useState<F | null>()
  const [loading, setLoading] = React.useState<boolean>(Boolean(auto))
  const [error, setError] = React.useState<Error | null>()
  const { current } = React.useRef({ isFirstRun: true })

  const run = React.useCallback(
    (runParams?: IMysqlValue[], runSql?: string, dbName?: string) =>
      new Promise((resolve, reject) => {
        const sql = runSql ?? opt?.sql ?? ''
        const params = runParams ?? opt?.params ?? []
        if (opt) {
          opt.sql = sql
          opt.params = params
        }
        loading || setLoading(true)
        querySQL(params, sql, dbName ?? opt?.db)
          .then(data => {
            if (opt?.formatResult) {
              data = opt.formatResult(data, sql, params)
            }
            resolve(data)
            setData(data)
            setError(null)
            setLoading(false)
            opt?.onSuccess && opt.onSuccess(data, sql, params)
          })
          .catch(e => {
            reject(e)
            setData(null)
            setError(e)
            setLoading(false)
            opt?.onError && opt.onError(e, sql, params)
          })
      }),
    []
  )

  if (auto && current.isFirstRun) {
    current.isFirstRun = false
    run()
  }

  return { data, setData, loading, error, run, ...current }
}

export const querySQL = (params?: IMysqlValue[], sql?: string, db?: string) =>
  fetch('/api/query', {
    method: 'POST',
    body: JSON.stringify({ sql, params, db }),
  }).then(res => {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }
    return res.json()
  })

export const useSqlformat: (source: IUseSqlData) => { [x: string]: IMysqlValue }[] = source => {
  if (!source || !('data' in source)) {
    return []
  }
  return source.data.map(row => source.headerInfo.reduce((obj, header, i) => ({ ...obj, [header.name]: row[i] }), {}))
}

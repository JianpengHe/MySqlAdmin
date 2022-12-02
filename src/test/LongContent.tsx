import { useBoolean } from 'ahooks'
import { Button, Modal } from 'antd'
import React, { useCallback } from 'react'
import { useSql, useSqlformat } from '/untils/useSql'

interface IProps {}
export const LongContent: React.FC<IProps> = ({}) => {
  const [open, { setTrue, setFalse }] = useBoolean(false)
  // const { data, loading, run } = useRequest(axios.get, {
  //   manual: true,
  //   onSuccess() {
  //     setTrue()
  //   }
  // })

  const { data, run, loading } = useSql({ db: 'info', formatResult: useSqlformat })
  const onClick = useCallback(() => run([], 'show tables'), [])
  return (
    <div>
      <Modal title="请求结果" open={open} onCancel={setFalse}>
        {String(data || '')}
      </Modal>
      <Button loading={loading} onClick={onClick}>
        点击请求
      </Button>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
      {
        // indicates very long content
        Array.from({ length: 100 }, (_, index) => (
          <React.Fragment key={index}>
            {index % 20 === 0 && index ? 'more' : '...'}
            <br />
          </React.Fragment>
        ))
      }
    </div>
  )
}

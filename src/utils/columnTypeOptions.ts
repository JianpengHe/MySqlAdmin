// var i = 0
// var r = function (dom) {
//   if (dom.tagName === 'OPTION') {
//     return { key: i++, label: dom.value, value: dom.value, disabled: dom.disabled, title: dom.title }
//   }
//   if (dom.tagName === 'OPTGROUP') {
//     return { label: dom.label, options: [...dom.children].map(r) }
//   }
// }
// console.log(JSON.stringify([...$0.children].map(r)))
export const columnTypeOptions = [
  {
    key: 0,
    label: 'INT',
    value: 'INT',
    disabled: false,
    title: '4 字节整数，有符号范围从 -2147483648 到 2147483647，无符号范围从 0 到 4294967295',
  },
  {
    key: 1,
    label: 'VARCHAR',
    value: 'VARCHAR',
    disabled: false,
    title: '变长（0-65,535）字符串，最大有效长度取决于最大行大小',
  },
  {
    key: 2,
    label: 'TEXT',
    value: 'TEXT',
    disabled: false,
    title: '最多存储 65535（2^16 - 1）字节的文本字段，存储时在内容前使用 2 字节表示内容的字节数',
  },
  { key: 3, label: 'DATE', value: 'DATE', disabled: false, title: '日期，支持的范围从 1000-01-01 到 9999-12-31' },
  {
    label: '数字',
    options: [
      {
        key: 4,
        label: 'TINYINT',
        value: 'TINYINT',
        disabled: false,
        title: '1 字节整数，有符号范围从 -128 到 127，无符号范围从 0 到 255',
      },
      {
        key: 5,
        label: 'SMALLINT',
        value: 'SMALLINT',
        disabled: false,
        title: '2 字节整数，有符号范围从 -32768 到 32767，无符号范围从 0 到 65535',
      },
      {
        key: 6,
        label: 'MEDIUMINT',
        value: 'MEDIUMINT',
        disabled: false,
        title: '3 字节整数，有符号范围从 -8388608 到 8388607，无符号范围从 0 到 16777215',
      },
      {
        key: 7,
        label: 'INT',
        value: 'INT',
        disabled: false,
        title: '4 字节整数，有符号范围从 -2147483648 到 2147483647，无符号范围从 0 到 4294967295',
      },
      {
        key: 8,
        label: 'BIGINT',
        value: 'BIGINT',
        disabled: false,
        title:
          '8 字节整数，有符号范围从 -9223372036854775808 到 9223372036854775807，无符号范围从 0 到 18446744073709551615',
      },
      { key: 9, label: '-', value: '-', disabled: true, title: '' },
      {
        key: 10,
        label: 'DECIMAL',
        value: 'DECIMAL',
        disabled: false,
        title: '定点数（M，D）- 整数部分（M）最大为 65（默认 10），小数部分（D）最大为 30（默认 0）',
      },
      {
        key: 11,
        label: 'FLOAT',
        value: 'FLOAT',
        disabled: false,
        title:
          '单精度浮点数，取值范围从 -3.402823466E+38 到 -1.175494351E-38、0 以及从 1.175494351E-38 到 3.402823466E+38',
      },
      {
        key: 12,
        label: 'DOUBLE',
        value: 'DOUBLE',
        disabled: false,
        title:
          '双精度浮点数，取值范围从 -1.7976931348623157E+308 到 -2.2250738585072014E-308、0 以及从 2.2250738585072014E-308 到 1.7976931348623157E+308',
      },
      {
        key: 13,
        label: 'REAL',
        value: 'REAL',
        disabled: false,
        title: 'DOUBLE 的别名（例外：REAL_AS_FLOAT SQL 模式时它是 FLOAT 的别名）',
      },
      { key: 14, label: '-', value: '-', disabled: true, title: '' },
      {
        key: 15,
        label: 'BIT',
        value: 'BIT',
        disabled: false,
        title: '位类型（M），每个值存储 M 位（默认为 1，最大为 64）',
      },
      {
        key: 16,
        label: 'BOOLEAN',
        value: 'BOOLEAN',
        disabled: false,
        title: 'TINYINT(1) 的别名，零值表示假，非零值表示真',
      },
      {
        key: 17,
        label: 'SERIAL',
        value: 'SERIAL',
        disabled: false,
        title: 'BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE 的别名',
      },
    ],
  },
  {
    label: '日期与时间',
    options: [
      { key: 18, label: 'DATE', value: 'DATE', disabled: false, title: '日期，支持的范围从 1000-01-01 到 9999-12-31' },
      {
        key: 19,
        label: 'DATETIME',
        value: 'DATETIME',
        disabled: false,
        title: '日期与时间，支持的范围从 1000-01-01 00:00:00 到 9999-12-31 23:59:59',
      },
      {
        key: 20,
        label: 'TIMESTAMP',
        value: 'TIMESTAMP',
        disabled: false,
        title:
          '时间戳，范围从 1970-01-01 00:00:01 UTC 到 2038-01-09 03:14:07 UTC，存储为自纪元（1970-01-01 00:00:00 UTC）起的秒数',
      },
      { key: 21, label: 'TIME', value: 'TIME', disabled: false, title: '时间，范围从 -838:59:59 到 838:59:59' },
      {
        key: 22,
        label: 'YEAR',
        value: 'YEAR',
        disabled: false,
        title: '四位数（4，默认）或两位数（2）的年份，取值范围从 70（1970）到 69（2069）或从 1901 到 2155 以及 0000',
      },
    ],
  },
  {
    label: '文本',
    options: [
      {
        key: 23,
        label: 'CHAR',
        value: 'CHAR',
        disabled: false,
        title: '定长（0-255，默认 1）字符串，存储时会向右边补足空格到指定长度',
      },
      {
        key: 24,
        label: 'VARCHAR',
        value: 'VARCHAR',
        disabled: false,
        title: '变长（0-65,535）字符串，最大有效长度取决于最大行大小',
      },
      { key: 25, label: '-', value: '-', disabled: true, title: '' },
      {
        key: 26,
        label: 'TINYTEXT',
        value: 'TINYTEXT',
        disabled: false,
        title: '最多存储 255（2^8 - 1）字节的文本字段，存储时在内容前使用 1 字节表示内容的字节数',
      },
      {
        key: 27,
        label: 'TEXT',
        value: 'TEXT',
        disabled: false,
        title: '最多存储 65535（2^16 - 1）字节的文本字段，存储时在内容前使用 2 字节表示内容的字节数',
      },
      {
        key: 28,
        label: 'MEDIUMTEXT',
        value: 'MEDIUMTEXT',
        disabled: false,
        title: '最多存储 16777215（2^24 - 1）字节的文本字段，存储时在内容前使用 3 字节表示内容的字节数',
      },
      {
        key: 29,
        label: 'LONGTEXT',
        value: 'LONGTEXT',
        disabled: false,
        title: '最多存储 4294967295 字节即 4GB（2^32 - 1）的文本字段，存储时在内容前使用 4 字节表示内容的字节数',
      },
      { key: 30, label: '-', value: '-', disabled: true, title: '' },
      {
        key: 31,
        label: 'BINARY',
        value: 'BINARY',
        disabled: false,
        title: '类似于 CHAR 类型，但其存储的是二进制字节串而不是非二进制字符串',
      },
      {
        key: 32,
        label: 'VARBINARY',
        value: 'VARBINARY',
        disabled: false,
        title: '类似于 VARCHAR 类型，但其存储的是二进制字节串而不是非二进制字符串',
      },
      { key: 33, label: '-', value: '-', disabled: true, title: '' },
      {
        key: 34,
        label: 'TINYBLOB',
        value: 'TINYBLOB',
        disabled: false,
        title: '最多存储 255（2^8 - 1）字节的 BLOB 字段，存储时在内容前使用 1 字节表示内容的字节数',
      },
      {
        key: 35,
        label: 'BLOB',
        value: 'BLOB',
        disabled: false,
        title: '最多存储 65535（2^16 - 1）字节的 BLOB 字段，存储时在内容前使用 2 字节表示内容的字节数',
      },
      {
        key: 36,
        label: 'MEDIUMBLOB',
        value: 'MEDIUMBLOB',
        disabled: false,
        title: '最多存储 16777215（2^24 - 1）字节的 BLOB 字段，存储时在内容前使用 3 字节表示内容的字节数',
      },
      {
        key: 37,
        label: 'LONGBLOB',
        value: 'LONGBLOB',
        disabled: false,
        title: '最多存储 4294967295 字节即 4GB（2^32 - 1）的 BLOB 字段，存储时在内容前使用 4 字节表示内容的字节数',
      },
      { key: 38, label: '-', value: '-', disabled: true, title: '' },
      {
        key: 39,
        label: 'ENUM',
        value: 'ENUM',
        disabled: false,
        title: "枚举，可从最多 65535 个值的列表中选择或特殊的错误值 ''",
      },
      { key: 40, label: 'SET', value: 'SET', disabled: false, title: '可从最多 64 个成员中选择集合为一个值' },
    ],
  },
  {
    label: '空间',
    options: [
      { key: 41, label: 'GEOMETRY', value: 'GEOMETRY', disabled: false, title: '一种能存储任意类型几何体的类型' },
      { key: 42, label: 'POINT', value: 'POINT', disabled: false, title: '二维空间中的点' },
      { key: 43, label: 'LINESTRING', value: 'LINESTRING', disabled: false, title: '点之间的线性插值曲线' },
      { key: 44, label: 'POLYGON', value: 'POLYGON', disabled: false, title: '多边形' },
      { key: 45, label: 'MULTIPOINT', value: 'MULTIPOINT', disabled: false, title: '点的集合' },
      {
        key: 46,
        label: 'MULTILINESTRING',
        value: 'MULTILINESTRING',
        disabled: false,
        title: '点之间的线性插值曲线的集合',
      },
      { key: 47, label: 'MULTIPOLYGON', value: 'MULTIPOLYGON', disabled: false, title: '多边形的集合' },
      {
        key: 48,
        label: 'GEOMETRYCOLLECTION',
        value: 'GEOMETRYCOLLECTION',
        disabled: false,
        title: '任意类型几何体对象的集合',
      },
    ],
  },
]

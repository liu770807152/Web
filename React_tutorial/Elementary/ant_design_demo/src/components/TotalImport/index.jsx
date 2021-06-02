// 3.x的文档会更详细
import React from 'react';
import { Button, Divider, DatePicker } from 'antd';
import { WechatOutlined, SearchOutlined } from '@ant-design/icons';
// 有了按需引入的配置，不需要手动引入CSS了
// import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;

export default function TotalImport() {

  const onChange = (date, dateString) => {

  }

  return (
    <>
      <button>default button</button>
      <Button type="primary">default primary button</Button>
      <Button type="primary" icon={<SearchOutlined />}>primary button with custom icon</Button>
      <Divider />
      <WechatOutlined />
      <Divider />
      <DatePicker onChange={onChange} />&nbsp;
      <RangePicker />
    </>
  )
}

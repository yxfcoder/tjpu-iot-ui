import React, {Component} from 'react';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import {Row, Col, Input, Tag, DatePicker, Select} from "antd";
import '../analysis.less';
import {Axis, Chart, Geom, Tooltip} from "bizcharts";

const {MonthPicker} = DatePicker;
const Option = Select.Option;

export default class DeviceYield extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  componentDidMount() {
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onChange(date, dateString) {
  }

  render() {
    const data = [
      {
        deviceName: "设备1",
        downTimes: 10
      },
      {
        deviceName: "设备2",
        downTimes: 20
      },
      {
        deviceName: "设备3",
        downTimes: 30
      },
      {
        deviceName: "设备4",
        downTimes: 40
      },
      {
        deviceName: "设备5",
        downTimes: 50
      },
      {
        deviceName: "设备6",
        downTimes: 60
      },
      {
        deviceName: "设备7",
        downTimes: 70
      },
      {
        deviceName: "设备8",
        downTimes: 80
      }
    ];
    const cols = {
      deviceName: {
        alias: '设备名称'
      },
      downTimes: {
        alias: '良品率',
        tickInterval: 20
      }
    };

    return (
      <div>
        <BreadcrumbCustom paths={['首页', '良品率分析']}/>
        <div className='mindex'>
          <div className='yield-graph-title'>
            <div>良品率分析</div>
          </div>
          <Row>
            <div className="yield-container">
              <div className="header">
                <div className="title">设备数据</div>
              </div>
              <div className="content">
                <Row gutter={26}>
                  <Col md={12}>
                    <div style={{paddingLeft: 13}}>
                      <Tag color="#2db7f5">设备编号</Tag>
                      <Select placeholder="请选择一个设备" style={{width: 150}} onChange={this.handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled">Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div>
                      <Tag color="#2db7f5">查询的时间</Tag>
                      <MonthPicker placeholder="请选择月份" style={{width: 150}} onChange={this.onChange}/>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div style={{paddingTop: 20}}>
                      <Tag color="#2db7f5">设备良品量</Tag>
                      <Input placeholder="请输入设备良品量" style={{width: 150}}/>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div style={{paddingTop: 20}}>
                      <Tag color="#2db7f5">设备实际产量</Tag>
                      <Input placeholder="请输入设备实际产量" style={{width: 150}}/>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Row>
          <Row className="yield-graph">
            <Chart height={500} data={data} scale={cols} forceFit>
              <Axis name="deviceName" title/>
              <Axis name="downTimes" title/>
              <Tooltip
                crosshairs={{type: "y"}}
              />
              <Geom
                type="interval"
                position="deviceName*downTimes"
                color={['downTimes', (downTimes) => {
                  if (downTimes < 50) {
                    return '#059be8';
                  } else if (downTimes >= 50 && downTimes < 80) {
                    return '#e87f03';
                  } else if (downTimes >= 80) {
                    return '#da0000';
                  }
                }]}
              />
            </Chart>
          </Row>
        </div>
      </div>
    )
  }
}

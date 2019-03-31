import React, {Component} from 'react';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import {Chart, Geom, Axis, Tooltip, Legend} from "bizcharts";
import {Slider, Input, Row, Col, Table, DatePicker} from "antd";
import '../analysis.less'

export default class DeviceDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downData: [
        {
          deviceId: 'D00001',
          deviceName: '设备1',
          deviceState: '运行',
          downTimes: 10,
          allDownTime: '10'
        },
        {
          deviceId: 'D00002',
          deviceName: '设备2',
          deviceState: '运行',
          downTimes: 9,
          allDownTime: '9'
        },
        {
          deviceId: 'D00003',
          deviceName: '设备3',
          deviceState: '运行',
          downTimes: 8,
          allDownTime: '8'
        },
        {
          deviceId: 'D00004',
          deviceName: '设备4',
          deviceState: '运行',
          downTimes: 7,
          allDownTime: '7'
        },
        {
          deviceId: 'D00005',
          deviceName: '设备5',
          deviceState: '运行',
          downTimes: 6,
          allDownTime: '6'
        },
        {
          deviceId: 'D00006',
          deviceName: '设备6',
          deviceState: '运行',
          downTimes: 5,
          allDownTime: '5'
        },
        {
          deviceId: 'D00007',
          deviceName: '设备7',
          deviceState: '运行',
          downTimes: 4,
          allDownTime: '4'
        },
        {
          deviceId: 'D00008',
          deviceName: '设备8',
          deviceState: '运行',
          downTimes: 3,
          allDownTime: '3'
        }
      ],
      failureRate: 50
    }
  };

  componentDidMount() {
  };

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
        alias: '故障次数',
        tickInterval: 20
      }
    };

    const {downData} = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'deviceId'
      }, {
        title: '名称',
        dataIndex: 'deviceName'
      }, {
        title: '状态',
        dataIndex: 'deviceState'
      }, {
        title: '停机次数',
        dataIndex: 'downTimes'
      }, {
        title: '累计停机时间 h',
        dataIndex: 'allDownTime'
      }];

    const {failureRate} = this.state;

    const marks = {
      0: '0%',
      20: '20%',
      40: '40%',
      60: '60%',
      80: '80%',
      100: '100%'
    };

    const {MonthPicker} = DatePicker;

    function onChange(date, dateString) {
    }

    return (
      <div>
        <BreadcrumbCustom paths={['首页', '停机分析']}/>
        <div className='mindex'>
          <div className='down-graph-title'>
            <div>故障分析</div>
            <MonthPicker onChange={onChange} placeholder="请选择要查询的月份"/>
          </div>
          <div>
            <Row>
              <Col span={20}>
                <Slider
                  min={0}
                  max={100}
                  style={{
                    marginLeft: 120,
                    marginBottom: 30
                  }}
                  marks={marks}
                  tooltipVisible={true}
                  onChange={this.onChange}
                  disabled={true}
                  value={typeof failureRate === 'number' ? failureRate : 0}
                />
              </Col>
              <Col span={2}>
                <Input
                  min={0}
                  max={100}
                  style={{
                    marginLeft: 50,
                    width: 100
                  }}
                  value={'故障率:' + failureRate + '%'}
                  disabled={true}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
          </div>
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
          <Table
            columns={columns}
            pagination={{pageSize: 10}}
            dataSource={downData}
            bordered={true}
            scroll={{x: 1300}}
            className='formTable'
          />
        </div>
      </div>
    )
  }
}

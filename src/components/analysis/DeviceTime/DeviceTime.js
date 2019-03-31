import React, { Component } from 'react';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import { Table, DatePicker } from "antd";
import { Axis, Chart, Geom, Tooltip } from "bizcharts";
import '../analysis.less'

export default class DeviceTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oeeTime: [
        {
          deviceId: 'D00001',
          deviceName: '设备1',
          timeOEE: 100,
          rank: 1
        },
        {
          deviceId: 'D00002',
          deviceName: '设备2',
          timeOEE: 90,
          rank: 1
        },
        {
          deviceId: 'D00003',
          deviceName: '设备3',
          timeOEE: 80,
          rank: 1
        },
        {
          deviceId: 'D00004',
          deviceName: '设备4',
          timeOEE: 70,
          rank: 1
        },
        {
          deviceId: 'D00005',
          deviceName: '设备5',
          timeOEE: 60,
          rank: 1
        },
        {
          deviceId: 'D00006',
          deviceName: '设备6',
          timeOEE: 50,
          rank: 1
        },
        {
          deviceId: 'D00007',
          deviceName: '设备7',
          timeOEE: 40,
          rank: 1
        },
        {
          deviceId: 'D00008',
          deviceName: '设备8',
          timeOEE: 30,
          rank: 1
        },
      ]
    }
  };

  componentDidMount() {
  };

  render() {
    const data = [
      {
        deviceName: "设备1",
        timeOEE: 10
      },
      {
        deviceName: "设备2",
        timeOEE: 30
      },
      {
        deviceName: "设备3",
        timeOEE: 60
      },
      {
        deviceName: "设备4",
        timeOEE: 90
      },
      {
        deviceName: "设备5",
        timeOEE: 70
      },
      {
        deviceName: "设备6",
        timeOEE: 40
      },
      {
        deviceName: "设备7",
        timeOEE: 30
      },
      {
        deviceName: "设备8",
        timeOEE: 20
      }
    ];
    const cols = {
      deviceName: { alias: '设备名称' },
      timeOEE: { alias: '时间稼动率' }
    };

    const {oeeTime} = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'deviceId'
      }, {
        title: '名称',
        dataIndex: 'deviceName'
      }, {
        title: '时间稼动率 %',
        dataIndex: 'timeOEE'
      }, {
        title: '名次',
        dataIndex: 'rank'
      }
    ];

    const { MonthPicker } = DatePicker;
    function onChange(date, dateString) {
    }

    return (
      <div>
        <BreadcrumbCustom paths={['首页', '时间稼动率']}/>
        <div className='mindex'>
          <div className='time-graph-title'>
            <div>OEE - 时间稼动率分析</div>
            <MonthPicker onChange={onChange} placeholder="请选择要查询的月份" />
          </div>
          <Chart height={500} data={data} scale={cols} forceFit>
            <Axis name="deviceName" title/>
            <Axis name="timeOEE" title/>
            <Tooltip
              crosshairs={{type: "y"}}
            />
            <Geom
              type="interval"
              position="deviceName*timeOEE"
              color={['timeOEE', (timeOEE) => {
                if (timeOEE < 50) {
                  return '#059be8';
                } else if (timeOEE >= 50 && timeOEE < 80) {
                  return '#e87f03';
                } else if (timeOEE >= 80) {
                  return '#da0000';
                }
              }]}
            />
          </Chart>
          <Table
            columns={columns}
            pagination={{pageSize: 10}}
            dataSource={oeeTime}
            bordered={true}
            scroll={{x: 1300}}
            className='formTable'
          />
        </div>
      </div>
    )
  }
}

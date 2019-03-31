import React, {Component} from 'react';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import {DatePicker, Table} from "antd";
import {Axis, Chart, Geom, Tooltip} from "bizcharts";
import '../analysis.less'

export default class DevicePerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oeePerformance: [
        {
          deviceId: 'D00001',
          deviceName: '设备1',
          performanceOEE: 50,
          rank: 1
        },
        {
          deviceId: 'D00002',
          deviceName: '设备2',
          performanceOEE: 50,
          rank: 1
        },
        {
          deviceId: 'D00003',
          deviceName: '设备3',
          performanceOEE: 50,
          rank: 1
        },
        {
          deviceId: 'D00004',
          deviceName: '设备4',
          performanceOEE: 50,
          rank: 1
        },
        {
          deviceId: 'D00005',
          deviceName: '设备5',
          performanceOEE: 50,
          rank: 1
        },
        {
          deviceId: 'D00006',
          deviceName: '设备6',
          performanceOEE: 50,
          rank: 1
        },
        {
          deviceId: 'D00007',
          deviceName: '设备7',
          performanceOEE: 50,
          rank: 1
        },
        {
          deviceId: 'D00008',
          deviceName: '设备8',
          performanceOEE: 50,
          rank: 1
        },
      ]
    }
  };

  componentDidMount() {
  };

  render() {
    // 月份选择器
    const { MonthPicker } = DatePicker;
    function onChange(date, dateString) {
    }

    // 柱状图数据填充
    const data = [
      {
        deviceName: "设备1",
        performanceOEE: 10
      },
      {
        deviceName: "设备2",
        performanceOEE: 20
      },
      {
        deviceName: "设备3",
        performanceOEE: 30
      },
      {
        deviceName: "设备4",
        performanceOEE: 40
      },
      {
        deviceName: "设备5",
        performanceOEE: 50
      },
      {
        deviceName: "设备6",
        performanceOEE: 40
      },
      {
        deviceName: "设备7",
        performanceOEE: 30
      },
      {
        deviceName: "设备8",
        performanceOEE: 20
      }
    ];
    const cols = {
      deviceName: { alias: '设备名称' },
      performanceOEE: { alias: '性能稼动率' }
    };

    // 排名表格填充数据
    const {oeePerformance} = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'deviceId'
      }, {
        title: '名称',
        dataIndex: 'deviceName'
      }, {
        title: '性能稼动率 %',
        dataIndex: 'performanceOEE'
      }, {
        title: '名次',
        dataIndex: 'rank'
      }
    ];

    return (
      <div>
        <BreadcrumbCustom paths={['首页', '性能稼动率']}/>
        <div className='mindex'>
          <div className='performance-graph-title'>
            <div>OEE - 性能稼动率分析</div>
            <MonthPicker onChange={onChange} placeholder="请选择要查询的月份" />
          </div>
          <Chart height={500} data={data} scale={cols} forceFit>
            <Axis name="deviceName" title/>
            <Axis name="performanceOEE" title/>
            <Tooltip
              crosshairs={{type: "y"}}
            />
            <Geom
              type="interval"
              position="deviceName*performanceOEE"
              color={['performanceOEE', (performanceOEE) => {
                if (performanceOEE < 50) {
                  return '#059be8';
                } else if (performanceOEE >= 50 && performanceOEE < 80) {
                  return '#e87f03';
                } else if (performanceOEE >= 80) {
                  return '#da0000';
                }
              }]}
            />
          </Chart>
          <Table
            columns={columns}
            pagination={{pageSize: 10}}
            dataSource={oeePerformance}
            bordered={true}
            scroll={{x: 1300}}
            className='formTable'
          />
        </div>
      </div>
    )
  }
}

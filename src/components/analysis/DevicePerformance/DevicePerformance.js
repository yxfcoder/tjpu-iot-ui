import React, {Component} from 'react';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import {DatePicker} from "antd";

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
      sales: {
        tickInterval: 20,
      }
    };

    const {performanceOEE} = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'deviceId'
      }, {
        title: '名称',
        dataIndex: 'deviceName'
      }, {
        title: '性能稼动率',
        dataIndex: 'performanceOEE'
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
        <BreadcrumbCustom paths={['首页', '性能稼动率']}/>
      </div>
    )
  }
}

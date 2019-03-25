import React from 'react';
import {Card, Col, Row} from 'antd';
import BreadcrumbCustom from "../common/BreadcrumbCustom";
import CountUp from 'react-countup';
import {Chart, Geom, Axis, Tooltip, Coord, Label, Legend} from "bizcharts";
import DataSet from '@antv/data-set';
import {Table, Icon} from 'antd';
import './index.less';

const {Meta} = Card;

class Dashboard extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      histogramData: '',
      deviceData: [],
    };
  }

  componentDidMount() {
    const apiURL = "/tjpu/iot/device/device";
    const opts = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    fetch(apiURL, opts).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }
      response.json().then((responseJSON) => {
        let responseData = JSON.stringify(responseJSON.data);
        this.setState({
          deviceData: JSON.parse(responseData),
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  Cards() {
    let cardIcons = ["dashboard", "code", "interation", "alert"];
    let iconColors = ["#52c41a", "#eb2f96", "#52c41a", "#eb2f96"];
    let cardNames = ["开机设备", "关机设备", "负载设备", "故障设备"];
    let cardValues = ["1379", "768", "192", "413"];
    return cardIcons.map(function (item, index) {
      return (
        <Col md={6} key={item}>
          <Card style={{cursor: 'pointer', marginBottom: 16}} hoverable={true}>
            <Meta
              style={{fontSize: 22}}
              avatar={<Icon type={item} style={{fontSize: '50px'}} theme="twoTone" twoToneColor={iconColors[index]}/>}
              title={cardNames[index]}
              description={<CountUp start={0} end={cardValues[index]} duration={2.75}/>}
            />
          </Card>
        </Col>
      )
    });
  };

  render() {
    const {DataView} = DataSet;
    const pieData = [
      {
        item: "开机设备",
        count: 40
      },
      {
        item: "关机设备",
        count: 21
      },
      {
        item: "负载设备",
        count: 17
      },
      {
        item: "空闲设备",
        count: 13
      },
      {
        item: "故障设备",
        count: 9
      }
    ];
    const pie = new DataView();
    pie.source(pieData).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };

    const {deviceData} = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'deviceId'
      }, {
        title: '名称',
        dataIndex: 'deviceName'
      }, {
        title: '型号',
        dataIndex: 'deviceModel'
      }, {
        title: '类型',
        dataIndex: 'deviceType'
      }, {
        title: '协议',
        dataIndex: 'deviceProtocol'
      }, {
        title: '公司',
        dataIndex: 'deviceCompany'
      }, {
        title: '运行状态',
        dataIndex: 'deviceRunState'
      }, {
        title: '设备所属用户编号',
        dataIndex: 'deviceUserId'
      }, {
        title: '纬度',
        dataIndex: 'deviceLatitude'
      }, {
        title: '经度',
        dataIndex: 'deviceLongitude'
      }, {
        title: '地区',
        dataIndex: 'deviceLocal'
      }, {
        title: '状态',
        dataIndex: 'deviceState'
      }];

    return (
      <div>
        <BreadcrumbCustom paths={['首页']}/>
        <div className='mindex'>
          <Row gutter={16}>
            {this.Cards()}
          </Row>
          <Row gutter={26}>
            <Col md={12}>
              <div className="chart-container">
                <div className="header">
                  <div className="title">设备数据</div>
                </div>
                <div className="content">
                  <Chart
                    height={550}
                    data={pie}
                    scale={cols}
                    padding={[80, 100, 80, 80]}
                    forceFit
                  >
                    <Coord type="theta" radius={0.75}/>
                    <Axis name="percent"/>
                    <Legend
                      position="right"
                      offsetY={-window.innerHeight / 2 + 120}
                      offsetX={-100}
                    />
                    <Tooltip
                      showTitle={false}
                      itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                      type="intervalStack"
                      position="percent"
                      color="item"
                      tooltip={[
                        "item*percent",
                        (item, percent) => {
                          percent = percent * 100 + "%";
                          return {
                            name: item,
                            value: percent
                          };
                        }
                      ]}
                      style={{
                        lineWidth: 1,
                        stroke: "#fff"
                      }}
                    >
                      <Label
                        content="percent"
                        formatter={(val, item) => {
                          return item.point.item + ": " + val;
                        }}
                      />
                    </Geom>
                  </Chart>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="chart-container">
                <div className="header">
                  <div className="title">设备数据</div>
                </div>
                <div className="content">
                  <Chart
                    height={550}
                    data={pie}
                    scale={cols}
                    padding={[80, 100, 80, 80]}
                    forceFit
                  >
                    <Coord type="theta" radius={0.75}/>
                    <Axis name="percent"/>
                    <Legend
                      position="right"
                      offsetY={-window.innerHeight / 2 + 120}
                      offsetX={-100}
                    />
                    <Tooltip
                      showTitle={false}
                      itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                      type="intervalStack"
                      position="percent"
                      color="item"
                      tooltip={[
                        "item*percent",
                        (item, percent) => {
                          percent = percent * 100 + "%";
                          return {
                            name: item,
                            value: percent
                          };
                        }
                      ]}
                      style={{
                        lineWidth: 1,
                        stroke: "#fff"
                      }}
                    >
                      <Label
                        content="percent"
                        formatter={(val, item) => {
                          return item.point.item + ": " + val;
                        }}
                      />
                    </Geom>
                  </Chart>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Table
              columns={columns}
              pagination={{pageSize: 10}}
              dataSource={deviceData}
              bordered={true}
              scroll={{x: 1300}}
              className='formTable'
            />
          </Row>
        </div>
      </div>
    )
  }
}

export default Dashboard;

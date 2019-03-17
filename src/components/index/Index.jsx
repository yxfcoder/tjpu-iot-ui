import React from 'react';
import {Card, Col, Row} from 'antd';
import BreadcrumbCustom from "../common/BreadcrumbCustom";
import CountUp from 'react-countup';
import {G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from "bizcharts";
import DataSet from '@antv/data-set';
import {Table, Icon, Popconfirm} from 'antd';
import './index.less';

const {Meta} = Card;

class MIndex extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            histogramData: '',
            deviceData: [],
        };
    }

    componentDidMount(){
        //获取数据
        var apiURL = "/tjpu/iot/device/device";
        var opts = {
            // credentials: "include",
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
                var responseData = JSON.stringify(responseJSON.data);
                this.setState({
                    deviceData: JSON.parse(responseData),
                });
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    CountUp() {
        let imgSrc = ["mail", "chat", "cart", "heart"];
        let imgName = ["开机设备数", "关机设备数", "负载设备数", "故障设备数"];
        let count = ["1379", "768", "192", "413"];
        let cu = imgSrc.map(function (item, index) {
            return (
                <Col md={6} key={item}>
                    <Card style={{cursor: 'pointer', marginBottom: 16}} hoverable={true}>
                        <Meta
                            style={{fontSize: 22}}
                            avatar={<img src={require('../../style/img/' + item + '.png')} alt=""/>}
                            title={imgName[index]}
                            description={<CountUp start={0} end={count[index]} duration={2.75}/>}
                        />
                    </Card>
                </Col>
            )
        });
        return cu;
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

        const { deviceData } = this.state;

        const columns = [
            {
                title: '编号',
                dataIndex: 'deviceId',
                // minWidth: 120,
            }, {
                title: '名称',
                dataIndex: 'deviceName',
                // minWidth: 80,
            }, {
                title: '型号',
                dataIndex: 'deviceModel',
                // minWidth: 80,
            }, {
                title: '类型',
                dataIndex: 'deviceType',
                // minWidth: 120,
            }, {
                title: '协议',
                dataIndex: 'deviceProtocol',
                // minWidth: 80,
            }, {
                title: '公司',
                dataIndex: 'deviceCompany',
                // minWidth: 80,
            }, {
                title: '运行状态',
                dataIndex: 'deviceRunState',
                // minWidth: 120,
            }, {
                title: '设备所属用户编号',
                dataIndex: 'deviceUserId',
                // minWidth: 120,
            }, {
                title: '维度',
                dataIndex: 'deviceLatitude',
                // minWidth: 120,
            }, {
                title: '经度',
                dataIndex: 'deviceLongitude',
                // minWidth: 120,
            }, {
                title: '地区',
                dataIndex: 'deviceLocal',
                // sorter: (a, b) => moment(a.accountUpdatedTime) - moment(b.accountUpdatedTime),
                // minWidth: 120,
            }, {
                title: '状态',
                dataIndex: 'deviceState',
                // sorter: (a, b) => moment(a.accountUpdatedTime) - moment(b.accountUpdatedTime),
                // minWidth: 80,
            }, {
                title: '备注',
                dataIndex: 'deviceRemark',
                // minWidth: 150,
            }];

        return (
            <div>
                <BreadcrumbCustom paths={['index', 'form']}/>
                <div className='mindex'>
                    <Row gutter={16}>
                        {this.CountUp()}
                    </Row>
                    <Row gutter={26}>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Chart
                                height={window.innerHeight}
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
                        </Col>
                        <Col md={10}>
                            <Chart
                                height={window.innerHeight}
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
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                    <Row>
                        <Table
                            columns={columns}
                            //分页，传入每页的条数
                            pagination={{pageSize: 9}}
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

export default MIndex;

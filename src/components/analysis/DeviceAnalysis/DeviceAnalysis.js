import React, {Component} from 'react';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';

export default class DeviceAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  componentDidMount() {
  };

  render() {
    return (
      <div>
        <BreadcrumbCustom paths={['首页', '综合分析']}/>
      </div>
    )
  }
}

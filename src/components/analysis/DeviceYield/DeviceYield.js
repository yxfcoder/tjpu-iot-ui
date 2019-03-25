import React, {Component} from 'react';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';

export default class DeviceYield extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  componentDidMount() {
  };

  render() {
    return (
      <div>
        <BreadcrumbCustom paths={['首页', '良品率分析']}/>
      </div>
    )
  }
}

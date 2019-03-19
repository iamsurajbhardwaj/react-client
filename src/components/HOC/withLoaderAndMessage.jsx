import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function withLoaderAndMessage(Component) {
  return class WithLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { loading, dataLength } = this.props;
      if (loading) {
        return (
          <div style={{position: 'absolute', top: 300, left: '48%',}}>
            <CircularProgress size={90}/>
          </div>
        );
      } if (!loading && dataLength) {
        return (
          <div>
            <Component {...this.props} />
          </div>
        );
      }
      return (
        <div style={ { display: 'flex', flexDirection: 'column', textAlign: 'center' } }>
          <h1>Oops!! No Trainees Found</h1>
          <h1>:(</h1>
        </div>
      );
    }
  };
}

export default withLoaderAndMessage;

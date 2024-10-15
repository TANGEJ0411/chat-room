import React, { Component } from 'react';
import propTypes from 'prop-types';
// import iconErrorPage from '../../../../../public/images/icon_errorpage.svg';

class ErrorBoundary extends Component {

    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
  
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
  
      const data = {};
      console.log(error.stack);
      data.log = error.stack;
  
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
      // You can also log error messages to an error reporting service here
    }
    handClick() {
      window.location.hash = `/Login`;
  
      window.location.reload();
    }
  
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <div className="error-wrap">
            {/* <img className="error-icon" src={iconErrorPage} alt='錯誤圖片'/> */}
              <p className="error-info-text">登入已過期，請重新登錄</p>
              <div className="btn-row-wrap">
                {/* <a className="btn-login" href="javascript:void(0)" onClick={() => this.handClick()}>重新登入</a> */}
                <button className="btn-login" onClick={() => this.handClick()}>重新登入</button>
              </div>
           </div>//<!-- /.error-wrap --> 
        );
      }
      // Normally, just render children
      return this.props.children;
    }
  }

  ErrorBoundary.propTypes = {
    children: propTypes.element.isRequired
  };

  export default ErrorBoundary;
import {Component} from 'react'
import ReactDOM from 'react-dom'



const portalRoot = document.getElementById('portal')


export default class Portal extends Component {


  componentDidMount() {
    portalRoot.appendChild(this.el)
  }
  
  componentWillUnmount() {
    portalRoot.removeChild(this.el)
  }
  

  constructor() {
    super()
    this.el = document.createElement('div')
  }
 
  render() {
    const {children} = this.props
    return ReactDOM.createPortal(children, this.el)
  }
}
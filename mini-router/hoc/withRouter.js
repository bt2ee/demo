import hoistNonReactStatics from "hoist-non-react-statics"
import { useContext } from "react"
import { RouterContext  } from '../component/Router'

export default function withRouter(Component) {
  const WrapComponent = (props) => {
    const {wrappedComponentRef, ...remainingProps} = props
    const context = useContext(RouterContext)
    return <Component
    {...remainingProps}
    ref = {wrappedComponentRef}
    {...context}/>
  }
  return hoistNonReactStatics(WrapComponent, Component)
 }

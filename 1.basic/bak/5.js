


class Component{

}
function wrapper(OldComponent){
    return class WrappedComponent {

    }
}
function logger(WrappedComponent){
    return class LoggerWrappedComponent {
        
    }
}
let WrappedComponent = wrapper(Component);
let LoggerWrappedComponent = logger(WrappedComponent);


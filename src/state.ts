class AppState {
    static instace;
    private state = {};
    private constructor() {}

    getState() {
        return this.state;
    }

    setState(obj={}) {
        this.state = {
            ...this.state,
            ...obj
        };
    }

    getInstace() {
        if(!AppState.instace) AppState.instace = new AppState();
        return AppState.instace;
    }
}

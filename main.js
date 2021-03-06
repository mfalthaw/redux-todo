// reducer
const reducer = Redux.combineReducers({
    todos: (state = [], action) => {
        const newState = Object.assign([], state);
        if (action.type === 'add') {
            newState.push(action.item);
        }
        else if (action.type === 'remove') {
            newState.splice(action.index, 1);
        }

        return newState;
    }
});

// store
const store = Redux.createStore(reducer);

// render method
const render = () => {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const state = store.getState();
    state.todos.forEach((todo, i) => {
        const e = document.createElement('div');
        e.innerHTML = todo;
        container.appendChild(e);

        e.onclick = () => {
            store.dispatch({
                type: 'remove',
                index: i,
            });

            // update page
            render();
        };
    });
};

// append items to list on submit
document.getElementById('submit-todo').onclick = () => {
    store.dispatch({
        type: 'add',
        item: document.getElementById('todo').value,
    });

    // update page
    render();
};
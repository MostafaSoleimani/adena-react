const KEY = "adena-forms";
export function  loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return [];
    return JSON.parse(serializedState);
  } catch (e) {
    return [];
  }
}

export function loadFormConfig(id) {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return [];
    const config = JSON.parse(serializedState).find(x => x.id === id)
    return config;
  } catch (e) {
    return [];
  }
}

export function saveState(state) {
  try {
    let states = loadState();
    let foundState = states.find(x => x.id === state.id);
    if(foundState) {
        foundState.name = state.name;
        foundState.id = state.id;
        foundState.layout = state.layout;
    } else {
        states = [...states, state]
    }
    const serializedState = JSON.stringify(states);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    console.log(e)
  }
}
import { makeObservable, observable, action, makeAutoObservable } from "mobx";



 class ObservableUiStore {
  count = 0
  count2 = 0

  constructor() {
    // makeObservable(this, {
    //   count: observable,
    //   count2: observable,
    //   increment: action.bound
    // });
    makeAutoObservable(this)
  }


  increment = () => {
    this.count = this.count + 1;
  };
}

const UiStore = new ObservableUiStore();
export default UiStore
interface InitialState {
  title: string;
  content: string;
}

export interface FormProps {
  initialState?: InitialState;
  handleSubmit: (state: State, formData: FormData) => State | Promise<State>;
}

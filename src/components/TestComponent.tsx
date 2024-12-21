import { FC } from 'react';

interface TestComponentProps {
    foo: number;
    bar?: string;
}

const TestComponent: FC<TestComponentProps> = (props) => {
    return (
        <div>
            Test Component: foo is {props.foo}. Bar is {props.bar ? props.bar : 'not applicable'}
        </div>

    )
}

export default TestComponent
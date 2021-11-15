interface Props<T> {
    value: T;
    onChange: (newValue: T) => void;
    options: readonly T[];

    renderOption?: (option: T, selected: boolean) => React.ReactNode;
}

const defaultOptionRenderer = (option: any, selected: boolean) => {
    return <div className={`border border-foreground w-12 h-12 flex items-center justify-center ${selected ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}>
        {option}
    </div>
}

export default function OptionPicker<T>(props: Props<T>) {

    return <div className="flex flex-row -mx-1">
        {props.options.map((option, index) => <div className="cursor-pointer p-1" onClick={e => props.onChange(option)} key={index}>
            {(props.renderOption ?? defaultOptionRenderer)(option, option === props.value)}
        </div>)}
    </div>
}
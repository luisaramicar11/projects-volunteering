interface TextProps {
    children: React.ReactNode;
    classname?: string;
};

const Text: React.FC<TextProps> = ({ children, classname }) =>{
    return(
        <p className={classname}>{children}</p>
    );
};

export default Text;
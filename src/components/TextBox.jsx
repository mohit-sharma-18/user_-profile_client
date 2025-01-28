import '../style/input.scss'
const TextBox = (props) => {
    const { type, value, name, className, onChange, placeholder, label, id } = props
    return (
        <>
            <div className="textBox">
                <div className="container">
                    <input id={id} type={type} name={name} value={value} placeholder={placeholder} className={className} onChange={onChange} />
                    {label && <label htmlFor={id}>{label}</label>}
                </div>

            </div>
        </>
    )
}

export default TextBox
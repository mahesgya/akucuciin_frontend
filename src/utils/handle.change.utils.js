const handleChange = (setState) => (e) => {
    const {name, value} = e.target;
    setState((prev) => ({
        ...prev,
        [name] : value,
    }))
}

export default handleChange;
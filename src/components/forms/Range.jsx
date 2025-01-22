export function Range({range,id,min,max,onChange}){
    return <div className="from-range">
         <p>Value: {range}</p>
        <input 
        id={id}
        type="range"
        min={min}
        max={max}
        value={range}
        onChange={(e)=> onChange(e.target.value)}
         />
    </div>
}